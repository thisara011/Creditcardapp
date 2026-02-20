import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import { FormData } from '../App';
import SignaturePad from './SignaturePad';

interface Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function Declaration({ formData, updateFormData }: Props) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <FileText className="text-[#C8102E]" size={28} />
        <h2 className="text-2xl font-bold text-gray-900">Legal Declaration & Signatures</h2>
      </div>
      <p className="text-gray-600 mb-6">Please review and sign the declaration to complete your application</p>

      <div className="space-y-6">
        {/* Declaration Text */}
        <div className="bg-white p-6 rounded-lg border-2 border-red-200 max-h-96 overflow-y-auto">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={20} className="text-[#C8102E]" />
            Terms, Conditions & Declarations
          </h3>
          <div className="text-sm text-gray-700 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Credit Card Terms & Conditions</h4>
              <p>
                I/We declare that the information provided in this application is true and accurate to the best of my/our knowledge. I/We understand and agree to be bound by the terms and conditions governing the use of Seylan Bank Credit Cards as published on the bank's website and as may be amended from time to time.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">2. EFTC Declaration (Foreign Exchange Act No. 12 of 2017)</h4>
              <p>
                I/We acknowledge that all international transactions made using this credit card will be subject to the provisions of the Foreign Exchange Act No. 12 of 2017 and regulations thereunder. I/We undertake to comply with all applicable foreign exchange regulations and restrictions imposed by the Central Bank of Sri Lanka.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">3. AML / KYC Compliance</h4>
              <p>
                I/We confirm that I/we have provided all necessary documents for Anti-Money Laundering (AML) and Know Your Customer (KYC) verification purposes. I/We understand that the Bank reserves the right to request additional information and documentation at any time. I/We authorize the Bank to conduct necessary background checks and verification procedures.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4. Internet & SMS Banking Terms</h4>
              <p>
                I/We agree to the terms and conditions governing internet and SMS banking services provided by Seylan Bank. I/We acknowledge that these services may be subject to additional charges as per the bank's tariff structure. I/We understand that it is my/our responsibility to maintain the confidentiality of all login credentials and security information.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">5. Liability & Indemnity</h4>
              <p>
                I/We agree to indemnify and hold harmless Seylan Bank, its officers, employees, and agents from any claims, losses, damages, liabilities, or expenses arising from the use of the credit card. I/We understand that I/we am/are solely responsible for all transactions made using the card, including those made by any supplementary cardholder or authorized person. I/We agree to promptly notify the Bank of any loss, theft, or unauthorized use of the card.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">6. Data Protection & Privacy</h4>
              <p>
                I/We consent to Seylan Bank collecting, processing, storing, and using my/our personal data in accordance with applicable data protection laws and the Bank's privacy policy. I/We understand that this information may be shared with credit bureaus, regulatory authorities, and other entities as required by law or for the purpose of processing this credit card application. I/We have the right to access, correct, or request deletion of my/our personal data as per applicable regulations.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">7. Credit Assessment & Approval</h4>
              <p>
                I/We understand that this application does not guarantee approval. The Bank reserves the right to accept or reject this application at its sole discretion. The credit limit granted, if approved, will be determined by the Bank based on its credit assessment policies. The Bank may also request additional documents or information before processing this application.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">8. Fees & Charges</h4>
              <p>
                I/We acknowledge that I/we have been informed of the annual fees, interest rates, late payment charges, and other applicable fees associated with this credit card. I/We agree to pay all such fees and charges as per the bank's tariff structure and terms and conditions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">9. Authorized Officer Verification</h4>
              <p>
                I/We understand that this application will be reviewed and verified by an authorized bank officer. The Bank reserves the right to contact me/us for clarification or additional information if required.
              </p>
            </div>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="bg-red-50 p-6 rounded-lg border-2 border-red-300">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={formData.declarationConsent}
              onChange={(e) => updateFormData({ declarationConsent: e.target.checked })}
              className="w-5 h-5 text-[#C8102E] focus:ring-[#C8102E] mt-1 flex-shrink-0"
            />
            <span className="ml-4 text-sm text-gray-900">
              <strong className="text-[#C8102E] text-base">I HAVE READ AND UNDERSTOOD</strong> all the terms, conditions, and declarations mentioned above. I agree to be bound by them and confirm that all information provided in this application is true and accurate. <span className="text-red-500 text-base">*</span>
            </span>
          </label>
        </div>

        {/* Primary Cardholder Signature */}
        <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
          <h4 className="font-semibold text-gray-900 mb-4">Primary Cardholder Signature</h4>
          <SignaturePad
            signature={formData.primarySignature}
            onSignatureChange={(sig) => updateFormData({ primarySignature: sig })}
          />
          <p className="text-xs text-gray-500 mt-3">
            <strong>Note:</strong> This signature will be used for all required signature fields in the application and will be auto-populated where necessary. By signing, you confirm that you have the authority to enter into this agreement.
          </p>
        </div>

        {/* Date */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.signatureDate}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 font-semibold"
              />
              <p className="text-xs text-gray-500 mt-1">Format: DD/MM/YYYY</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <CheckCircle2 className="text-green-600 mx-auto mb-2" size={48} />
                <p className="text-sm font-semibold text-gray-900">Application Date</p>
                <p className="text-xs text-gray-600">Automatically captured</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submission Note */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Ready to Submit Your Application</h4>
              <p className="text-gray-700 text-sm mb-3">
                Please review all information carefully before clicking the "Complete" button. Once submitted, your application will be processed by our credit assessment team.
              </p>
              <div className="bg-white p-3 rounded border border-green-200">
                <p className="text-xs text-gray-600">
                  <strong>What happens next:</strong>
                </p>
                <ul className="text-xs text-gray-600 mt-2 space-y-1 ml-4 list-disc">
                  <li>An authorized bank officer will review your application</li>
                  <li>Credit verification will be conducted</li>
                  <li>You will be contacted within 3-5 business days</li>
                  <li>Additional documents may be requested if needed</li>
                  <li>Upon approval, your card will be delivered to your chosen address</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Officer Section (Read-only placeholder) */}
        <div className="bg-gray-100 p-6 rounded-lg border-2 border-gray-400">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={20} />
            For Bank Use Only
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Authorized Bank Officer Signature
              </label>
              <div className="w-full h-24 border-2 border-dashed border-gray-400 rounded-lg bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">To be signed by bank officer</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Officer Details
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Officer Name"
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-200"
                />
                <input
                  type="text"
                  placeholder="Officer ID"
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
