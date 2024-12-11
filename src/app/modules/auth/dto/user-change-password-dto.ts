export interface UserChangePasswordDto {
    id: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
