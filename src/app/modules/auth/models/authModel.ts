export interface AuthModel {
    email: string;
    password: string;
    rememberMe?: boolean;
}
export interface User {
    id: string;
    TenantId: string;
    name: string;
    isAuthenticated: boolean;
    email: string;
    roles: string[];
    token: string;
    colorMode: string;
    defaultLanguage: string;
    menuMode: string;

}
