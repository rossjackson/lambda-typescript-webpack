export interface ApiExceptionProps {
    code: number
    status?: string
    message: string
}

class ApiException extends Error {
    code: number
    status?: string

    constructor({ message, code, status }: ApiExceptionProps) {
        super(message)
        this.code = code
        this.status = status
    }
}

export default ApiException
