import React from 'react';
import { CreditCard } from 'lucide-react';
import { FormData } from '../App';

interface Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function ProductSelection({ formData, updateFormData }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Card Selection & Credit Limit</h2>
      <p className="text-gray-600 mb-6">Select your preferred credit card and requested credit limit</p>

      {/* Card Type Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Type <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.cardType}
          onChange={(e) => updateFormData({ cardType: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
        >
          <option value="">Select Card Type</option>
          <option value="Visa Signature">Visa Signature</option>
          <option value="World MasterCard">World MasterCard</option>
        </select>
      </div>

      {/* Credit Limit */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Requested Credit Limit (LKR) <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          <input
            type="number"
            value={formData.requestedCreditLimit}
            onChange={(e) => updateFormData({ requestedCreditLimit: Number(e.target.value) })}
            min="50000"
            step="10000"
            placeholder="Enter amount in LKR"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
          <p className="text-xs text-gray-500">Minimum credit limit: LKR 50,000</p>
        </div>
      </div>

      {/* Card Preview */}
      {formData.cardType && (
        <div className="mt-8 p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-lg ${
              formData.cardType === 'Visa Signature' 
                ? 'bg-gradient-to-br from-purple-500 to-purple-700' 
                : 'bg-gradient-to-br from-red-500 to-red-700'
            }`}>
              <CreditCard className="text-white" size={40} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{formData.cardType}</h3>
              <p className="text-gray-600 text-sm mt-1">
                Requested Limit: LKR {formData.requestedCreditLimit.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
