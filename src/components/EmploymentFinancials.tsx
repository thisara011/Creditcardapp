import { AlertCircle, Briefcase, DollarSign, MapPin, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormData } from '../App';
import { captureAuthorizedSignature } from '../services/pepSignatureService';
import SearchableBranchSelect from './SearchableBranchSelect';
import SignaturePad from './SignaturePad';

interface Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const naturesOfBusiness = [
  'Advertising', 'Government', 'Plantation', 'Airline / Travel', 'Healthcare',
  'Professional Services', 'Armed Services', 'Hotel & Hospitality', 'Banking / Finance',
  'Information Technology (IT)', 'Trading', 'Construction', 'Insurance', 'Telecommunication',
  'Freight Forwarding / Shipping', 'Manufacturing', 'Apparel', 'NGO / NPO / Charity', 'Other'
];

const fieldsOfEmployment = [
  'ADMIN. & MANAG', 'CLERK', 'CLERICAL', 'DEPENDANT', 'DIRECTOR', 'ENGINEER', 'FLORA / FAUNA',
  'REGISTER JUDGE', 'PROD TRAN LABOR', 'MANAGER', 'MILITARY', 'POLICEMAN', 'PROPRIETOR',
  'RETIRED', 'SALES', 'SECRETARY', 'STAFF', 'STUDENT', 'SERVICE', 'PROF. TECH', 'TEACHER',
  'UNEMPLOYED', 'HOUSEWIFE', 'RFD SP', 'PILOTS', 'BANKERS', 'DOCTOR', 'ACCOUNTANTS',
  'LAWYERS', 'CONSULTANTS', 'BUSINESS ANALYST', 'ARCHITECT', 'IT PROFESSIONAL',
  'AGM / DGM', 'CEO / GM / MD', 'PROFESSIONAL', 'NURSE', 'SUPERVISOR / EXECUTIVE',
  'CHEF / COOK', 'MERCHANDISER', 'MEDIA / JOURNALIST', 'Other'
];

const educationLevels = [
  'Professional Qualification (MBBS, LLB/Attorney at Law, BSc Eng, ACA, CFA etc.)/ Post Graduate (MBA, etc )',
  'Graduates',
  'Vocational Training / Diploma Holders',
  'Advanced Level',
  'Up to Ordinary Level'
];

const positions = [
  'Corporate Management',
  'Senior Management',
  'Executive/ Middle Management/ Employed Professionals',
  'Others'
];

const employmentStatuses = [
  'Perment',
  'Probation',
  'Contract',
  'Daily Wage erner'
];

const residenceTypes = [
  'Own (Not Mortgaged)',
  'Own (Mortgaged)',
  'Parents / Spouse\'s House',
  'Leased/ Rented'
];

const pepSourceOfWealthOptions = [
  'Investments',
  'Gifts',
  'Inheritance',
  'Remuneration and Benefits',
  'Business Profit',
  'Other'
];

const pepEstimatedWealthOptions = [
  'Property - Residential / Commercial',
  'Vehicles',
  'Shares / Stocks',
  'Remuneration and Benefits',
  'Other'
];

