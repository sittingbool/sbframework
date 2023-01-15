/**
 * Randomizer functions
 * **/

const RANDOMIZE_CHARSET_DEFAULT = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Returns a random string with the defined length and the characters given
 * @param length - the number of characters the random string should have
 * @param chars - (optional) a string containing all chars that should be represented in the random string,
 * defaults to '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
 * @returns {string} - the random string
 */
export function randomString(length: number, chars: string = RANDOMIZE_CHARSET_DEFAULT): string {
    let result = '',
        i;
    for (i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

/**
 * Returns a random number between min and max (including min and max)
 * @param min - the minimum value of the random number
 * @param max - the maximum value of the random number
 * @returns {number} - the random number
 */
export function randomNumberForRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFromArray<T>(array: T[]): T {
    let index = 0;
    do {
        // otherwise this sometimes creates a non-integer index
        index = Math.floor(Math.random() * array.length);
    } while (index < 0 || index >= array.length || !Number.isInteger(index));
    return array[index];
}
