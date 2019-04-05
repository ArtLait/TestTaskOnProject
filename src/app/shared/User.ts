export class User {
    id?: number;
    login: string;
    node_id?: string;
    avatar_url: string;
    userDetail: UserDetail;
    name = '';
    created_at = '';
    email = '';
}

export class UserDetail {
    avatar_url: string;
    name: string;
    login: string;
    created_at: string;
    email: string;
}

export class UsersResponse {
    incomplete_results: boolean;
    items: User[];
    total_count: number;
}
