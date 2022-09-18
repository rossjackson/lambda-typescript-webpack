export interface LoggerEventLogLevelProps {
    logLevel: 'info' | 'warning' | 'error' | 'fatal'
}

export const loggerEvent =
    ({ logLevel }: LoggerEventLogLevelProps) =>
    () => {}

export const loggerEventInfo = loggerEvent({ logLevel: 'info' })
export const loggerEventWarning = loggerEvent({ logLevel: 'warning' })
export const loggerEventError = loggerEvent({ logLevel: 'error' })
export const loggerEventFatal = loggerEvent({ logLevel: 'fatal' })
