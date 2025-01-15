import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import fs from "fs/promises"; // Import fs/promises for file handling
import formatUserData from "./utils/Formatter.js";
import userDataQuery from "./utils/UserDataQuery.js";

const app = express();
app.use(cors({ origin: "*" }));
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Fetch User Details
const fetchUserDetails = async (username) => {
    const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Referer: "https://leetcode.com",
        },
        body: JSON.stringify({
            query: userDataQuery,
            variables: { username },
        }),
    });

    const result = await response.json();

    if (result.errors) {
        throw new Error(result.errors[0].message);
    }

    return result.data;
};

app.post("/api/user", async (req, res) => {
    const { username, limit = 20 } = req.body;

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    try {
        const userData = await fetchUserDetails(username);
        const formattedData = formatUserData(userData);
        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/users", async (req, res) => {
    try {
        const fileData = await fs.readFile("data\\users.json", "utf-8");
        const jsonData = JSON.parse(fileData);
        const users = jsonData.users;

        if (users.length === 0)
            return res
                .status(400)
                .json({ error: "No users found in the file" });

        const userDataPromises = users.map(async (user) => {
            try {
                const userData = await fetchUserDetails(user.username);
                return formatUserData(userData, user.displayName);
            } catch (error) {
                console.error(
                    `Error fetching data for ${user.username}: ${error.message}`
                );
            }
        });

        const totalUsers = users.length;
        const usersData = (await Promise.all(userDataPromises)).filter(
            (user) => user
        );
        const fetchedUsers = usersData.length;
        res.json({ totalUsers, fetchedUsers, usersData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/", (req, res) => {
    res.send("Welcome to LeetCode API");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
