import { Camera, CheckCircle, FileText, FolderOpen, SwitchCamera, Trash2, XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FormData } from '../App';
import SignaturePad from './SignaturePad';

interface Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function Declaration({ formData, updateFormData }: Props) {
  const individualDocs: { key: keyof FormData; label: string }[] = [
    { key: 'indNicCopy', label: 'Customer National Identity Card (NIC)' },
    { key: 'indSalarySlips', label: 'Salary slips' },
    { key: 'indGuarantorNic', label: 'NIC of a Non-Related (NR) person (Guarantor/Reference)' },
    { key: 'indAddressProof', label: 'Address proof (if current address differs from NIC)' },
  ];

  const businessDocs: { key: keyof FormData; label: string; helper?: string }[] = [
    { key: 'bizNicCopy', label: 'Customer National Identity Card (NIC)' },
    { key: 'bizBusinessReg', label: 'Business Registration' },
    {
      key: 'bizBankStatements',
      label: 'Bank Statements',
      helper: 'Take last 6 months from other banks for new customers (not required for existing customers).',
    },
    { key: 'bizCardApplicationReview', label: 'Card Application Review Form' },
  ];

  // Add conditional doc for supplementary card passport bio page
  const getActiveDocs = () => {
    const docs = formData.applicationType === 'Business' ? businessDocs : individualDocs;

    // Add Supplementary Card Passport Bio Page if applicable
    if (formData.requireSupplementaryCard === 'Yes' && formData.suppIdentityType === 'Passport') {
      return [...docs, { key: 'suppPassportBioPage', label: 'Supplementary Cardholder Passport Bio Page' }];
    }

    return docs;
  };

  const activeDocs = getActiveDocs();

  // Shared file handler
  const handleFile = (key: keyof FormData, file: File) => {
    if (!file) return;
    updateFormData({ [key]: file.name } as Partial<FormData>);
  };

  const handleFileSelect = (key: keyof FormData, files: FileList | null) => {
    if (!files || !files[0]) return;
    handleFile(key, files[0]);
  };

