const getCurrentStreak = (calendar) => {
    const timestamps = Object.keys(calendar)
        .map(Number)
        .sort((a, b) => b - a);

    let currentStreak = 0;
    let solvedToday = true;
    let previousDate = new Date(timestamps[0] * 1000);
    if (previousDate.getDate() !== new Date().getDate()) {
        solvedToday = false;
        if (previousDate.getDate() !== new Date().getDate() - 1) {
            return { solvedToday, currentStreak };
        }
    }
    currentStreak = 1;
    for (let i = 0; i < timestamps.length; i++) {
        const currentDate = new Date(timestamps[i] * 1000);
        if (previousDate.getDate() === currentDate.getDate() + 1) {
            currentStreak += 1;
        } else if (previousDate.getDate() !== currentDate.getDate()) {
            break;
        }

        previousDate = currentDate;
    }
    return { solvedToday, currentStreak };
};

const formatUserData = (userData) => {
    const { solvedToday, currentStreak } = getCurrentStreak(
        JSON.parse(userData.matchedUser.submissionCalendar)
    );
    return {
        username: userData.matchedUser.username,
        realName: userData.matchedUser.profile.realName,
        totalSolved: userData.matchedUser.submitStats.acSubmissionNum[0].count,
        totalQuestions: userData.allQuestionsCount[0].count,
        easySolved: userData.matchedUser.submitStats.acSubmissionNum[1].count,
        totalEasy: userData.allQuestionsCount[1].count,
        mediumSolved: userData.matchedUser.submitStats.acSubmissionNum[2].count,
        totalMedium: userData.allQuestionsCount[2].count,
        hardSolved: userData.matchedUser.submitStats.acSubmissionNum[3].count,
        totalHard: userData.allQuestionsCount[3].count,
        acceptanceRate:
            (100 *
                userData.matchedUser.submitStats.acSubmissionNum[0]
                    .submissions) /
            userData.matchedUser.submitStats.totalSubmissionNum[0].submissions,
        ranking: userData.matchedUser.profile.ranking,
        submissionCalendar: JSON.parse(userData.matchedUser.submissionCalendar),
        solvedToday: solvedToday,
        currentStreak: currentStreak,
    };
};

export default formatUserData;
