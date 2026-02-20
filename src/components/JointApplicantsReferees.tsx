import React from 'react';
import { Users, UserPlus, FileText } from 'lucide-react';
import { FormData } from '../App';
import SignaturePad from './SignaturePad';

interface Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function JointApplicantsReferees({ formData, updateFormData }: Props) {
  const showSupplementaryFields = formData.requireSupplementaryCard === 'Yes';

  // Calculate age from date of birth
  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const suppAge = calculateAge(formData.suppDateOfBirth);

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <UserPlus className="text-[#C8102E]" size={28} />
        <h2 className="text-2xl font-bold text-gray-900">Supplementary Card & Referees</h2>
      </div>
      <p className="text-gray-600 mb-6">Supplementary cardholder and reference details</p>

      <div className="space-y-8">
        {/* Supplementary Card Request */}
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <UserPlus size={20} />
            Supplementary Card Request
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Do you require a Supplementary Card? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="requireSupplementaryCard"
                  value="Yes"
                  checked={formData.requireSupplementaryCard === 'Yes'}
                  onChange={(e) => updateFormData({ requireSupplementaryCard: e.target.value })}
                  className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="requireSupplementaryCard"
                  value="No"
                  checked={formData.requireSupplementaryCard === 'No'}
                  onChange={(e) => updateFormData({ requireSupplementaryCard: e.target.value })}
                  className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
          </div>

          {showSupplementaryFields && (
            <div className="space-y-4 mt-6 pt-6 border-t border-purple-200">
              <p className="text-sm text-purple-800 mb-4">
                <strong>Note:</strong> Supplementary cardholder must be 18 years or above
              </p>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.suppTitle}
                  onChange={(e) => updateFormData({ suppTitle: e.target.value })}
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
                  value={formData.suppFullName}
                  onChange={(e) => updateFormData({ suppFullName: e.target.value })}
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
                  value={formData.suppMothersMaidenName}
                  onChange={(e) => updateFormData({ suppMothersMaidenName: e.target.value })}
                  placeholder="Mother's maiden name"
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
                  value={formData.suppNameOnCard}
                  onChange={(e) => {
                    if (e.target.value.length <= 20) {
                      updateFormData({ suppNameOnCard: e.target.value });
                    }
                  }}
                  maxLength={20}
                  placeholder="Maximum 20 characters including spaces"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.suppNameOnCard.length}/20 characters</p>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.suppDateOfBirth}
                  onChange={(e) => updateFormData({ suppDateOfBirth: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
                {formData.suppDateOfBirth && (
                  <p className={`text-xs mt-1 ${suppAge >= 18 ? 'text-green-600' : 'text-red-600'}`}>
                    Age: {suppAge} years {suppAge >= 18 ? '✓' : '(Must be 18 or above)'}
                  </p>
                )}
              </div>

              {/* Identity Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Identity Type <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="suppIdentityType"
                      value="NIC"
                      checked={formData.suppIdentityType === 'NIC'}
                      onChange={(e) => updateFormData({ suppIdentityType: e.target.value })}
                      className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                    />
                    <span className="ml-2 text-gray-700">NIC</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="suppIdentityType"
                      value="Passport"
                      checked={formData.suppIdentityType === 'Passport'}
                      onChange={(e) => updateFormData({ suppIdentityType: e.target.value })}
                      className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                    />
                    <span className="ml-2 text-gray-700">Passport</span>
                  </label>
                </div>
              </div>

              {/* Conditional Identity Fields */}
              {formData.suppIdentityType === 'NIC' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIC Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.suppNICNumber}
                    onChange={(e) => updateFormData({ suppNICNumber: e.target.value })}
                    placeholder="NIC Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  />
                </div>
              )}

              {formData.suppIdentityType === 'Passport' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passport Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.suppPassportNumber}
                      onChange={(e) => updateFormData({ suppPassportNumber: e.target.value })}
                      placeholder="Passport Number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passport Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.suppPassportExpiry}
                      onChange={(e) => updateFormData({ suppPassportExpiry: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visa Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.suppVisaNumber}
                      onChange={(e) => updateFormData({ suppVisaNumber: e.target.value })}
                      placeholder="Visa Number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visa Type <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.suppVisaType}
                      onChange={(e) => updateFormData({ suppVisaType: e.target.value })}
                      placeholder="Visa Type"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visa Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.suppVisaExpiry}
                      onChange={(e) => updateFormData({ suppVisaExpiry: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                    />
                  </div>
                </>
              )}

              {/* Relationship */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship to Primary Applicant <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.suppRelationship}
                  onChange={(e) => updateFormData({ suppRelationship: e.target.value })}
                  placeholder="e.g., Spouse, Child, Parent"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>

              {/* Home Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.suppHomeAddress}
                  onChange={(e) => updateFormData({ suppHomeAddress: e.target.value })}
                  placeholder="Complete home address"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>

              {/* Telephone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telephone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.suppTelephone}
                  onChange={(e) => updateFormData({ suppTelephone: e.target.value })}
                  placeholder="Contact number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>

              {/* Requested Credit Limit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requested Credit Limit (LKR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.suppRequestedCreditLimit}
                  onChange={(e) => updateFormData({ suppRequestedCreditLimit: Number(e.target.value) })}
                  min="0"
                  max={formData.requestedCreditLimit}
                  placeholder="Must not exceed primary cardholder limit"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum: LKR {formData.requestedCreditLimit.toLocaleString()} (Primary limit)
                </p>
              </div>

              {/* Supplementary Signature */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplementary Cardholder Signature <span className="text-red-500">*</span>
                </label>
                <SignaturePad
                  signature={formData.suppSignature}
                  onSignatureChange={(sig) => updateFormData({ suppSignature: sig })}
                />
              </div>
            </div>
          )}
        </div>

        {/* Referees Section */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users size={20} />
            Relatives Information
          </h3>
          
          {/* Relative 1 */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-3">A relative not living with you 1</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.referee1Name}
                  onChange={(e) => updateFormData({ referee1Name: e.target.value })}
                  placeholder="Relative name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NIC Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.referee1NIC}
                  onChange={(e) => updateFormData({ referee1NIC: e.target.value })}
                  placeholder="NIC number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.referee1Mobile}
                  onChange={(e) => updateFormData({ referee1Mobile: e.target.value })}
                  placeholder="Mobile number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.referee1Relationship}
                  onChange={(e) => updateFormData({ referee1Relationship: e.target.value })}
                  placeholder="e.g., Brother, Sister, Cousin"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Relative 2 */}
          <div className="pt-4 border-t border-blue-200">
            <h4 className="font-medium text-gray-800 mb-3">A relative not living with you 2</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.referee2Name}
                  onChange={(e) => updateFormData({ referee2Name: e.target.value })}
                  placeholder="Relative name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NIC Number
                </label>
                <input
                  type="text"
                  value={formData.referee2NIC}
                  onChange={(e) => updateFormData({ referee2NIC: e.target.value })}
                  placeholder="NIC number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.referee2Mobile}
                  onChange={(e) => updateFormData({ referee2Mobile: e.target.value })}
                  placeholder="Mobile number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship
                </label>
                <input
                  type="text"
                  value={formData.referee2Relationship}
                  onChange={(e) => updateFormData({ referee2Relationship: e.target.value })}
                  placeholder="e.g., Brother, Sister, Cousin"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}