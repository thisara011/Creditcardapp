import React from 'react';
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
  return (
    <div className="border-t pt-8">
      <div className="flex items-center gap-3 mb-2">
        <Home className="text-[#C8102E]" size={28} />
        <h2 className="text-2xl font-bold text-gray-900">Address Details</h2>
      </div>
      <p className="text-gray-600 mb-6">Please provide all required addresses</p>

      <div className="space-y-6">
        {/* Home Address */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-[#C8102E]" />
            Home Address
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.homeAddressLine}
                onChange={(e) => updateFormData({ homeAddressLine: e.target.value })}
                placeholder="Enter complete home address"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.correspondenceAddressLine}
                onChange={(e) => updateFormData({ correspondenceAddressLine: e.target.value })}
                placeholder="Enter correspondence address"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.correspondenceDistrict}
                onChange={(e) => updateFormData({ correspondenceDistrict: e.target.value })}
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

        {/* Work Address */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-[#C8102E]" />
            Work Address
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Line <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.workAddressLine}
              onChange={(e) => updateFormData({ workAddressLine: e.target.value })}
              placeholder="Enter work/office address"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
            />
          </div>
        </div>

        {/* Card Delivery Location */}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              >
                <option value="">Select Delivery Location</option>
                <option value="Home Address">Home Address</option>
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
                <input
                  type="text"
                  value={formData.cardDeliveryBranch}
                  onChange={(e) => updateFormData({ cardDeliveryBranch: e.target.value })}
                  placeholder="Enter branch name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}