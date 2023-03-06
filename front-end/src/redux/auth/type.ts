export type LoginRequest = {
    email: String;
    password: String;
}
export type User = {
    id: String;
    email: String;
    address: String;
    phone: String;
    avatar_link: String;
    fullname: String;
    role: String;
}

export type UserResponse = {
    status: String;
    access_token: String;
    user: User;
}