import seylanLogo from 'figma:asset/132041194bd3ff5904e596a3b127b141748144f5.png';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import ContactResidence from './components/ContactResidence';
import Declaration from './components/Declaration';
import EmploymentFinancials from './components/EmploymentFinancials';
import IncompleteApplicationModal from './components/IncompleteApplicationModal';
import JointApplicantsReferees from './components/JointApplicantsReferees';
import PersonalDetails from './components/PersonalDetails';
import Preferences from './components/Preferences';
import ProductSelection from './components/ProductSelection';
import { formatMissingFields, validateRequiredFields } from './utils/formValidation';

export interface FormData {
  // Step 1: Product Selection
  cardType: string;
  requestedCreditLimit: number;

  // Step 2: Personal Identification
  identityType: 'NIC' | 'Passport' | '';
  nicNumber: string;
  passportNumber: string;
  passportExpiry: string;
  visaNumber: string;
  visaType: string;
  visaExpiry: string;
  title: string;
  fullName: string;
  nameOnCard: string;
  mothersMaidenName: string;
  dateOfBirth: string;
  mobileNumber: string;
  homeTelephone: string;
  emailAddress: string;

  // Step 2: Addresses (collected once)
  homeAddressLine: string;
  homeDistrict: string;
  correspondenceAddressDifferent: boolean;
  correspondenceAddressLine: string;
  correspondenceDistrict: string;
  workAddressLine: string;
  workDistrict: string;
  cardDeliveryLocation: string;
  cardDeliveryBranch: string;

  // Step 3: Employment & Income
  employmentSector: string;
  natureOfBusiness: string;
  natureOfBusinessOther: string;
  fieldOfEmployment: string;
  educationLevel: string;
  designation: string;
  designationOther: string;
  lengthOfEmployment: number;
  employerName: string;
  employerAddress: string;
  officeContactNumber: string;
  prevEmployerName: string;
  prevEmployerAddress: string;
  prevLengthOfService: number;
  prevDesignation: string;
  prevDesignationOther: string;
  netMonthlyIncome: number;
  otherIncome: number;
  otherIncomeSource: string;
  residenceType: string;
  numberOfDependents: number;

  // Step 3: PEP/EDD
  isPEP: string;
  isPEPRelated: string;
  pepNatureOfRelationship: string;
  pepFormUpload: string;
  requiresEDD: string;
  eddFormUpload: string;

  // Step 4: Supplementary Card
  requireSupplementaryCard: string;
  suppTitle: string;
  suppFullName: string;
  suppMothersMaidenName: string;
  suppNameOnCard: string;
  suppDateOfBirth: string;
  suppIdentityType: string;
  suppNICNumber: string;
  suppPassportNumber: string;
  suppPassportExpiry: string;
  suppVisaNumber: string;
  suppVisaType: string;
  suppVisaExpiry: string;
  suppRelationship: string;
  suppHomeAddress: string;
  suppTelephone: string;
  suppRequestedCreditLimit: number;
  suppSignature: string;
  suppPassportBioPage: string;

  // Step 4: Referees (removed joint applicant, keeping 2 referees)
  referee1Name: string;
  referee1NIC: string;
  referee1Mobile: string;
  referee1Relationship: string;
  referee1Address: string;
  referee1HomeTelephone: string;
  referee2Name: string;
  referee2NIC: string;
  referee2Mobile: string;
  referee2Relationship: string;
  referee2Address: string;
  referee2HomeTelephone: string;

  // Step 5: Auto-Settlement
  autoSettlement: string;
  settlementAccountNumber: string;
  settlementBranch: string;
  settlementPaymentOption: string;

  // Step 5: Value-Added Services
  valueAddedServices: string;
  vasWrittenRequestUpload: string;
  paperStatementAddress: string;
  selectedVAS: string[];

  // Step 5: Personal Assistant Authorization
  requirePA: string;
  paTitle: string;
  paName: string;
  paNIC: string;
  paAddress: string;
  paContactNumber: string;
  paEmail: string;
  paAuthorizationConsent: boolean;

  // Step 6: Application Type & Support Documents
  applicationType: 'Individual' | 'Business' | '';
  // Individual applicant documents
  indNicCopy: string;
  indSalarySlips: string;
  indConditionChecklist: string;
  indGuarantorNic: string;
  indAddressProof: string;
  indCribReports: string;
  // Business applicant documents
  bizNicCopy: string;
  bizBusinessReg: string;
  bizBusinessCrib: string;
  bizBankStatements: string;
  bizCardApplicationReview: string;
  bizCribReports: string;

