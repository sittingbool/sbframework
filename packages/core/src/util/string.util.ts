/**
 * Determines if a string is empty or not a string at all.
 * @param string - string to be checked
 * @returns {boolean} - true if not a string or empty (zero length of characters; ' ' will return false)
 */
export function stringIsEmpty(string: string | undefined): boolean {
    return typeof string !== 'string' || !string;
}

/**
 * Returns given string with a capital first letter
 * @param string - string to be altered
 * @returns {string} - string as given just with capital first letter
 */
export function capitalize(string: string): string {
    if (stringIsEmpty(string.trim())) {
        return string;
    }

    const firstChar = string.charAt(0);

    string = string.substring(1);

    string = firstChar.toUpperCase() + string;

    return string;
}

/**
 * Returns given string with a lowercase first letter
 * @param string - string to be altered
 * @returns {string} - string as given just with lowercase first letter
 */
export function deCapitalize(string: string): string {
    if (stringIsEmpty(string.trim())) {
        return string;
    }

    const firstChar = string.charAt(0);

    string = string.substring(1);

    string = firstChar.toLowerCase() + string;

    return string;
}

/**
 * Returns the plurals english word for a given singular word.
 * E.g. House -> Houses, Address -> Addresses, City -> Cities
 * @param string - the singular english word
 * @returns {string} - the plural english word
 */
export function pluralize(string: string): string {
    let pluralChar = 's';

    if (stringIsEmpty(string.trim())) {
        return string;
    }

    const lastChar = string.charAt(string.length - 1);

    switch (lastChar) {
        case 's':
        case 'x':
            pluralChar = 'es';
            break;

        case 'y':
            string = string.substring(0, string.length - 1);
            pluralChar = 'ies';
            break;

        default:
            break;
    }

    return string + pluralChar;
}

/**
 * returns a new string containing all chars that are in value and allowedChars
 * @param value - the value to be stripped of non-allowed chars
 * @param allowedChars - a list of allowed chars
 * @param caseSensitive - should allowedChars be seen as case-sensitive; defaults to false
 * @returns {string} - the stripped string
 */
export function stripString(value: string, allowedChars: string | string[], caseSensitive = false): string {
    if (stringIsEmpty(value)) return value;
    if (!Array.isArray(allowedChars)) allowedChars = allowedChars.split('');
    if (!caseSensitive) {
        allowedChars = allowedChars.map((i) => i.toLowerCase()).concat(allowedChars.map((i) => i.toUpperCase()));
    }
    return value
        .split('')
        .filter((char) => allowedChars.indexOf(char) >= 0)
        .join('');
}

/**
 * checks how often an expression can be found in a string
 * @param value - the string to be looking into
 * @param expression - the RegExp or string that should be searched for
 * @param caseSensitive - if expression is a string this can be to true if you need to check case-sensitive
 * @returns {number} - the number of times the expression was found
 */
export function numberOfMatches(value: string, expression: RegExp | string, caseSensitive = false): number {
    if (stringIsEmpty(value)) return 0;
    if (typeof expression === 'string') {
        expression = new RegExp(expression, caseSensitive ? 'g' : 'ig');
    }
    return (value.match(expression) || []).length;
}

/**
 * converts a string to a boolean value if its lower case version matches the string 'true', '1', 'yes' or 'false', '0', 'no'
 * @param value - the string to be converted
 * @param trim - if true the string will be trimmed before converting
 * @returns {boolean} the bool value of the string or undefined if it does not match 'true', '1', 'yes' or 'false', '0', 'no'
 */
export function boolFromString(value: string, trim: boolean = true): boolean | undefined {
    if (stringIsEmpty(value)) return;
    value = trim ? value.trim() : value;
    switch (value.toLowerCase()) {
        case 'no':
        case 'false':
        case '0':
            return false;

        case 'yes':
        case 'true':
        case '1':
            return true;

        default:
            return;
    }
}
