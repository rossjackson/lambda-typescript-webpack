export interface SignInProps {
    login: string
    password: string
}

export const signIn = ({ login, password }: SignInProps): string | null => {
    // validate
    if (!login || !password) return null

    // get user from DB
    return 'User Object'
}
