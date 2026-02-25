/**
 * Validates Sri Lankan NIC (National Identity Card) numbers
 * Supports both old format (9 digits + V/X) and new format (12 digits)
 */

export interface NICValidationResult {
    isValid: boolean;
    format?: 'old' | 'new';
    message?: string;
}

/**
 * Validates a NIC number
 * @param nic - The NIC number to validate
 * @returns Validation result with format information
 */
export function validateNIC(nic: string): NICValidationResult {
    if (!nic || nic.trim() === '') {
        return {
            isValid: false,
            message: 'NIC number is required'
        };
    }

    const trimmedNIC = nic.trim();

    // Old NIC format: 9 digits followed by V or X (e.g., 123456789V)
    const oldNICPattern = /^[0-9]{9}[VvXx]$/;

    // New NIC format: 12 digits (e.g., 200012345678)
    const newNICPattern = /^[0-9]{12}$/;

    if (oldNICPattern.test(trimmedNIC)) {
        return {
            isValid: true,
            format: 'old',
            message: 'Valid old NIC format'
        };
    }

    if (newNICPattern.test(trimmedNIC)) {
        return {
            isValid: true,
            format: 'new',
            message: 'Valid new NIC format'
        };
    }

    return {
        isValid: false,
        message: 'Invalid NIC format. Use either 9 digits + V/X (old) or 12 digits (new)'
    };
}

/**
 * Formats NIC input by converting to uppercase
 * @param nic - The NIC number to format
 * @returns Formatted NIC
 */
export function formatNICInput(nic: string): string {
    return nic.toUpperCase();
}
