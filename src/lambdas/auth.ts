import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import ApiException from '../core/ApiException'
import { httpStatusCode } from '../core/httpStatusCode'
import { getRefreshToken } from '../paths/auth/refresh'
import { signInUser } from '../paths/auth/signIn'

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.info('received /auth:', event)
    try {
        switch (event.path) {
            case '/auth/sign-in':
                const user = await signInUser(JSON.parse(event.body) ?? {})
                return {
                    body: JSON.stringify({
                        user,
                        correlationId: event.headers['X-Correlation-Id'],
                    }),
                    statusCode: httpStatusCode.ok,
                }
            case '/auth/refresh':
                const refreshToken = await getRefreshToken()
                return {
                    body: JSON.stringify({
                        refreshToken,
                    }),
                    statusCode: httpStatusCode.ok,
                }
            default:
                return {
                    body: JSON.stringify({
                        success: false,
                        message: 'Not found.',
                    }),
                    statusCode: httpStatusCode.notFound,
                }
        }
    } catch (e) {
        if (e instanceof ApiException) {
            console.log('error', e)
            return {
                body: JSON.stringify({
                    success: false,
                    message: e.message,
                }),
                statusCode: e.code,
            }
        }

        return {
            body: JSON.stringify({
                success: false,
                message: 'Uncaught error.',
            }),
            statusCode: httpStatusCode.internalServerError,
        }
    }
}
