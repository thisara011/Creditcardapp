import React from 'react';
import { User } from 'lucide-react';
import { FormData } from '../App';

interface Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function PersonalDetails({ formData, updateFormData }: Props) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <User className="text-[#C8102E]" size={28} />
        <h2 className="text-2xl font-bold text-gray-900">Personal Identification Details</h2>
      </div>
      <p className="text-gray-600 mb-6">Please provide your personal information accurately</p>

      <div className="space-y-5">
        {/* NIC Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            NIC Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.nicNumber}
            onChange={(e) => updateFormData({ nicNumber: e.target.value })}
            placeholder="XXXXXXXXXV or 123456789012"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          >
            <option value="">Select Title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
            <option value="Rev">Rev</option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            placeholder="As per NIC/Passport"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
        </div>

        {/* Mother's Maiden Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mother's Maiden Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.mothersMaidenName}
            onChange={(e) => updateFormData({ mothersMaidenName: e.target.value })}
            placeholder="Required for security/verification"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
        </div>

        {/* Name on Card */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name to Appear on Card <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.nameOnCard}
            onChange={(e) => {
              if (e.target.value.length <= 20) {
                updateFormData({ nameOnCard: e.target.value });
              }
            }}
            maxLength={20}
            placeholder="Maximum 20 characters including spaces"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">{formData.nameOnCard.length}/20 characters</p>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Must be 18 years or above</p>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => updateFormData({ mobileNumber: e.target.value })}
            placeholder="07XXXXXXXX"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
        </div>

        {/* Personal Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.emailAddress}
            onChange={(e) => updateFormData({ emailAddress: e.target.value })}
            placeholder="your.email@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}