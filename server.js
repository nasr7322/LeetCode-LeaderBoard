import axios from 'axios';
import cors from 'cors';
import express from 'express';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';

// Query to get user profile data
const profileQuery = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      problemsSolvedBeatsStats {
        difficulty
        percentage
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      contributions {
        points
      }
      profile {
        reputation
        ranking
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
    }
  }
`;

// Query to get user's recent submissions
const submissionsQuery = `
  query recentSubmissions($username: String!) {
    recentSubmissionList(username: $username) {
      timestamp
      statusDisplay
      lang
      title
      titleSlug
    }
  }
`;

app.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Get profile data
    const profileResponse = await axios.post(LEETCODE_GRAPHQL_ENDPOINT, {
      query: profileQuery,
      variables: { username }
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Get submissions data
    const submissionsResponse = await axios.post(LEETCODE_GRAPHQL_ENDPOINT, {
      query: submissionsQuery,
      variables: { username }
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const profileData = profileResponse.data.data.matchedUser;
    const submissionsData = submissionsResponse.data.data.recentSubmissionList;

    // Calculate submission calendar
    const submissionCalendar = {};
    submissionsData.forEach(submission => {
      const timestamp = submission.timestamp;
      if (submissionCalendar[timestamp]) {
        submissionCalendar[timestamp]++;
      } else {
        submissionCalendar[timestamp] = 1;
      }
    });

    // Format response to match the existing API structure
    const response = {
      status: "success",
      message: "retrieved stats successfully",
      totalSolved: profileData.submitStats.acSubmissionNum.find(x => x.difficulty === "All").count,
      totalQuestions: profileData.submitStats.acSubmissionNum.find(x => x.difficulty === "All").submissions,
      easySolved: profileData.submitStats.acSubmissionNum.find(x => x.difficulty === "Easy").count,
      totalEasy: profileData.submitStats.acSubmissionNum.find(x => x.difficulty === "Easy").submissions,
      mediumSolved: profileData.submitStats.acSubmissionNum.find(x => x.difficulty === "Medium").count,
      totalMedium: profileData.submitStats.acSubmissionNum.find(x => x.difficulty === "Medium").submissions,
      hardSolved: profileData.submitStats.acSubmissionNum.find(x => x.difficulty === "Hard").count,
      totalHard: profileData.submitStats.acSubmissionNum.find(x => x.difficulty === "Hard").submissions,
      acceptanceRate: (profileData.submitStats.acSubmissionNum.find(x => x.difficulty === "All").count / 
                      profileData.submitStats.acSubmissionNum.find(x => x.difficulty === "All").submissions) * 100,
      ranking: profileData.profile.ranking,
      contributionPoints: profileData.contributions.points,
      reputation: profileData.profile.reputation,
      submissionCalendar
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch LeetCode data"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});