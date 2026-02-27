import { FormData } from '../App';

interface RequiredField {
    key: keyof FormData;
    label: string;
    step: number;
}

// Define all required fields with their display labels
const REQUIRED_FIELDS: RequiredField[] = [
    // Step 1: Product Selection
    { key: 'cardType', label: 'Card Type', step: 1 },
    { key: 'requestedCreditLimit', label: 'Requested Credit Limit', step: 1 },

    // Step 2: Personal Details
    { key: 'identityType', label: 'Identity Type', step: 2 },
    { key: 'nicNumber', label: 'NIC Number', step: 2 },
    { key: 'title', label: 'Title', step: 2 },
    { key: 'fullName', label: 'Full Name', step: 2 },
    { key: 'nameOnCard', label: 'Name on Card', step: 2 },
    { key: 'mothersMaidenName', label: "Mother's Maiden Name", step: 2 },
    { key: 'dateOfBirth', label: 'Date of Birth', step: 2 },
    { key: 'mobileNumber', label: 'Mobile Number', step: 2 },
    { key: 'emailAddress', label: 'Email Address', step: 2 },

    // Step 2: Addresses
    { key: 'homeAddressLine', label: 'Home Address', step: 2 },
    { key: 'homeDistrict', label: 'Home District', step: 2 },
    { key: 'cardDeliveryLocation', label: 'Card Delivery Location', step: 2 },

    // Step 3: Employment & Income
    { key: 'employmentSector', label: 'Employment Sector', step: 3 },
    { key: 'fieldOfEmployment', label: 'Field of Employment', step: 3 },
    { key: 'educationLevel', label: 'Education Level', step: 3 },
    { key: 'designation', label: 'Current Position/Designation', step: 3 },
    { key: 'lengthOfEmployment', label: 'Length of Employment', step: 3 },
    { key: 'employerName', label: 'Employer Name', step: 3 },
    { key: 'employerAddress', label: 'Employer Address', step: 3 },
    { key: 'officeContactNumber', label: 'Office Contact Number', step: 3 },
    { key: 'netMonthlyIncome', label: 'Net Monthly Income', step: 3 },
    { key: 'residenceType', label: 'Type of Residence', step: 3 },
    { key: 'requiresEDD', label: 'Extended Due Diligence (EDD) Required', step: 3 },
    { key: 'eddFormUpload', label: 'KYC-EDD Form', step: 3 },

    // Step 4: Supplementary Card & Referees
    { key: 'referee1Name', label: 'Referee 1 Name', step: 4 },
    { key: 'referee1NIC', label: 'Referee 1 NIC/Passport', step: 4 },
    { key: 'referee1Mobile', label: 'Referee 1 Mobile Number', step: 4 },
    { key: 'referee1Relationship', label: 'Referee 1 Relationship', step: 4 },
    { key: 'referee1Address', label: 'Referee 1 Address', step: 4 },
    { key: 'referee2Name', label: 'Referee 2 Name', step: 4 },
    { key: 'referee2NIC', label: 'Referee 2 NIC/Passport', step: 4 },
    { key: 'referee2Mobile', label: 'Referee 2 Mobile Number', step: 4 },
    { key: 'referee2Relationship', label: 'Referee 2 Relationship', step: 4 },
    { key: 'referee2Address', label: 'Referee 2 Address', step: 4 },

    // Step 5: Auto-Settlement
    { key: 'autoSettlement', label: 'Auto-Settlement Preference', step: 5 },
    { key: 'settlementPaymentOption', label: 'Settlement Payment Option', step: 5 },

    // Step 6: Documents & Declaration
    { key: 'applicationType', label: 'Application Type', step: 6 },
    { key: 'bizNicCopy', label: 'Business NIC Copy', step: 6 },
    { key: 'bizBusinessReg', label: 'Business Registration', step: 6 },
    { key: 'bizBusinessCrib', label: 'Business CRIB Report', step: 6 },
    { key: 'bizBankStatements', label: 'Bank Statements', step: 6 },
    { key: 'bizCardApplicationReview', label: 'Card Application Review', step: 6 },
    { key: 'bizCribReports', label: 'CRIB Reports', step: 6 },
    { key: 'primarySignature', label: 'Primary Signature', step: 6 },
];

