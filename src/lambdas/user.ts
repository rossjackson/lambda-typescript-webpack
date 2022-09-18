import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import ApiException from '../core/ApiException'
import { httpStatusCode } from '../core/httpStatusCode'
import { getUserDetails } from '../paths/user/detail'
import { getUserProjects } from '../paths/user/projects'

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.info('received /user:', event)
    try {
        switch (event.path) {
            case '/user':
                const userDetails = await getUserDetails()
                return {
                    body: JSON.stringify({
                        userDetails,
                    }),
                    statusCode: httpStatusCode.ok,
                }
            case '/user/projects':
                const userProjects = await getUserProjects()
                return {
                    body: JSON.stringify({
                        userProjects,
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