  // Camera capture state
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraDocKey, setCameraDocKey] = useState<keyof FormData | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment'); // Start with back camera
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const closeCamera = () => {
    stopCamera();
    setCameraOpen(false);
    setCameraDocKey(null);
    setFacingMode('environment'); // Reset to back camera for next time
  };

  const openCamera = async (key: keyof FormData, preferredFacingMode: 'user' | 'environment' = 'environment') => {
    try {
      stopCamera(); // Stop any existing stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: preferredFacingMode }
      });
      streamRef.current = stream;
      setCameraDocKey(key);
      setFacingMode(preferredFacingMode);
      setCameraOpen(true);
    } catch (err) {
      console.error('Unable to access camera', err);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const switchCamera = () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    if (cameraDocKey) {
      openCamera(cameraDocKey, newFacingMode);
    }
  };

  useEffect(() => {
    if (!cameraOpen || !streamRef.current || !videoRef.current) return;
    videoRef.current.srcObject = streamRef.current;
  }, [cameraOpen]);

  const handleCameraCapture = () => {
    if (!cameraDocKey || !videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, width, height);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `captured-${cameraDocKey}-${Date.now()}.jpg`, {
          type: 'image/jpeg',
        });
        handleFile(cameraDocKey, file);
        closeCamera();
      },
      'image/jpeg',
      0.9
    );
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <FileText className="text-[#C8102E]" size={28} />
        <h2 className="text-2xl font-bold text-gray-900">Legal Declaration & Signatures</h2>
      </div>
      <p className="text-gray-600 mb-6">Please review and sign the declaration to complete your application</p>

      <div className="space-y-6">
        {/* Camera capture modal */}
        {cameraOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-4 space-y-4">
              <h3 className="text-base font-semibold text-gray-900">
                Capture document photo
              </h3>
              <div className="rounded-md overflow-hidden bg-black relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-contain bg-black"
                />
                {/* Switch Camera Button */}
                <button
                  type="button"
                  onClick={switchCamera}
                  className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                  title="Switch camera"
                  aria-label="Switch between front and back camera"
                >
                  <SwitchCamera size={20} className="text-gray-700" />
                </button>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeCamera}
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCameraCapture}
                  className="px-4 py-2 text-sm rounded-md bg-[#C8102E] text-white hover:bg-[#A00D24]"
                >
                  Capture & Use
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Application Type & Support Documents */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText size={20} className="text-[#C8102E]" />
            Application Type & Support Documents
          </h3>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Select Application Type <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center gap-2 text-sm text-gray-800 cursor-pointer">
                <input
                  type="radio"
                  name="applicationType"
                  value="Individual"
                  checked={formData.applicationType === 'Individual'}
                  onChange={(e) => updateFormData({ applicationType: e.target.value as FormData['applicationType'] })}
                  className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                />
                <span>Individual Applicant</span>
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-gray-800 cursor-pointer">
                <input
                  type="radio"
                  name="applicationType"
                  value="Business"
                  checked={formData.applicationType === 'Business'}
                  onChange={(e) => updateFormData({ applicationType: e.target.value as FormData['applicationType'] })}
                  className="w-4 h-4 text-[#C8102E] focus:ring-[#C8102E]"
                />
                <span>Business Applicant</span>
              </label>
            </div>
          </div>

          {formData.applicationType && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-800">
                  {formData.applicationType === 'Business'
                    ? 'Required Business Applicant Documents'
                    : 'Required Individual Applicant Documents'}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <CheckCircle className="text-green-500" size={14} />
                  Uploaded&nbsp;&nbsp;
                  <XCircle className="text-red-500" size={14} />
                  Pending
                </p>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Document</th>
                      <th className="px-4 py-2 text-center font-medium text-gray-700">Status</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">File & Upload</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {activeDocs.map((doc) => {
                      const value = formData[doc.key] as string;
                      const uploaded = Boolean(value);
                      return (
                        <tr key={doc.key as string}>
                          <td className="px-4 py-3 align-top">
                            <div className="text-gray-900">{doc.label}</div>
                            {doc.helper && (
                              <p className="text-xs text-gray-500 mt-1">{doc.helper}</p>
                            )}
                          </td>
                          <td className="px-4 py-3 align-top text-center">
                            {uploaded ? (
                              <CheckCircle className="text-green-500 inline-block" size={20} />
                            ) : (
                              <XCircle className="text-red-400 inline-block" size={20} />
                            )}
                          </td>
                          <td className="px-4 py-3 align-top">
                            <div className="space-y-2">
                              <div>
                                {uploaded ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs border border-green-200">
                                    {value}
                                  </span>
                                ) : (
                                  <span className="text-xs text-gray-400 italic">No file uploaded</span>
                                )}
                              </div>

                              <div className="flex items-center justify-start gap-2 flex-wrap">
                                {/* Camera icon: open camera capture */}
                                <button
                                  type="button"
                                  title={uploaded ? "Recapture document" : "Capture document"}
                                  aria-label={uploaded ? "Recapture document with camera" : "Capture document with camera"}
                                  onClick={() => openCamera(doc.key)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md cursor-pointer transition-colors bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
                                >
                                  <Camera size={16} />
                                  {uploaded ? 'Recapture' : 'Capture'}
                                </button>

                                {/* Folder icon: open file picker */}
                                <label
                                  title={uploaded ? "Reupload from device" : "Upload from device"}
                                  aria-label={uploaded ? "Reupload document from device" : "Upload document from device"}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md cursor-pointer transition-colors bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
                                >
                                  <FolderOpen size={16} />
                                  {uploaded ? 'Reupload' : 'Upload'}
                                  <input
                                    type="file"
                                    accept=".pdf,image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileSelect(doc.key, e.target.files)}
                                  />
                                </label>

                                {/* Delete button - only show if uploaded */}
                                {uploaded && (
                                  <button
                                    type="button"
                                    title="Remove document"
                                    aria-label="Remove uploaded document"
                                    onClick={() => updateFormData({ [doc.key]: '' } as Partial<FormData>)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md cursor-pointer transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                                  >
                                    <Trash2 size={16} />
                                    Remove
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                You can upload clear photos (via camera) or files from your device (PDF / images). Ensure all information is readable.
              </p>
            </div>
          )}
        </div>

        {/* Declaration Text */}
        <div className="bg-white p-6 rounded-lg border-2 border-red-200 max-h-96 overflow-y-auto">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={20} className="text-[#C8102E]" />
            Terms, Conditions & Declarations
          </h3>
          <div className="text-sm text-gray-700 space-y-4">
            <p>
              I / We state that the provided details are true and correct and are given in support of my/our application to Seylan Bank PLC, Sri Lanka for a Credit Card account, subject to the respective Credit Cardholder agreement which outlines the terms and conditions of use, and which will be sent to me/us with approval of my/our application.
            </p>
            <p>
              I / We hereby accept and undertake to be bound by the existing Terms and Conditions applicable to Credit Card Operations of Seylan Bank PLC and any amendments thereto, which shall come into effect from time to time and shall be published in www.seylan.lk and /or be sent to me/us in the event the Bank issues me / us a Credit Card. I / We hereby acknowledge and agree that it is my / our duty to be aware of and educate myself / ourselves of such amendments in a timely and regular manner. I / We also agree that in the event of me / us refusing to agree to the said terms and conditions I / We will immediately return the said card to Seylan Bank PLC. Not returning the said Card by me / us would be my /our due acceptance of such amendments to Terms and Conditions applicable to Seylan Bank Credit Cards.
            </p>
            <p>
              I/ We agree to accept liability of all transactions performed until reporting the loss of my / our cards.
            </p>
            <p>
              I / We further agree to a new Card product as a companion or an increase of my credit limit by the Bank at its discretion, after evaluating my / our credit performance, with my / our consent, in future.
            </p>

            <h4 className="font-semibold text-gray-900">Declaration by the Applicant(s) for Electronic Fund Transfer Cards (EFTC)</h4>
            <p>
              To: Director-Department of Foreign Exchange
            </p>
            <p>
              (To be filled by the Applicant/s to obtain foreign exchange against Credit/Debit or any other Electronic Fund Transfer Card)
            </p>
            <p>
              I / We <span className="font-semibold underline">{formData.fullName || '................................'}</span> (Primary Cardholder){formData.requireSupplementaryCard === 'Yes' ? `, ${formData.suppFullName || '................................'} (Supplementary Cardholder)` : ''} declare that all details given above by me/us on this form are true and correct.
            </p>
            <p>
              I / We hereby confirm that I / We am/ are aware of the terms and conditions applicable for the use of Electronic Fund Transfer Cards (EFTCs) as detailed in the Directions No. 03 of 2021 dated 18 March 2021 (Annexed) issued under the provisions of the Foreign Exchange Act, No. 12 of 2017 (the FEA) subject to which the card may be used for transactions in foreign exchange and I / We hereby undertake to abide by the said conditions.
            </p>
            <p>
              I / We further agree to provide any information on transactions carried out by me/ us in foreign exchange on the card issued to me/us as <span className="font-semibold">Seylan Bank</span> may require for the purpose of the FEA.
            </p>
            <p>
              I / We am / are aware that the bank is required to suspend availability of foreign exchange on EFTC if reasonable grounds exist to suspect that foreign exchange transactions which are not permitted in terms of the annexed Directions issued under the provisions of the FEA are being carried out on the EFTC issued to me/us and to report the matter to the Director - Department of Foreign Exchange. I / We also affirm that I / We undertake to surrender the EFTCs to the bank, if I / We migrate or leave Sri Lanka for permanent residence or employment abroad, as applicable.
            </p>
            <p>
              Further, I / we also agreed to notify my/our change in residential status to the bank, if any, accordingly.
            </p>
            <p>
              I / We agree to comply with the terms & conditions applicable to the conduct of “internet / SMS Banking facilities” which I / We have read and understood (Please refer www.seylan.lk for rules and regulations)
            </p>
          </div>
        </div>

        {/* Signatures Section */}
        <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
          <h4 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FileText size={20} className="text-[#C8102E]" />
            Signatures & Dates
          </h4>

          <div className="space-y-6">
            {/* Primary Cardholder Signature */}
            <div className="border-t pt-6">
              <h5 className="font-semibold text-gray-900 mb-4">Signature of the Primary Cardholder</h5>
              <SignaturePad
                signature={formData.primarySignature}
                onSignatureChange={(sig) => updateFormData({ primarySignature: sig })}
              />
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.signatureDate}
                  onChange={(e) => updateFormData({ signatureDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
            </div>

            {/* Supplementary Cardholder Signature (if applicable) */}
            {formData.requireSupplementaryCard === 'Yes' && (
              <div className="border-t pt-6">
                <h5 className="font-semibold text-gray-900 mb-4">Signature of the Supplementary Cardholder</h5>
                <SignaturePad
                  signature={formData.suppSignature}
                  onSignatureChange={(sig) => updateFormData({ suppSignature: sig })}
                />
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.suppSignatureDate}
                    onChange={(e) => updateFormData({ suppSignatureDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Authorized Officer Signature */}
            <div className="border-t pt-6 bg-gray-50 p-4 rounded">
              <h5 className="font-semibold text-gray-900 mb-4">Signature of the Authorised Officer</h5>
              <p className="text-sm text-gray-700 mb-4">
                I, as the Authorized Officer of the bank have carefully examined the information together with relevant documents given by the applicant/s and satisfied with the bona-fide of these information and documents. Further, I as the Authorized Officer of the bank undertake at all times, to exercise due diligence on the transactions carried out by the cardholder on his / her EFTC in foreign exchange and to suspend the availability of foreign exchange on the EFTC if reasonable grounds exist to suspect that foreign exchange transactions which are not permitted in terms of Directions No. 03 of 2021 dated 18 March 2021 issued under the provisions of the Foreign Exchange Act, No. 12 of 2017 are being carried out on the EFTC, in violation of the undertaking given by the card holders and to bring the matter to the attention of the Director - Department of Foreign Exchange.
              </p>
              <SignaturePad
                signature={formData.authorizedOfficerSignature}
                onSignatureChange={(sig) => updateFormData({ authorizedOfficerSignature: sig })}
              />
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.authorizedOfficerDate}
                  onChange={(e) => updateFormData({ authorizedOfficerDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submission Note */}
      </div>
    </div>
  );
}
