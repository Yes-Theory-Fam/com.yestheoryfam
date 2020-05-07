import { DiscordApi } from './index';
import winston from 'winston';
import DiscordTransport from 'winston-discord-transport';

const logger = winston.createLogger({
    transports: [
        new DiscordTransport({
            webhook: process.env.REACT_APP_DISCORD_BOT_WEBHOOK || '',
            defaultMeta: { service: 'yestheory_fam_logger' },
            level: 'warn'
        })
    ],
});

export const logWarn = (message: string) => {
    logger.log({
        level: 'warn',
        message: message,
    });
}

export const logError = (message: string, error: Error) => {
    logger.log({
        level: 'error',
        message: message,
        error: error,
    });
}

export const logInfo = (message: string) => {
    logger.log({
        level: 'info',
        message: message,
    });
}