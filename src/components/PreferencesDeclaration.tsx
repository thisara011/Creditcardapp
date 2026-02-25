import { CheckCircle2, DollarSign, FileText, Settings, UserCheck } from 'lucide-react';
import { FormData } from '../App';
import SignaturePad from './SignaturePad';

interface Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function PreferencesDeclaration({ formData, updateFormData }: Props) {
  const showSettlementFields = formData.autoSettlement === 'Yes';
  const showVASFields = formData.valueAddedServices === 'Not Need';
  const showPAFields = formData.requirePA === 'Yes';

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <FileText className="text-[#C8102E]" size={28} />
        <h2 className="text-2xl font-bold text-gray-900">Preferences & Declarations</h2>
      </div>
      <p className="text-gray-600 mb-6">Complete your application with preferences and declarations</p>

      <div className="space-y-8">
        {/* Auto-Settlement Preferences */}
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign size={20} />
            Auto-Settlement Preferences
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Automatic Settlement from Seylan Bank Account? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="autoSettlement"
                    value="Yes"
                    checked={formData.autoSettlement === 'Yes'}
                    onChange={(e) => updateFormData({ autoSettlement: e.target.value })}
                    className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="autoSettlement"
                    value="No"
                    checked={formData.autoSettlement === 'No'}
                    onChange={(e) => updateFormData({ autoSettlement: e.target.value })}
                    className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
            </div>

