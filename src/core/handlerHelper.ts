import { APIGatewayProxyEvent } from 'aws-lambda'
import ApiException from './ApiException'
import { httpStatusCode } from './httpStatusCode'

export interface ValidateHandlerMethodProps {
    acceptedMethod: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'
    event: APIGatewayProxyEvent
}

export const validateHandlerMethod = ({
    acceptedMethod,
    event: { httpMethod },
}: ValidateHandlerMethodProps): boolean => {
    if (acceptedMethod !== httpMethod) {
        throw new ApiException({
            code: httpStatusCode.methodNotAllowed,
            message: 'Method not allowed.',
        })
    }
    return true
}
