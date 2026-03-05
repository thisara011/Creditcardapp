import { Check, User } from 'lucide-react';
import { useState } from 'react';
import { FormData } from '../App';

interface Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function PersonalDetails({ formData, updateFormData }: Props) {
  const [otpTimer, setOtpTimer] = useState(0);
  const [generatedOTP, setGeneratedOTP] = useState<string | null>(null);

  const generateAndSendOTP = () => {
    if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);

    // In production, this would send via SMS API
    console.log(`OTP sent to ${formData.mobileNumber}: ${otp}`);
    alert(`OTP sent to ${formData.mobileNumber}\n\nDemo OTP: ${otp}`);

    updateFormData({
      mobileOTPSent: true,
      mobileOTP: '',
      mobileOTPResendCount: formData.mobileOTPResendCount + 1,
    });

    // Set 2-minute timer
    setOtpTimer(120);
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const verifyOTP = () => {
    if (!formData.mobileOTP) {
      alert('Please enter the OTP');
      return;
    }

    if (formData.mobileOTP === generatedOTP) {
      updateFormData({ mobileVerified: true });
      alert('Mobile number verified successfully!');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
          <label htmlFor="title-personal" className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <select
            id="title-personal"
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
          <label htmlFor="date-of-birth" className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            id="date-of-birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Must be 18 years or above</p>
        </div>

        {/* Mobile Number with OTP Verification */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mobile Number <span className="text-red-500">*</span>
          </label>

          <div className="flex gap-2 mb-4">
            <input
              type="tel"
              value={formData.mobileNumber}
              onChange={(e) => {
                if (!formData.mobileVerified) {
                  updateFormData({ mobileNumber: e.target.value });
                }
              }}
              disabled={formData.mobileVerified}
              placeholder="07XXXXXXXX"
              className={`flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent ${formData.mobileVerified ? 'bg-gray-100 cursor-not-allowed text-gray-600' : ''
                }`}
            />
            <button
              type="button"
              onClick={generateAndSendOTP}
              disabled={formData.mobileVerified || !formData.mobileNumber || otpTimer > 0}
              className="px-4 py-2 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D24] disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-sm whitespace-nowrap"
            >
              {otpTimer > 0 ? `Resend (${formatTimer(otpTimer)})` : 'Send OTP'}
            </button>
          </div>

          {formData.mobileVerified && (
            <div className="flex items-center gap-2 p-3 bg-green-100 border border-green-300 rounded-lg mb-4">
              <Check size={20} className="text-green-600" />
              <span className="text-sm text-green-700 font-medium">Mobile number verified</span>
            </div>
          )}

          {formData.mobileOTPSent && !formData.mobileVerified && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={formData.mobileOTP}
                  onChange={(e) => updateFormData({ mobileOTP: e.target.value.replace(/\D/g, '') })}
                  placeholder="Enter 6-digit OTP"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-center text-lg tracking-widest font-mono"
                />
                <button
                  type="button"
                  onClick={verifyOTP}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm"
                >
                  Verify
                </button>
              </div>
              <p className="text-xs text-gray-600">
                OTP expires in {formatTimer(otpTimer)}. Check your spam folder if not received.
              </p>
            </div>
          )}

          <p className="text-xs text-gray-600 mt-2">This will be your registered mobile number</p>
        </div>

        {/* Home Telephone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Home Telephone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.homeTelephone}
            onChange={(e) => updateFormData({ homeTelephone: e.target.value })}
            placeholder="011XXXXXXX"
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