            {showSettlementFields && (
              <div className="space-y-4 mt-4 pt-4 border-t border-green-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.settlementAccountNumber}
                    onChange={(e) => updateFormData({ settlementAccountNumber: e.target.value })}
                    placeholder="Enter Seylan Bank account number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.settlementBranch}
                    onChange={(e) => updateFormData({ settlementBranch: e.target.value })}
                    placeholder="Enter branch name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Option <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.settlementPaymentOption}
                    onChange={(e) => updateFormData({ settlementPaymentOption: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  >
                    <option value="">Select Payment Option</option>
                    <option value="Minimum Payment">Minimum Payment</option>
                    <option value="100% Outstanding">100% Outstanding per Month</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Value-Added Services */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Settings size={20} />
            Value-Added Services (VAS)
          </h3>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700 mb-2">
                <strong>By default, the Bank provides:</strong>
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>SMS alerts</li>
                <li>Transaction alerts</li>
                <li>Monthly payment reminders</li>
                <li>PDF e-Statements</li>
                <li>Mobile & internet banking services</li>
              </ul>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Value Added Services <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="valueAddedServices"
                    value="Need"
                    checked={formData.valueAddedServices === 'Need'}
                    onChange={(e) => updateFormData({ valueAddedServices: e.target.value })}
                    className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                  />
                  <span className="ml-2 text-gray-700">Need</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="valueAddedServices"
                    value="Not Need"
                    checked={formData.valueAddedServices === 'Not Need'}
                    onChange={(e) => updateFormData({ valueAddedServices: e.target.value })}
                    className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                  />
                  <span className="ml-2 text-gray-700">Not Need</span>
                </label>
              </div>
            </div>

            {showVASFields && (
              <div className="space-y-4 mt-4 pt-4 border-t border-blue-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Written Request <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        updateFormData({ vasWrittenRequestUpload: e.target.files[0].name });
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paper Statement Address (If PDF e-Statement not required)
                  </label>
                  <select
                    value={formData.paperStatementAddress}
                    onChange={(e) => updateFormData({ paperStatementAddress: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  >
                    <option value="">Select Address</option>
                    <option value="Home Address">Home Address</option>
                    <option value="Correspondence Address">Correspondence Address</option>
                    <option value="Work Address">Work Address</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Personal Assistant Authorization */}
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <UserCheck size={20} />
            Personal Assistant / Secretary Authorization
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Do you wish to authorize a Personal Assistant? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="requirePA"
                    value="Yes"
                    checked={formData.requirePA === 'Yes'}
                    onChange={(e) => updateFormData({ requirePA: e.target.value })}
                    className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="requirePA"
                    value="No"
                    checked={formData.requirePA === 'No'}
                    onChange={(e) => updateFormData({ requirePA: e.target.value })}
                    className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
            </div>

            {showPAFields && (
              <div className="space-y-4 mt-4 pt-4 border-t border-purple-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.paName}
                    onChange={(e) => updateFormData({ paName: e.target.value })}
                    placeholder="PA/Secretary name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIC <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.paNIC}
                    onChange={(e) => updateFormData({ paNIC: e.target.value })}
                    placeholder="NIC number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.paAddress}
                    onChange={(e) => updateFormData({ paAddress: e.target.value })}
                    placeholder="Complete address"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.paContactNumber}
                    onChange={(e) => updateFormData({ paContactNumber: e.target.value })}
                    placeholder="Contact number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.paEmail}
                    onChange={(e) => updateFormData({ paEmail: e.target.value })}
                    placeholder="Email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  />
                </div>

                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.paAuthorizationConsent}
                      onChange={(e) => updateFormData({ paAuthorizationConsent: e.target.checked })}
                      className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E] mt-1"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      <strong>Authorization Declaration:</strong>
                      <span className="block mt-2">
                        I/ We hereby authorise the above named Mr./ Mrs./ Dr. <span className="font-semibold">{formData.paName || '................................'}</span> to deal and/ or communicate with Seylan Bank PLC in respect of the aforementioned Credit Card and/ or any and all transactions related to the said Credit Card for and on my/ our behalf.
                      </span>
                      <span className="block mt-2">
                        I/ We further consent and authorise Seylan Bank PLC to deliver the aforesaid Credit Card and to provide any and all information in respect to the transaction carried out by me and to obtain information as and when required for the purpose of the transactions of the said Credit Card for and on my/ our behalf.
                      </span>
                      <span className="block mt-2">
                        I/ We accept and acknowledge when acting as aforesaid Seylan Bank PLC shall at all times comply the statutory provisions laid under Section 77 of the Banking (amendment) Act and I/ we hereby renounce any and all rights, powers and authorities which I/ we may acquire against Seylan Bank PLC, for acting upon my/ our instructions and on my/ our behalf and at all times hereafter to save, defend and keep indemnified the said Seylan Bank PLC against all claims, demands and action suites and other proceedings, losses, charges, costs and expenses whatsoever which may arise and undertake to reimburse and/ or pay on demand all charges, losses, damages and expenses which the said Seylan Bank PLC shall incur or to be put into in respect of any claims, demands or actions which may arise on acting as aforesaid.
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Signatures & Declaration */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} />
            Signatures & Legal Declaration
          </h3>

          <div className="space-y-6">
            {/* Declaration Text */}
            <div className="bg-white p-4 rounded-lg border border-red-200 max-h-64 overflow-y-auto">
              <h4 className="font-semibold text-gray-900 mb-3">Declaration & Terms</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <strong>Credit Card Terms & Conditions:</strong> I/We declare that the information provided in this application is true and accurate to the best of my/our knowledge. I/We understand and agree to be bound by the terms and conditions governing the use of Seylan Bank Credit Cards.
                </p>
                <p>
                  <strong>EFTC Declaration (Foreign Exchange Act No. 12 of 2017):</strong> I/We acknowledge that all international transactions made using this credit card will be subject to the provisions of the Foreign Exchange Act No. 12 of 2017 and regulations thereunder.
                </p>
                <p>
                  <strong>AML / KYC Compliance:</strong> I/We confirm that I/we have provided all necessary documents for Anti-Money Laundering (AML) and Know Your Customer (KYC) verification purposes and understand that the Bank reserves the right to request additional information.
                </p>
                <p>
                  <strong>Internet & SMS Banking Terms:</strong> I/We agree to the terms and conditions governing internet and SMS banking services provided by Seylan Bank and acknowledge that these services may be subject to additional charges.
                </p>
                <p>
                  <strong>Liability & Indemnity:</strong> I/We agree to indemnify and hold harmless Seylan Bank from any claims, losses, or damages arising from the use of the credit card. I/We understand that I/we am/are solely responsible for all transactions made using the card.
                </p>
                <p>
                  <strong>Data Protection & Privacy:</strong> I/We consent to Seylan Bank collecting, processing, and storing my/our personal data in accordance with applicable data protection laws and the Bank's privacy policy.
                </p>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.declarationConsent}
                  onChange={(e) => updateFormData({ declarationConsent: e.target.checked })}
                  className="w-5 h-5 text-[#C8102E] focus:ring-[#C8102E] mt-1"
                />
                <span className="ml-3 text-sm text-gray-700">
                  <strong className="text-[#C8102E]">I have read and understood</strong> all the terms, conditions, and declarations mentioned above and agree to be bound by them. <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {/* Primary Cardholder Signature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Cardholder Signature <span className="text-red-500">*</span>
              </label>
              <SignaturePad
                signature={formData.primarySignature}
                onSignatureChange={(sig) => updateFormData({ primarySignature: sig })}
              />
              <p className="text-xs text-gray-500 mt-2">
                This signature will be used for all required signature fields in the application
              </p>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.signatureDate}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">Format: DD/MM/YYYY</p>
            </div>

            {/* Submission Note */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-green-800">Ready to Submit</h4>
                  <p className="text-green-700 text-sm mt-1">
                    Please review all information carefully before submitting your application. An authorized bank officer will process your application and contact you if additional information is required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
