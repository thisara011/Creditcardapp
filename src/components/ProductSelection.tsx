import { FormData } from '../App';

interface Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function ProductSelection({ formData, updateFormData }: Props) {
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Type <span className="text-red-500">*</span>
        </label>
        <select
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Requested Credit Limit (LKR) <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          <input
            type="text"
            value={formatNumber(formData.requestedCreditLimit)}
            onChange={(e) => {
              const numValue = parseFormattedNumber(e.target.value);
              if (!isNaN(numValue)) {
                updateFormData({ requestedCreditLimit: numValue });
              }
            }}
            placeholder="Enter amount in LKR (e.g., 1,000,000)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
          <p className="text-xs text-gray-500">Minimum credit limit: LKR 50,000</p>
        </div>
      </div>
    </div>
  );
}
