export interface Problem {
    id: number;
    title: string;
    description: string;
    specificlocation: string;
    category: string;
    voteCount: number;
    status: string;
    lat: string;
    long: string;
}

export interface ProblemAPIResponse {
    problems: Problem[];
}

