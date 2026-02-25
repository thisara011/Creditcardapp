import { AlertCircle, Briefcase, DollarSign, MapPin, Upload } from 'lucide-react';
import { FormData } from '../App';
import SearchableBranchSelect from './SearchableBranchSelect';

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
  'CHEF / COOK', 'MERCHANDISER', 'MEDIA / JOURNALIST'
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

const residenceTypes = [
  'Own (Not Mortgaged)',
  'Own (Mortgaged)',
  'Parents / Spouse\'s House',
  'Leased/ Rented'
];

export default function EmploymentFinancials({ formData, updateFormData }: Props) {
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employment Sector <span className="text-red-500">*</span>
          </label>
          <select
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nature of Business <span className="text-red-500">*</span>
          </label>
          <select
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specify Other Nature of Business <span className="text-red-500">*</span>
            </label>
            <input
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Field of Employment <span className="text-red-500">*</span>
          </label>
          <select
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Education Level <span className="text-red-500">*</span>
          </label>
          <select
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position <span className="text-red-500">*</span>
          </label>
          <select
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
              <label className="block text-xs font-medium text-gray-600 mb-1">Years</label>
              <input
                type="number"
                min={0}
                value={currentYears}
                onChange={(e) => handleCurrentLengthChange(Number(e.target.value || 0), currentMonths)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Months</label>
              <input
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
                    <label className="block text-xs font-medium text-gray-600 mb-1">Years</label>
                    <input
                      type="number"
                      min={0}
                      value={prevYears}
                      onChange={(e) => handlePrevLengthChange(Number(e.target.value || 0), prevMonths)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Months</label>
                    <input
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Position
                </label>
                <select
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Residence (billing proof required) <span className="text-red-500">*</span>
          </label>
          <select
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Dependents <span className="text-red-500">*</span>
          </label>
          <input
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
                Are you involved in politics, holding a position in a political party, or related to a member of the Cabinet, Parliament, local government authority, or holding an executive position in a government institution? <span className="text-red-500">*</span>
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
                    Upload PEP / EDD Form <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          updateFormData({ pepFormUpload: e.target.files[0].name });
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    />
                    <Upload className="text-[#C8102E]" size={20} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}