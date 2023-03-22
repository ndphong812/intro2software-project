export type AuthRequest = {
    email: string;
    password: String;
}
export type User = {
    user_id: string;
    email: string;
    address: string;
    phone: string;
    avatar_link: string;
    fullname: string;
    role: string;
}

export type UserResponse = {
    isLoading: Boolean;
    status: string;
    access_token: string;
    isLoggin: Boolean;
    user: User;
}