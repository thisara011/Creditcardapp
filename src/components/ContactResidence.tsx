import React, { useEffect } from 'react';
import { Home, MapPin } from 'lucide-react';
import { FormData } from '../App';

interface Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const sriLankanDistricts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 
  'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 
  'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 
  'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

export default function ContactResidence({ formData, updateFormData }: Props) {
  const isCorrespondenceDifferent = formData.correspondenceAddressDifferent;

  // If correspondence address is NOT different, keep it synced with permanent address
  useEffect(() => {
    if (isCorrespondenceDifferent) return;

    const next: Partial<FormData> = {};

    if (formData.correspondenceAddressLine !== formData.homeAddressLine) {
      next.correspondenceAddressLine = formData.homeAddressLine;
    }
    if (formData.correspondenceDistrict !== formData.homeDistrict) {
      next.correspondenceDistrict = formData.homeDistrict;
    }

    if (Object.keys(next).length > 0) updateFormData(next);
  }, [
    isCorrespondenceDifferent,
    formData.homeAddressLine,
    formData.homeDistrict,
    formData.correspondenceAddressLine,
    formData.correspondenceDistrict,
    updateFormData,
  ]);

  return (
    <div className="border-t pt-8">
      <div className="flex items-center gap-3 mb-2">
        <Home className="text-[#C8102E]" size={28} />
        <h2 className="text-2xl font-bold text-gray-900">Address Details</h2>
      </div>
      <p className="text-gray-600 mb-6">Please provide all required addresses</p>

      <div className="space-y-6">
        {/* Permanent Address */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-[#C8102E]" />
            Permanent Address
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.homeAddressLine}
                onChange={(e) => updateFormData({ homeAddressLine: e.target.value })}
                placeholder="Enter complete permanent address"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.homeDistrict}
                onChange={(e) => updateFormData({ homeDistrict: e.target.value })}
                aria-label="Permanent address district"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              >
                <option value="">Select District</option>
                {sriLankanDistricts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Correspondence Address */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-[#C8102E]" />
            Correspondence Address
          </h3>
          <div className="space-y-4">
            {/* Is correspondence address different? */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Is Correspondence Address different from Permanent Address? <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="correspondenceAddressDifferent"
                    checked={isCorrespondenceDifferent === true}
                    onChange={() => updateFormData({ correspondenceAddressDifferent: true })}
                  />
                  Yes
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="correspondenceAddressDifferent"
                    checked={isCorrespondenceDifferent === false}
                    onChange={() => updateFormData({ correspondenceAddressDifferent: false })}
                  />
                  No (Same as Permanent Address)
                </label>
              </div>
              {!isCorrespondenceDifferent && (
                <p className="text-xs text-gray-500 mt-2">
                  Correspondence Address will be automatically filled from Permanent Address.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line (Provide the billing proof document) <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.correspondenceAddressLine}
                onChange={(e) => updateFormData({ correspondenceAddressLine: e.target.value })}
                placeholder="Enter correspondence address"
                rows={3}
                disabled={!isCorrespondenceDifferent}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent ${
                  !isCorrespondenceDifferent ? 'bg-gray-100 cursor-not-allowed text-gray-600' : ''
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.correspondenceDistrict}
                onChange={(e) => updateFormData({ correspondenceDistrict: e.target.value })}
                disabled={!isCorrespondenceDifferent}
                aria-label="Correspondence address district"
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent ${
                  !isCorrespondenceDifferent ? 'bg-gray-100 cursor-not-allowed text-gray-600' : ''
                }`}
              >
                <option value="">Select District</option>
                {sriLankanDistricts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}