export default function EmploymentFinancials({ formData, updateFormData }: Props) {
  const [showPepEddApplication, setShowPepEddApplication] = useState(false);
  const [isCapturingAuthorizedSignature, setIsCapturingAuthorizedSignature] = useState(false);
  const [pepSignatureError, setPepSignatureError] = useState('');

  // Store total length in years as a decimal in formData, but show separate Years + Months inputs in the UI
  const currentYears = Math.floor(formData.lengthOfEmployment || 0);
  const currentMonths = Math.round(((formData.lengthOfEmployment || 0) - currentYears) * 12);

  const prevYears = Math.floor(formData.prevLengthOfService || 0);
  const prevMonths = Math.round(((formData.prevLengthOfService || 0) - prevYears) * 12);

  const showPreviousEmployment = formData.lengthOfEmployment < 1;

  const handleCurrentLengthChange = (years: number, months: number) => {
    const safeYears = Math.max(0, years);
    const safeMonths = Math.min(11, Math.max(0, months));
    const totalYears = safeYears + safeMonths / 12;
    updateFormData({ lengthOfEmployment: totalYears });
  };

  const handlePrevLengthChange = (years: number, months: number) => {
    const safeYears = Math.max(0, years);
    const safeMonths = Math.min(11, Math.max(0, months));
    const totalYears = safeYears + safeMonths / 12;
    updateFormData({ prevLengthOfService: totalYears });
  };

  useEffect(() => {
    const shouldOpenPepForm = formData.isPEP === 'Yes' || formData.isPEPRelated === 'Yes';
    if (shouldOpenPepForm) {
      setShowPepEddApplication(true);
    }
  }, [formData.isPEP, formData.isPEPRelated]);

  const handleCaptureAuthorizedSignature = async () => {
    setPepSignatureError('');

    if (!formData.pepAuthorizedEmployeeNumber.trim()) {
      setPepSignatureError('Please enter the authorized employee number.');
      return;
    }

    try {
      setIsCapturingAuthorizedSignature(true);
      const signature = await captureAuthorizedSignature(formData.pepAuthorizedEmployeeNumber);
      updateFormData({ pepAuthorizedSignature: signature });
    } catch (error) {
      setPepSignatureError(error instanceof Error ? error.message : 'Unable to capture authorized signature.');
    } finally {
      setIsCapturingAuthorizedSignature(false);
    }
  };

  const handleClosePepEddApplication = () => {
    const isPepApplicationSigned = Boolean(formData.pepApplicantSignature && formData.pepAuthorizedSignature);
    updateFormData({ pepFormUpload: isPepApplicationSigned ? 'PEP / EDD application completed' : '' });
    setShowPepEddApplication(false);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Briefcase className="text-[#C8102E]" size={28} />
        <h2 className="text-2xl font-bold text-gray-900">Employment & Income Details</h2>
      </div>
      <p className="text-gray-600 mb-6">Please provide your employment and financial information</p>

      <div className="space-y-6">
        {/* Employment Sector */}
        <div>
          <label htmlFor="employment-sector" className="block text-sm font-medium text-gray-700 mb-2">
            Employment Sector <span className="text-red-500">*</span>
          </label>
          <select
            id="employment-sector"
            value={formData.employmentSector}
            onChange={(e) => updateFormData({ employmentSector: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          >
            <option value="">Select Employment Sector</option>
            <option value="Public Sector">Public Sector</option>
            <option value="Private Sector">Private Sector</option>
            <option value="Self-Employed">Self-Employed</option>
          </select>
        </div>

        {/* Nature of Business */}
        <div>
          <label htmlFor="nature-of-business" className="block text-sm font-medium text-gray-700 mb-2">
            Nature of Business <span className="text-red-500">*</span>
          </label>
          <select
            id="nature-of-business"
            value={formData.natureOfBusiness}
            onChange={(e) => updateFormData({ natureOfBusiness: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          >
            <option value="">Select Nature of Business</option>
            {naturesOfBusiness.map((business) => (
              <option key={business} value={business}>{business}</option>
            ))}
          </select>
        </div>

        {/* Other Nature of Business */}
        {formData.natureOfBusiness === 'Other' && (
          <div>
            <label htmlFor="nature-of-business-other" className="block text-sm font-medium text-gray-700 mb-2">
              Specify Other Nature of Business <span className="text-red-500">*</span>
            </label>
            <input
              id="nature-of-business-other"
              type="text"
              value={formData.natureOfBusinessOther}
              onChange={(e) => updateFormData({ natureOfBusinessOther: e.target.value })}
              placeholder="Please specify"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
            />
          </div>
        )}

        {/* Field of Employment */}
        <div>
          <label htmlFor="field-of-employment" className="block text-sm font-medium text-gray-700 mb-2">
            Field of Employment <span className="text-red-500">*</span>
          </label>
          <select
            id="field-of-employment"
            value={formData.fieldOfEmployment}
            onChange={(e) => updateFormData({ fieldOfEmployment: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          >
            <option value="">Select Field of Employment</option>
            {fieldsOfEmployment.map((field) => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>
        </div>

        {/* Other Field of Employment - Text Input */}
        {formData.fieldOfEmployment === 'Other' && (
          <div>
            <label htmlFor="field-of-employment-other" className="block text-sm font-medium text-gray-700 mb-2">
              Specify Your Field of Employment <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="field-of-employment-other"
              placeholder="Enter your field of employment"
              value={formData.fieldOfEmploymentOther || ''}
              onChange={(e) => updateFormData({ fieldOfEmploymentOther: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
            />
          </div>
        )}

        {/* Extended Due Diligence (EDD) Question */}
        <div className="border-t-2 border-gray-200 pt-6 mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Is Extended Due Diligence (EDD) Required? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="requiresEDD"
                value="Yes"
                checked={formData.requiresEDD === 'Yes'}
                onChange={(e) => updateFormData({ requiresEDD: e.target.value })}
                className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
              />
              <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="requiresEDD"
                value="No"
                checked={formData.requiresEDD === 'No'}
                onChange={(e) => updateFormData({ requiresEDD: e.target.value })}
                className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
              />
              <span className="ml-2 text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* EDD Form Upload - Conditional */}
        {formData.requiresEDD === 'Yes' && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <div className="flex gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Complete the EDD and Upload KYC-EDD Form <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    title="Upload EDD form"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        updateFormData({ eddFormUpload: e.target.files[0].name });
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  />
                  <Upload className="text-[#C8102E] flex-shrink-0" size={20} />
                </div>
                <p className="text-xs text-gray-600 mt-2">Accepted formats: PDF, JPG, PNG (file capacity less than 5 MB)</p>
                {formData.eddFormUpload && (
                  <p className="text-xs text-green-600 mt-2">✓ File uploaded: {formData.eddFormUpload}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Employer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.employerName}
            onChange={(e) => updateFormData({ employerName: e.target.value })}
            placeholder="Current employer name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
        </div>

        {/* Employer Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employer Address <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.employerAddress}
            onChange={(e) => updateFormData({ employerAddress: e.target.value })}
            placeholder="Enter employer address"
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
        </div>

        {/* Education Level */}
        <div>
          <label htmlFor="education-level" className="block text-sm font-medium text-gray-700 mb-2">
            Education Level <span className="text-red-500">*</span>
          </label>
          <select
            id="education-level"
            value={formData.educationLevel}
            onChange={(e) => updateFormData({ educationLevel: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          >
            {educationLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Position */}
        <div>
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
            Position <span className="text-red-500">*</span>
          </label>
          <select
            id="designation"
            value={formData.designation}
            onChange={(e) => updateFormData({ designation: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          >
            {positions.map((position) => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>

        {/* Other Position */}
        {formData.designation === 'Others' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specify Position <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.designationOther}
              onChange={(e) => updateFormData({ designationOther: e.target.value })}
              placeholder="Please specify your position"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
            />
          </div>
        )}

        {/* Length of Current Employment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Length of Current Employment (Years and Months) <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="current-years" className="block text-xs font-medium text-gray-600 mb-1">Years</label>
              <input
                id="current-years"
                type="number"
                min={0}
                value={currentYears}
                onChange={(e) => handleCurrentLengthChange(Number(e.target.value || 0), currentMonths)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="current-months" className="block text-xs font-medium text-gray-600 mb-1">Months</label>
              <input
                id="current-months"
                type="number"
                min={0}
                max={11}
                value={currentMonths}
                onChange={(e) => handleCurrentLengthChange(currentYears, Number(e.target.value || 0))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            If you have worked less than 1 year here, previous employment details will be required.
          </p>
        </div>

        {/* Employment Status */}
        <div>
          <label htmlFor="employment-status" className="block text-sm font-medium text-gray-700 mb-2">
            Employment Status <span className="text-red-500">*</span>
          </label>
          <select
            id="employment-status"
            value={formData.employmentStatus}
            onChange={(e) => updateFormData({ employmentStatus: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          >
            <option value="">Select Employment Status</option>
            {employmentStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Previous Employment (if < 1 year) */}
        {showPreviousEmployment && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex items-start gap-2 mb-4">
              <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-yellow-800">Previous Employment Required</h4>
                <p className="text-yellow-700 text-sm mt-1">
                  Since your current employment is less than 1 year, please provide previous employment details
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Employer Name
                </label>
                <input
                  type="text"
                  value={formData.prevEmployerName}
                  onChange={(e) => updateFormData({ prevEmployerName: e.target.value })}
                  placeholder="Previous employer name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Employer Address
                </label>
                <textarea
                  value={formData.prevEmployerAddress}
                  onChange={(e) => updateFormData({ prevEmployerAddress: e.target.value })}
                  placeholder="Previous employer address"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length of Service (Years and Months)
                </label>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label htmlFor="prev-years" className="block text-xs font-medium text-gray-600 mb-1">Years</label>
                    <input
                      id="prev-years"
                      type="number"
                      min={0}
                      value={prevYears}
                      onChange={(e) => handlePrevLengthChange(Number(e.target.value || 0), prevMonths)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="prev-months" className="block text-xs font-medium text-gray-600 mb-1">Months</label>
                    <input
                      id="prev-months"
                      type="number"
                      min={0}
                      max={11}
                      value={prevMonths}
                      onChange={(e) => handlePrevLengthChange(prevYears, Number(e.target.value || 0))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="prev-designation" className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Position
                </label>
                <select
                  id="prev-designation"
                  value={formData.prevDesignation}
                  onChange={(e) => updateFormData({ prevDesignation: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                >
                  {positions.map((position) => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
              </div>

              {formData.prevDesignation === 'Others' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specify Previous Position
                  </label>
                  <input
                    type="text"
                    value={formData.prevDesignationOther}
                    onChange={(e) => updateFormData({ prevDesignationOther: e.target.value })}
                    placeholder="Please specify your previous position"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Net Monthly Income */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <DollarSign size={18} className="text-[#C8102E]" />
            Net Monthly Income (LKR) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.netMonthlyIncome}
            onChange={(e) => updateFormData({ netMonthlyIncome: Number(e.target.value) })}
            min="0"
            placeholder="Enter net monthly income"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
        </div>

        {/* Other Income */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <DollarSign size={18} className="text-[#C8102E]" />
            Other Income (LKR)
          </label>
          <input
            type="number"
            value={formData.otherIncome}
            onChange={(e) => updateFormData({ otherIncome: Number(e.target.value) })}
            min="0"
            placeholder="Enter other income (if any)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
        </div>

        {/* Source of Other Income */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source of Other Income
          </label>
          <input
            type="text"
            value={formData.otherIncomeSource}
            onChange={(e) => updateFormData({ otherIncomeSource: e.target.value })}
            placeholder="e.g., Rental income, Investments, Business"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
        </div>

        {/* Type of Residence */}
        <div>
          <label htmlFor="residence-type" className="block text-sm font-medium text-gray-700 mb-2">
            Type of Residence (billing proof required) <span className="text-red-500">*</span>
          </label>
          <select
            id="residence-type"
            value={formData.residenceType}
            onChange={(e) => updateFormData({ residenceType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          >
            {residenceTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Number of Dependents */}
        <div>
          <label htmlFor="number-of-dependents" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Dependents <span className="text-red-500">*</span>
          </label>
          <input
            id="number-of-dependents"
            type="number"
            value={formData.numberOfDependents}
            onChange={(e) => updateFormData({ numberOfDependents: Number(e.target.value) })}
            min="0"
            placeholder="Enter number of dependents"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
        </div>

        {/* Work Address & Office Contact (moved from Address Details) */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-[#C8102E]" />
            Work Address & Office Contact
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Address Line <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.workAddressLine}
                onChange={(e) => updateFormData({ workAddressLine: e.target.value })}
                placeholder="Enter work/office address"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Office Contact Number
              </label>
              <input
                type="tel"
                value={formData.officeContactNumber}
                onChange={(e) => updateFormData({ officeContactNumber: e.target.value })}
                placeholder="e.g., 0112XXXXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Card Delivery Location (moved from Address Details) */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-semibold text-gray-900 mb-4">Card Delivery Location</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deliver Card To <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.cardDeliveryLocation}
                onChange={(e) => updateFormData({ cardDeliveryLocation: e.target.value })}
                aria-label="Card delivery location"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              >
                <option value="">Select Delivery Location</option>
                <option value="Home Address">Permanent Address</option>
                <option value="Correspondence Address">Correspondence Address</option>
                <option value="Office Address">Office Address</option>
                <option value="Branch">Branch</option>
              </select>
            </div>

            {formData.cardDeliveryLocation === 'Branch' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Branch <span className="text-red-500">*</span>
                </label>
                <SearchableBranchSelect
                  value={formData.cardDeliveryBranch}
                  onChange={(branch) => updateFormData({ cardDeliveryBranch: branch })}
                  placeholder="Search and select branch"
                />
              </div>
            )}
          </div>
        </div>

        {/* PEP/EDD Section */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-8">
          <h3 className="font-semibold text-gray-900 mb-3">Political Exposure (PEP / EDD)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Are you involved in politics, holding a position in a political party, or related to a member of the Cabinet, Parliament, local government authority, military officers, judicial officers, or holding an executive position in a government institution? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="isPEP"
                    value="Yes"
                    checked={formData.isPEP === 'Yes'}
                    onChange={(e) => updateFormData({ isPEP: e.target.value, isPEPRelated: '' })}
                    className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="isPEP"
                    value="No"
                    checked={formData.isPEP === 'No'}
                    onChange={(e) => updateFormData({ isPEP: e.target.value })}
                    className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
            </div>

            {formData.isPEP === 'No' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Related in any way to any of the persons referred to above? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="isPEPRelated"
                      value="Yes"
                      checked={formData.isPEPRelated === 'Yes'}
                      onChange={(e) => updateFormData({ isPEPRelated: e.target.value })}
                      className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="isPEPRelated"
                      value="No"
                      checked={formData.isPEPRelated === 'No'}
                      onChange={(e) => updateFormData({ isPEPRelated: e.target.value })}
                      className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
              </div>
            )}

            {(formData.isPEP === 'Yes' || formData.isPEPRelated === 'Yes') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nature of Relationship <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.pepNatureOfRelationship}
                    onChange={(e) => updateFormData({ pepNatureOfRelationship: e.target.value })}
                    placeholder="Describe the nature of relationship"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PEP / EDD Application <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setShowPepEddApplication(true)}
                      className="px-4 py-2 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] transition-colors"
                    >
                      Open PEP / EDD Application
                    </button>
                    <p className="text-xs text-gray-500">
                      Customer signature and authorized employee signature are captured in this application form.
                    </p>
                    {formData.pepApplicantSignature && formData.pepAuthorizedSignature ? (
                      <p className="text-xs text-green-600">✓ PEP / EDD application completed with both signatures</p>
                    ) : (
                      <p className="text-xs text-amber-600">PEP / EDD application is pending signatures</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {showPepEddApplication && (
          <div className="fixed inset-0 bg-black/60 z-50 p-4 overflow-y-auto">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h4 className="text-xl font-bold text-gray-900">PEP / EDD Application</h4>
                <button
                  type="button"
                  onClick={handleClosePepEddApplication}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  aria-label="Close PEP/EDD application"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <h5 className="text-lg font-semibold text-gray-900">01. Details of the PEP</h5>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Application Type <span className="text-red-500">*</span></label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="pepApplicationType"
                          value="New Card"
                          checked={formData.pepApplicationType === 'New Card'}
                          onChange={(e) => updateFormData({ pepApplicationType: e.target.value as FormData['pepApplicationType'] })}
                          className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                        />
                        <span className="ml-2 text-gray-700">New Card</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="pepApplicationType"
                          value="Limit Enhancement"
                          checked={formData.pepApplicationType === 'Limit Enhancement'}
                          onChange={(e) => updateFormData({ pepApplicationType: e.target.value as FormData['pepApplicationType'] })}
                          className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                        />
                        <span className="ml-2 text-gray-700">Limit Enhancement</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pep-card-number" className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      id="pep-card-number"
                      type="text"
                      value={formData.pepCardNumber}
                      onChange={(e) => updateFormData({ pepCardNumber: e.target.value })}
                      placeholder="Enter card number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pep-name" className="block text-sm font-medium text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
                      <input
                        id="pep-name"
                        type="text"
                        value={formData.pepFullName}
                        onChange={(e) => updateFormData({ pepFullName: e.target.value })}
                        placeholder="Enter full name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="pep-nic" className="block text-sm font-medium text-gray-700 mb-2">NIC <span className="text-red-500">*</span></label>
                      <input
                        id="pep-nic"
                        type="text"
                        value={formData.pepNIC}
                        onChange={(e) => updateFormData({ pepNIC: e.target.value })}
                        placeholder="Enter NIC"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pep-address" className="block text-sm font-medium text-gray-700 mb-2">Address <span className="text-red-500">*</span></label>
                    <textarea
                      id="pep-address"
                      value={formData.pepAddress}
                      onChange={(e) => updateFormData({ pepAddress: e.target.value })}
                      rows={2}
                      placeholder="Enter address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pep-position-held" className="block text-sm font-medium text-gray-700 mb-2">Position Held <span className="text-red-500">*</span></label>
                      <input
                        id="pep-position-held"
                        type="text"
                        value={formData.pepPositionHeld}
                        onChange={(e) => updateFormData({ pepPositionHeld: e.target.value })}
                        placeholder="Enter position held"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="pep-entity-name" className="block text-sm font-medium text-gray-700 mb-2">Name of the Entity <span className="text-red-500">*</span></label>
                      <input
                        id="pep-entity-name"
                        type="text"
                        value={formData.pepEntityName}
                        onChange={(e) => updateFormData({ pepEntityName: e.target.value })}
                        placeholder="Enter entity name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pep-years-position" className="block text-sm font-medium text-gray-700 mb-2">No. of Years in Above Position</label>
                    <input
                      id="pep-years-position"
                      type="text"
                      value={formData.pepYearsInPosition}
                      onChange={(e) => updateFormData({ pepYearsInPosition: e.target.value })}
                      placeholder="Ex: 3 years"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="pep-source-of-wealth" className="block text-sm font-medium text-gray-700 mb-2">Source of Wealth <span className="text-red-500">*</span></label>
                    <select
                      id="pep-source-of-wealth"
                      value={formData.pepSourceOfWealth}
                      onChange={(e) => updateFormData({ pepSourceOfWealth: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    >
                      <option value="">Select source of wealth</option>
                      {pepSourceOfWealthOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {formData.pepSourceOfWealth === 'Other' && (
                    <div>
                      <label htmlFor="pep-source-of-wealth-other" className="block text-sm font-medium text-gray-700 mb-2">Other Source of Wealth</label>
                      <input
                        id="pep-source-of-wealth-other"
                        type="text"
                        value={formData.pepSourceOfWealthOther}
                        onChange={(e) => updateFormData({ pepSourceOfWealthOther: e.target.value })}
                        placeholder="Specify source of wealth"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="pep-estimated-wealth" className="block text-sm font-medium text-gray-700 mb-2">Estimated Wealth <span className="text-red-500">*</span></label>
                    <select
                      id="pep-estimated-wealth"
                      value={formData.pepEstimatedWealth}
                      onChange={(e) => updateFormData({ pepEstimatedWealth: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    >
                      <option value="">Select estimated wealth</option>
                      {pepEstimatedWealthOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {formData.pepEstimatedWealth === 'Other' && (
                    <div>
                      <label htmlFor="pep-estimated-wealth-other" className="block text-sm font-medium text-gray-700 mb-2">Other Estimated Wealth</label>
                      <input
                        id="pep-estimated-wealth-other"
                        type="text"
                        value={formData.pepEstimatedWealthOther}
                        onChange={(e) => updateFormData({ pepEstimatedWealthOther: e.target.value })}
                        placeholder="Specify estimated wealth"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3">Customer Signature</h5>
                    <SignaturePad
                      signature={formData.pepApplicantSignature}
                      onSignatureChange={(signature) => updateFormData({ pepApplicantSignature: signature })}
                    />
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <h5 className="font-semibold text-gray-900">Authorized Employee Signature (API)</h5>
                    <div>
                      <label htmlFor="pep-authorized-employee-number" className="block text-sm font-medium text-gray-700 mb-2">
                        Authorized Employee Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="pep-authorized-employee-number"
                        type="text"
                        value={formData.pepAuthorizedEmployeeNumber}
                        onChange={(e) => updateFormData({ pepAuthorizedEmployeeNumber: e.target.value })}
                        placeholder="Enter authorized employee number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleCaptureAuthorizedSignature}
                      disabled={isCapturingAuthorizedSignature}
                      className="px-4 py-2 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                    >
                      {isCapturingAuthorizedSignature ? 'Capturing...' : 'Capture Authorized Signature via API'}
                    </button>

                    {pepSignatureError && (
                      <p className="text-sm text-red-600">{pepSignatureError}</p>
                    )}

                    {formData.pepAuthorizedSignature && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Captured Authorized Signature</p>
                        <img
                          src={formData.pepAuthorizedSignature}
                          alt="Authorized employee signature"
                          className="w-full border border-gray-300 rounded-lg bg-white"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <h5 className="text-lg font-semibold text-gray-900">For Bank Use Only</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pep-bank-category" className="block text-sm font-medium text-gray-700 mb-2">PEP Category</label>
                      <input
                        id="pep-bank-category"
                        type="text"
                        value={formData.pepBankUseCategory}
                        onChange={(e) => updateFormData({ pepBankUseCategory: e.target.value })}
                        placeholder="Enter PEP category"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="pep-bank-staff-name" className="block text-sm font-medium text-gray-700 mb-2">Name of Staff</label>
                      <input
                        id="pep-bank-staff-name"
                        type="text"
                        value={formData.pepBankUseStaffName}
                        onChange={(e) => updateFormData({ pepBankUseStaffName: e.target.value })}
                        placeholder="Enter staff name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="pep-bank-staff-number" className="block text-sm font-medium text-gray-700 mb-2">Staff Number</label>
                      <input
                        id="pep-bank-staff-number"
                        type="text"
                        value={formData.pepBankUseStaffNumber}
                        onChange={(e) => updateFormData({ pepBankUseStaffNumber: e.target.value })}
                        placeholder="Enter staff number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="pep-bank-designation" className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                      <input
                        id="pep-bank-designation"
                        type="text"
                        value={formData.pepBankUseDesignation}
                        onChange={(e) => updateFormData({ pepBankUseDesignation: e.target.value })}
                        placeholder="Enter designation"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pep-bank-recommendation" className="block text-sm font-medium text-gray-700 mb-2">Recommendation / Special Comments</label>
                    <textarea
                      id="pep-bank-recommendation"
                      value={formData.pepBankUseRecommendation}
                      onChange={(e) => updateFormData({ pepBankUseRecommendation: e.target.value })}
                      rows={2}
                      placeholder="Enter recommendation/comments"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="pep-bank-branch-decision" className="block text-sm font-medium text-gray-700 mb-2">Branch/DSU/RCD Decision</label>
                      <textarea
                        id="pep-bank-branch-decision"
                        value={formData.pepBankUseBranchDecision}
                        onChange={(e) => updateFormData({ pepBankUseBranchDecision: e.target.value })}
                        rows={2}
                        placeholder="Approved / Declined"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="pep-bank-smg-decision" className="block text-sm font-medium text-gray-700 mb-2">SMG RCD Cards Decision</label>
                      <textarea
                        id="pep-bank-smg-decision"
                        value={formData.pepBankUseSmgDecision}
                        onChange={(e) => updateFormData({ pepBankUseSmgDecision: e.target.value })}
                        rows={2}
                        placeholder="Ratified / Declined"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="pep-bank-dgm-decision" className="block text-sm font-medium text-gray-700 mb-2">DGM Decision</label>
                      <textarea
                        id="pep-bank-dgm-decision"
                        value={formData.pepBankUseDgmDecision}
                        onChange={(e) => updateFormData({ pepBankUseDgmDecision: e.target.value })}
                        rows={2}
                        placeholder="Ratified / Declined"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4">
                  <button
                    type="button"
                    onClick={handleClosePepEddApplication}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Save & Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}