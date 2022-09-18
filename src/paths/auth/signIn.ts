import ApiException from '../../core/ApiException'
import { httpStatusCode } from '../../core/httpStatusCode'

export interface SignInProps {
    login: string
    password: string
}

export const signInUser = async ({
    login,
    password,
}: SignInProps): Promise<string | null> => {
    // validate
    if (!login || !password) {
        throw new ApiException({
            code: httpStatusCode.unAuthorized,
            message: 'User is not found.',
        })
    }

    // get user from DB
    return 'User Object'
}
