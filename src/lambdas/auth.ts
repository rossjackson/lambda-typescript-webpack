import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { signIn } from '../auth/signIn'
import { httpStatusCode } from '../core/httpStatusCode'

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.info('received:', event)
    switch (event.pathParameters.proxy) {
        case 'sign-in':
            if (event.httpMethod !== 'POST') {
                console.error('Wrong HTTP Method')
                return {
                    statusCode: httpStatusCode.methodNotAllowed,
                    body: null,
                }
            }

            const user = signIn(JSON.parse(event.body) ?? {})
            if (!user)
                return {
                    statusCode: httpStatusCode.unAuthorized,
                    body: null,
                }

            return {
                body: JSON.stringify(user),
                statusCode: httpStatusCode.ok,
            }
    }

    return {
        body: null,
        statusCode: httpStatusCode.notFound,
    }
}
