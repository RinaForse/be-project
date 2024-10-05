export interface UserGetResponseDto {
    id: string,
    username: string,
    fullName: string,
    email: string,
    phone: string,
    address: string,
    created: Date,
    updated: Date
}

export interface UserCreateRequestDto {
    username: string,
    fullName: string,
    email: string,
    phone: string,
    address: string,
    password: string
}

export interface UserUpdateRequestDto {
    fullName: string,
    email: string,
    phone: string,
    address: string,
}

export interface UserForgetPasswordRequestDto {
    username: string,
    password: string,
    newPassword: string,
    confirmPassword: string
}

export interface UserSignInRequestDto {
    username: string,
    password: string
}
