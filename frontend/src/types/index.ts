export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface Issue {
  _id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  severity: "minor" | "major" | "critical" | "blocker";
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IssueFilters {
  status?: string;
  priority?: string;
  search?: string;
  page?: number;
}

export interface PaginatedIssues {
  issues: Issue[];
  total: number;
  page: number;
  pages: number;
}

export interface IssueStat {
  _id: string;
  count: number;
}
