import express, { Application, Request, Response, NextFunction } from 'express'
import { LoggerContract } from '../../Domain/logger'

export function BuildServer(logger: LoggerContract, env: { PORT: number, NODE_ENV: string }): Application {
    const app = express()

    app.use((req: Request, res: Response, next: NextFunction) => {
        logger.info(`Incoming request: ${req.method} ${req.url}`, { headers: req.headers })
        res.on('finish', () => {
            logger.info(`Response status: ${res.statusCode}`, { method: req.method, url: req.url })
        })
        next()
    })

    app.use(express.json())

    app.get('/health', (req: Request, res: Response) => {
        res.status(200).json({ status: 'UP', environment: env.NODE_ENV })
    })

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error('Error handling request', { message: err.message, stack: err.stack })
        res.status(500).json({ error: 'Internal Server Error' })
    })

    return app
}
