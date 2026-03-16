import { useState } from 'react';
import { FormData } from '../App';

interface Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function ProductSelection({ formData, updateFormData }: Props) {
  const CREDIT_LIMIT_OPTIONS = [
    { value: 'below-200000', label: 'Below 200,000', amount: 150000 },
    { value: '200000-500000', label: '200,000 - 500,000', amount: 350000 },
    { value: '500000-1000000', label: '500,000 - 1,000,000', amount: 750000 },
    { value: 'above-1000000', label: 'Above 1,000,000', amount: 1100000 },
    { value: 'other-amount', label: 'Other amount', amount: 0 },
  ] as const;

  const getInitialCreditLimitOption = (amount: number) => {
    if (amount < 200000) return 'below-200000';
    if (amount >= 200000 && amount <= 500000) return '200000-500000';
    if (amount > 500000 && amount <= 1000000) return '500000-1000000';
    if (amount > 1000000) return 'above-1000000';
    return 'other-amount';
  };

  const [selectedCreditLimitOption, setSelectedCreditLimitOption] = useState<string>(
    getInitialCreditLimitOption(formData.requestedCreditLimit),
  );

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Parse formatted number
  const parseFormattedNumber = (value: string) => {
    return Number(value.replace(/,/g, ''));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Card Selection & Credit Limit</h2>
      <p className="text-gray-600 mb-6">Select your preferred credit card and requested credit limit</p>

      {/* Card Type Dropdown */}
      <div className="mb-6">
        <label htmlFor="card-type" className="block text-sm font-medium text-gray-700 mb-2">
          Card Type <span className="text-red-500">*</span>
        </label>
        <select
          id="card-type"
          value={formData.cardType}
          onChange={(e) => updateFormData({ cardType: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
        >
          <option value="">Select Card Type</option>
          <option value="Visa Card">Visa Card</option>
          <option value="Master Card">Master Card</option>
        </select>
      </div>

      {/* Credit Limit */}
      <div className="mb-6">
        <label htmlFor="requested-credit-limit" className="block text-sm font-medium text-gray-700 mb-2">
          Requested Credit Limit (LKR) <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          <select
            id="requested-credit-limit"
            value={selectedCreditLimitOption}
            onChange={(e) => {
              const selectedOption = e.target.value;
              setSelectedCreditLimitOption(selectedOption);

              if (selectedOption !== 'other-amount') {
                const optionConfig = CREDIT_LIMIT_OPTIONS.find((option) => option.value === selectedOption);
                if (optionConfig) {
                  updateFormData({ requestedCreditLimit: optionConfig.amount });
                }
              } else {
                updateFormData({ requestedCreditLimit: 0 });
              }
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          >
            {CREDIT_LIMIT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {selectedCreditLimitOption === 'other-amount' && (
            <input
              type="text"
              value={formData.requestedCreditLimit > 0 ? formatNumber(formData.requestedCreditLimit) : ''}
              onChange={(e) => {
                const numValue = parseFormattedNumber(e.target.value);
                if (!isNaN(numValue)) {
                  updateFormData({ requestedCreditLimit: numValue });
                }
              }}
              placeholder="Enter preferred amount in LKR"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
            />
          )}

          <p className="text-xs text-gray-500">Minimum credit limit: LKR 75,000</p>
        </div>
      </div>
    </div>
  );
}
