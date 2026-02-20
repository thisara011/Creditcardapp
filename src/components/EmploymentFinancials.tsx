import React from 'react';
import { Briefcase, DollarSign, AlertCircle, Upload } from 'lucide-react';
import { FormData } from '../App';

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

export default function EmploymentFinancials({ formData, updateFormData }: Props) {
  const showPreviousEmployment = formData.lengthOfEmployment < 1;

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

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Designation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.designation}
            onChange={(e) => updateFormData({ designation: e.target.value })}
            placeholder="Your job title/designation"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
        </div>

        {/* Length of Current Employment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Length of Current Employment (Years) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.lengthOfEmployment}
            onChange={(e) => updateFormData({ lengthOfEmployment: Number(e.target.value) })}
            min="0"
            step="0.1"
            placeholder="e.g., 2.5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Enter decimal values for months (e.g., 0.5 for 6 months)</p>
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
                  Previous Employer Name <span className="text-red-500">*</span>
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
                  Previous Employer Address <span className="text-red-500">*</span>
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
                  Length of Service (Years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.prevLengthOfService}
                  onChange={(e) => updateFormData({ prevLengthOfService: Number(e.target.value) })}
                  min="0"
                  step="0.1"
                  placeholder="e.g., 1.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.prevDesignation}
                  onChange={(e) => updateFormData({ prevDesignation: e.target.value })}
                  placeholder="Previous job title/designation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
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
                    onChange={(e) => updateFormData({ isPEP: e.target.value })}
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

            {formData.isPEP === 'Yes' && (
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