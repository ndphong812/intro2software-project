export type AuthRequest = {
    email: String;
    password: String;
}
export type User = {
    email: String;
    address: String;
    phone: String;
    avatar_link: String;
    fullname: String;
    role: String;
}

export type UserResponse = {
    isLoading: Boolean;
    status: String;
    access_token: String;
    isLoggin: Boolean;
    user: User;
}