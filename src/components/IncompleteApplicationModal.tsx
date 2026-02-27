import { AlertTriangle, X } from 'lucide-react';

interface IncompleteApplicationModalProps {
    isOpen: boolean;
    missingFields: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function IncompleteApplicationModal({
    isOpen,
    missingFields,
    onConfirm,
    onCancel,
    isLoading = false,
}: IncompleteApplicationModalProps) {
    if (!isOpen) return null;

    const fieldsList = missingFields
        .split('\n')
        .filter(field => field && field.trim());

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 flex items-start justify-between flex-shrink-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <AlertTriangle className="text-red-500 flex-shrink-0" size={28} />
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Incomplete Application</h2>
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600 p-1"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Subtitle */}
                <div className="px-4 sm:px-6 pt-4 pb-2 flex-shrink-0">
                    <p className="text-sm sm:text-base text-gray-700 font-medium">
                        You have not completed the following required fields:
                    </p>
                </div>

                {/* Missing Fields List */}
                <div className="px-4 sm:px-6 py-4 overflow-y-auto flex-grow">
                    <ul className="space-y-2 sm:space-y-3">
                        {fieldsList.map((field, index) => (
                            <li key={index} className="flex items-center gap-2 sm:gap-3 text-gray-700">
                                <span className="text-base sm:text-lg">•</span>
                                <span className="text-sm sm:text-base">{field.replace(/^•\s*/, '')}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Question */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 text-center flex-shrink-0">
                    <p className="text-sm sm:text-base text-gray-700">
                        Do you want to continue saving this application as incomplete?
                    </p>
                </div>

                {/* Actions */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-200 flex flex-col sm:flex-row gap-3 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="w-full sm:flex-1 py-3 px-6 bg-[#C8102E] text-white font-semibold rounded-lg hover:bg-[#A00D25] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                    >
                        {isLoading ? 'Saving...' : 'Yes, Save as Incomplete'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="w-full sm:flex-1 py-3 px-6 bg-white border-2 border-gray-400 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
