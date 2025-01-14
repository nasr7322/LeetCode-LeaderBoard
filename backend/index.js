import cors from "cors";
import express from "express";

import bodyParser from "body-parser";
import fetch from "node-fetch";
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

// API Endpoint
app.post("/api/user", async (req, res) => {
    const { username, limit = 20 } = req.body;

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    try {
        const userData = await fetchUserDetails(username);
        const formattedData = formatUserData(userData);
        res.json(formattedData);
        // res.json(userData);
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
