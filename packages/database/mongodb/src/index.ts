import { MongoClient, Db as MongoDb } from 'mongodb';
import { envVariable, stringIsEmpty } from '@sbfw/core';

export { Db as MongoDb } from 'mongodb';

const localDev = envVariable('MS_LOCAL_DEVELOPMENT', false, 'boolean') as boolean;

export function mongoConnectionString(dbName?: string): string {
    const connectionString = envVariable('MONGO_DB_CONNECTION', null) as string | null;
    if (connectionString) return connectionString;
    const host = envVariable('MONGO_DB_HOST', localDev ? 'localhost' : null) as string | null;
    const port = envVariable('MONGO_DB_PORT', '27017') as string | null;
    dbName = dbName || (envVariable('MONGO_DB_NAME', null) as string | null);
    const user = envVariable('MONGO_DB_USER', null) as string | null;
    const pass = envVariable('MONGO_DB_PASS', null) as string | null;
    let auth = '';
    if (user && pass) {
        auth = `${user}:${pass}@`;
        dbName = dbName || '';
        dbName += '?authSource=admin';
    }
    dbName = stringIsEmpty(dbName) ? '' : `/${dbName}`;
    return `mongodb://${auth}${host}:${port}${dbName}`;
}

export async function connectMongoClient(dbName?: string): Promise<MongoDb> {
    const client = await MongoClient.connect(mongoConnectionString());
    const db = client.db(dbName);
    global.mongoClient = db;
    return db;
}
