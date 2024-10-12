export interface UserUpdateRequestDto {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    firstName?: string;
    lastName?: string;
    phone: string;
    email: string;
    address?: string;
    avatar?: string;
}
