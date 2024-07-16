import dotenv from 'dotenv';

dotenv.config();

export function getEnvVariable(name, defaultValue = undefined) {
    const value = process.env[name];

    if (value !== undefined) {
        return value;
    }

    if (defaultValue !== undefined) {
        return defaultValue;
    }

    throw new Error(`Missing: process.env['${name}'].`);
}