  // Step 7: Signatures & Declaration
  primarySignature: string;
  declarationConsent: boolean;
  signatureDate: string;
  bankName: string;
  suppSignature: string;
  suppSignatureDate: string;
  authorizedOfficerSignature: string;
  authorizedOfficerDate: string;
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [missingFieldsText, setMissingFieldsText] = useState('');
  const [isSavingIncomplete, setIsSavingIncomplete] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    cardType: '',
    requestedCreditLimit: 100000,
    identityType: '',
    nicNumber: '',
    passportNumber: '',
    passportExpiry: '',
    visaNumber: '',
    visaType: '',
    visaExpiry: '',
    title: '',
    fullName: '',
    nameOnCard: '',
    mothersMaidenName: '',
    dateOfBirth: '',
    mobileNumber: '',
    homeTelephone: '',
    emailAddress: '',
    homeAddressLine: '',
    homeDistrict: '',
    correspondenceAddressDifferent: false,
    correspondenceAddressLine: '',
    correspondenceDistrict: '',
    workAddressLine: '',
    workDistrict: '',
    cardDeliveryLocation: '',
    cardDeliveryBranch: '',
    employmentSector: '',
    natureOfBusiness: '',
    natureOfBusinessOther: '',
    fieldOfEmployment: '',
    educationLevel: '',
    designation: '',
    designationOther: '',
    lengthOfEmployment: 0,
    employerName: '',
    employerAddress: '',
    officeContactNumber: '',
    prevEmployerName: '',
    prevEmployerAddress: '',
    prevLengthOfService: 0,
    prevDesignation: '',
    prevDesignationOther: '',
    netMonthlyIncome: 0,
    otherIncome: 0,
    otherIncomeSource: '',
    residenceType: '',
    numberOfDependents: 0,
    isPEP: '',
    isPEPRelated: '',
    pepNatureOfRelationship: '',
    pepFormUpload: '',
    requiresEDD: '',
    eddFormUpload: '',
    requireSupplementaryCard: '',
    suppTitle: '',
    suppFullName: '',
    suppMothersMaidenName: '',
    suppNameOnCard: '',
    suppDateOfBirth: '',
    suppIdentityType: '',
    suppNICNumber: '',
    suppPassportNumber: '',
    suppPassportExpiry: '',
    suppVisaNumber: '',
    suppVisaType: '',
    suppVisaExpiry: '',
    suppRelationship: '',
    suppHomeAddress: '',
    suppTelephone: '',
    suppRequestedCreditLimit: 0,
    suppSignature: '',
    suppPassportBioPage: '',
    referee1Name: '',
    referee1NIC: '',
    referee1Mobile: '',
    referee1Relationship: '',
    referee1Address: '',
    referee1HomeTelephone: '',
    referee2Name: '',
    referee2NIC: '',
    referee2Mobile: '',
    referee2Relationship: '',
    referee2Address: '',
    referee2HomeTelephone: '',
    autoSettlement: '',
    settlementAccountNumber: '',
    settlementBranch: '',
    settlementPaymentOption: '',
    valueAddedServices: '',
    vasWrittenRequestUpload: '',
    paperStatementAddress: '',
    selectedVAS: [],
    requirePA: '',
    paTitle: '',
    paName: '',
    paNIC: '',
    paAddress: '',
    paContactNumber: '',
    paEmail: '',
    paAuthorizationConsent: false,
    applicationType: '',
    indNicCopy: '',
    indSalarySlips: '',
    indConditionChecklist: '',
    indGuarantorNic: '',
    indAddressProof: '',
    indCribReports: '',
    bizNicCopy: '',
    bizBusinessReg: '',
    bizBusinessCrib: '',
    bizBankStatements: '',
    bizCardApplicationReview: '',
    bizCribReports: '',
    primarySignature: '',
    declarationConsent: false,
    signatureDate: new Date().toLocaleDateString('en-GB'),
    bankName: '',
    suppSignature: '',
    suppSignatureDate: new Date().toLocaleDateString('en-GB'),
    authorizedOfficerSignature: '',
    authorizedOfficerDate: new Date().toLocaleDateString('en-GB'),
  });

  const totalSteps = 6;

  // Check if all required business applicant documents are uploaded
  const areAllDocumentsUploaded = () => {
    const requiredDocs = [
      formData.bizNicCopy,
      formData.bizBusinessReg,
      formData.bizBusinessCrib,
      formData.bizBankStatements,
      formData.bizCardApplicationReview,
      formData.bizCribReports,
    ];

    // Check if supplementary card passport bio page is required
    if (formData.requireSupplementaryCard === 'Yes' && formData.suppIdentityType === 'Passport') {
      requiredDocs.push(formData.suppPassportBioPage);
    }

    return requiredDocs.every(doc => doc && doc.trim() !== '');
  };

  const isCompleteButtonDisabled = currentStep === totalSteps && !areAllDocumentsUploaded();
  const buttonText = currentStep === totalSteps
    ? (areAllDocumentsUploaded() ? 'Submit' : 'Save as Incomplete')
    : 'Next';

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSaveIncomplete = () => {
    // Validate required fields
    const missingFields = validateRequiredFields(formData);
    const formattedMissingFields = formatMissingFields(missingFields);

    console.log('Missing fields:', missingFields);
    console.log('Formatted text:', formattedMissingFields);

    // Show modal with missing fields
    setMissingFieldsText(formattedMissingFields);
    setShowIncompleteModal(true);
  };

  const handleConfirmSaveIncomplete = () => {
    setIsSavingIncomplete(true);

    // Simulate API call to save incomplete application
    setTimeout(() => {
      // Save to localStorage or send to backend
      const applicationData = {
        formData,
        savedAt: new Date().toISOString(),
        status: 'incomplete',
      };

      localStorage.setItem('creditCardApplication', JSON.stringify(applicationData));

      setIsSavingIncomplete(false);
      setShowIncompleteModal(false);

      // Show success message or redirect
      alert('Application saved as incomplete. You can continue later.');
      // Optionally: window.location.href = '/dashboard';
    }, 1000);
  };

  const handleCancelSaveIncomplete = () => {
    setShowIncompleteModal(false);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === totalSteps && areAllDocumentsUploaded()) {
      // Submit the form if all documents are uploaded
      handleSubmitForm();
    }
  };

  const handleSubmitForm = () => {
    // TODO: Implement actual form submission
    const applicationData = {
      formData,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
    };

    localStorage.setItem('creditCardApplication', JSON.stringify(applicationData));
    alert('Application submitted successfully!');
    // Optionally: window.location.href = '/confirmation';
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ProductSelection formData={formData} updateFormData={updateFormData} />;
      case 2:
        return (
          <div className="space-y-8">
            <PersonalDetails formData={formData} updateFormData={updateFormData} />
            <ContactResidence formData={formData} updateFormData={updateFormData} />
          </div>
        );
      case 3:
        return <EmploymentFinancials formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <JointApplicantsReferees formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <Preferences formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <Declaration formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#C8102E] text-white py-6 px-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={seylanLogo}
                alt="Seylan Bank"
                className="h-12 md:h-16 w-auto bg-white px-3 py-2 rounded"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Seylan Bank</h1>
                <p className="text-xs md:text-sm mt-1 italic">"we take you Places"</p>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold">Digital Credit Card Application</p>
              <p className="text-xs mt-1 opacity-90">Secure & Fast</p>
            </div>
          </div>
          <p className="text-xs mt-3 md:hidden text-center">Digital Credit Card Application</p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${step < currentStep
                      ? 'bg-green-500 text-white'
                      : step === currentStep
                        ? 'bg-[#C8102E] text-white'
                        : 'bg-gray-200 text-gray-400'
                      }`}
                  >
                    {step < currentStep ? <Check size={20} /> : step}
                  </div>
                  <span className="text-xs mt-2 text-center hidden md:block">
                    {step === 1 && 'Card Selection'}
                    {step === 2 && 'Personal & Address'}
                    {step === 3 && 'Employment'}
                    {step === 4 && 'Supplementary'}
                    {step === 5 && 'Preferences'}
                    {step === 6 && 'Declaration'}
                  </span>
                </div>
                {step < 6 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            <button
              onClick={() => {
                if (currentStep === totalSteps && !areAllDocumentsUploaded()) {
                  handleSaveIncomplete();
                } else if (currentStep === totalSteps && areAllDocumentsUploaded()) {
                  handleSubmitForm();
                } else {
                  nextStep();
                }
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#C8102E] text-white hover:bg-[#A00D24] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {buttonText}
              {currentStep !== totalSteps && <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </main>

      {/* Incomplete Application Modal */}
      <IncompleteApplicationModal
        isOpen={showIncompleteModal}
        missingFields={missingFieldsText}
        onConfirm={handleConfirmSaveIncomplete}
        onCancel={handleCancelSaveIncomplete}
        isLoading={isSavingIncomplete}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center text-sm">
          <p>&copy; 2026 Seylan Bank. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Secure Application Process | Your data is protected</p>
        </div>
      </footer>
    </div>
  );
}