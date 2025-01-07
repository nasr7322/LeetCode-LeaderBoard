export interface LeetCodeStats {
    status: string;
    message: string;
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    totalEasy: number;
    mediumSolved: number;
    totalMedium: number;
    hardSolved: number;
    totalHard: number;
    acceptanceRate: number;
    ranking: number;
    contributionPoints: number;
    reputation: number;
    submissionCalendar: Record<string, number>;
}

export interface UserData extends LeetCodeStats {
    username: string;
    displayName: string;
    currentStreak: number;
}
