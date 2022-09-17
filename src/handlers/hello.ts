import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.info(event)
    return { body: JSON.stringify({ message: 'hellos' }), statusCode: 200 }
}
