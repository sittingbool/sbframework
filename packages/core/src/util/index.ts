import { boolFromString, stringIsEmpty } from './string.util.js';

//// export sub-modules

export * from './string.util.js';
export * from './array.util.js';
export * from './object.util.js';
export * from './random.util.js';

//// common functions

export function sleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * Parses environment variable into correct type and with a default value
 * @param varName - the name of your env variable to be read
 * @param defaultValue - the default value to return if env variable with varName does not exist
 * @param type - the data type in which to return the value
 * @return the value of the env variable if set or the default value as the given data type
 */
export function envVariable(
    varName: string,
    defaultValue: any,
    type: 'string' | 'boolean' | 'int' | 'float' = 'string',
): string | boolean | number {
    let value: any = process.env[varName];
    if (stringIsEmpty(value)) return defaultValue;
    switch (type) {
        case 'boolean':
            return boolFromString(value);
        case 'int':
            value = parseInt(value);
            if (isNaN(value)) throw Error(`Error reading ENV variable ${varName} as int. Value was parsed to NaN.`);
            return value;
        case 'float':
            value = parseFloat(value);
            if (isNaN(value)) throw Error(`Error reading ENV variable ${varName} as float. Value was parsed to NaN.`);
            return value;
        default:
            return value;
    }
}
