export interface UserCreateRequestDto {
    username: string;
    password: string;
    confirmPassword: string;
    firstName?: string;
    lastName?: string;
    phone: string;
    email: string;
    address?: string;
    avatar?: string;
}
