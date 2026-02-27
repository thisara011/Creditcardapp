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
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="text-red-500 flex-shrink-0" size={32} />
                        <h2 className="text-2xl font-bold text-gray-900">Incomplete Application</h2>
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
                <div className="px-6 pt-4 pb-2">
                    <p className="text-gray-700 font-medium">
                        You have not completed the following required fields:
                    </p>
                </div>

                {/* Missing Fields List */}
                <div className="px-6 py-4 max-h-96 overflow-y-auto">
                    <ul className="space-y-3">
                        {fieldsList.map((field, index) => (
                            <li key={index} className="flex items-center gap-3 text-gray-700">
                                <span className="text-lg">•</span>
                                <span className="text-base">{field.replace(/^•\s*/, '')}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Question */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
                    <p className="text-gray-700 text-base">
                        Do you want to continue saving this application as incomplete?
                    </p>
                </div>

                {/* Actions */}
                <div className="px-6 py-5 border-t border-gray-200 flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? 'Saving...' : 'Yes, Save as Incomplete'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="w-full py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