// Helper function to check if a value is empty/incomplete
function isFieldEmpty(value: any): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (typeof value === 'number') return value === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'boolean') return false; // Booleans are considered valid
    return false;
}

/**
 * Validates all required fields in the form
 * Returns an array of missing field labels grouped by step
 */
export function validateRequiredFields(formData: FormData): { [step: number]: string[] } {
    const missingFields: { [step: number]: string[] } = {};

    REQUIRED_FIELDS.forEach(field => {
        const value = formData[field.key];

        // Skip validation for conditional fields
        if (shouldSkipField(field.key, formData)) {
            return;
        }

        if (isFieldEmpty(value)) {
            if (!missingFields[field.step]) {
                missingFields[field.step] = [];
            }
            missingFields[field.step].push(field.label);
        }
    });

    return missingFields;
}

/**
 * Determines if a field should be validated based on conditions
 */
function shouldSkipField(fieldKey: keyof FormData, formData: FormData): boolean {
    // Skip NIC number if identity type is Passport
    if (fieldKey === 'nicNumber' && formData.identityType === 'Passport') {
        return true;
    }

    // Skip passport fields if identity type is NIC
    if ((fieldKey === 'passportNumber' || fieldKey === 'passportExpiry') && formData.identityType === 'NIC') {
        return true;
    }

    // Skip previous employment fields if length of employment > 5 years (indicating no previous employment to report)
    if (fieldKey.toString().startsWith('prev') && formData.lengthOfEmployment >= 5) {
        return true;
    }

    // Skip supplementary card fields if not required
    if (fieldKey.toString().startsWith('supp') && formData.requireSupplementaryCard !== 'Yes') {
        return true;
    }

    // Skip "Other" fields if parent is not selected
    if (fieldKey === 'designationOther' && formData.designation !== 'Others') {
        return true;
    }

    if (fieldKey === 'prevDesignationOther' && formData.prevDesignation !== 'Others') {
        return true;
    }

    if (fieldKey === 'natureOfBusinessOther' && formData.natureOfBusiness !== 'Others') {
        return true;
    }

    // Skip correspondence address fields if not different
    if (fieldKey.toString().startsWith('correspondence') && !formData.correspondenceAddressDifferent) {
        return true;
    }

    // Skip PA fields if not required
    if (fieldKey.toString().startsWith('pa') && formData.requirePA !== 'Yes') {
        return true;
    }

    // Skip EDD form upload if not required
    if (fieldKey === 'eddFormUpload' && formData.requiresEDD !== 'Yes') {
        return true;
    }

    // Skip Individual documents if Business type
    if (fieldKey.toString().startsWith('ind') && formData.applicationType !== 'Individual') {
        return true;
    }

    // Skip Business documents if Individual type
    if (fieldKey.toString().startsWith('biz') && formData.applicationType !== 'Business') {
        return true;
    }

    return false;
}

/**
 * Formats missing fields as a simple bullet list
 */
export function formatMissingFields(missingFields: { [step: number]: string[] }): string {
    if (Object.keys(missingFields).length === 0) {
        return 'All required fields are completed!';
    }

    // Flatten all missing fields into a single list
    const allMissingFields: string[] = [];
    const sortedSteps = Object.keys(missingFields).sort((a, b) => parseInt(a) - parseInt(b));

    sortedSteps.forEach(step => {
        const stepNum = parseInt(step);
        const fields = missingFields[stepNum];
        if (fields && fields.length > 0) {
            allMissingFields.push(...fields);
        }
    });

    // Format as simple bullet list
    if (allMissingFields.length === 0) {
        return 'No missing fields detected.';
    }

    return allMissingFields.map(field => `• ${field}`).join('\n');
}
