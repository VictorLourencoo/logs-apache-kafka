export interface LogsContract {
    level: string
    message: string
    metadata?: Record<string, any>
}
