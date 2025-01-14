export interface UserData {
    username: string;
    displayName: string;
    realName: string;
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
    currentStreak: number;
    solvedToday: boolean;
    activeBadge: { displayName: string; icon: string };
}
