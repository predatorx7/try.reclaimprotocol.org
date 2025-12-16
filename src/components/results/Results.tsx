import type { Proof } from "@reclaimprotocol/js-sdk";
import { useMemo, useState, useEffect } from "react";
import { formatParamKey, formatParamsValue, isValueCollection } from "../../utils/format_params";

export default function ResultsView({ proof, className }: { proof: Proof[] | null, className?: string }) {
    const extractedParameters = useMemo(() => {
        if (!proof) return {};

        const extractParameters = (o: Proof): Record<string, string> => JSON.parse(o.claimData.context).extractedParameters;

        return proof.map(extractParameters).reduce<Record<string, string>>((a, b) => {
            return ({
                ...a,
                ...b,
            });
        }, {});
    }, [proof]);

    const attachedPublicData = useMemo(() => {
        if (!proof) return {};

        const extractPublicData = (o: Proof): Record<string, string> | undefined => o.publicData;

        return proof.map(extractPublicData).reduce<Record<string, string>>((a, b) => {
            return ({
                ...a,
                ...b,
            });
        }, {});
    }, [proof]);


    if (!proof) return null;



    return (
        <div className={className} >
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-6 mb-3 text-center">
                What was Shared
            </p>

            <SharedDataDisplay
                extractedParameters={extractedParameters}
                attachedPublicData={attachedPublicData}
            />

            <ProofDetailsDialog
                proof={proof}
            />
        </div>
    )
}

const ProofDetailsDialog = ({
    proof,
}: {
    proof: Proof[];
}) => {
    const [isOpen, setShowDetails] = useState(false);
    const [copied, setCopied] = useState(false);

    const onClose = () => setShowDetails(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return <div className="w-full max-w-2xl mt-4 text-center">
        <button
            onClick={() => setShowDetails(true)}
            className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4 transition-colors"
        >
            View detailed proof
        </button>
    </div>;

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(proof, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={onClose} />
                <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">Generated Proofs</h2>
                        <button
                            onClick={onClose}
                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-0 overflow-hidden flex flex-col">
                        <div className="flex items-center justify-end px-4 py-2 bg-gray-50 border-b border-gray-100">
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors font-medium text-xs uppercase tracking-wide px-3 py-1.5 rounded-lg hover:bg-gray-200/50"
                            >
                                {copied ? (
                                    <>
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-green-600">Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span>Copy JSON</span>
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="overflow-auto p-4 bg-gray-50/50">
                            <pre className="text-xs sm:text-sm font-mono text-gray-800 whitespace-pre-wrap break-all leading-relaxed text-left">
                                {JSON.stringify(proof, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ParameterEntry: React.FC<{
    paramKey: string;
    value: unknown;
    status?: 'pending' | 'generating' | 'verifying' | 'completed' | 'failed';
}> = ({ paramKey, value }) => {
    return (
        <div className="flex items-start gap-3">
            <CompletedIcon />
            <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide text-left">
                    {formatParamKey(paramKey)}
                </div>
                <_RenderValue value={value} />
            </div>
        </div>
    );
};

const _RenderValue = ({ value }: { value: unknown }) => {
    const [humanizedFormat, setHumanizedFormat] = useState<boolean>(true);
    const isCollection = isValueCollection(value);

    const renderValue = (value: unknown): React.ReactNode => {
        if (value === null || value === undefined) {
            return <span className="text-gray-400">{formatParamsValue(value, false)}</span>;
        }
        if (typeof value === 'boolean') {
            return <span className="text-[#0000EE]">{value ? 'Yes' : 'No'}</span>;
        }
        if (typeof value === 'object') {
            return (
                <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-x-auto text-[#0000EE]">
                    {formatParamsValue(value, false)}
                </pre>
            );
        }
        return <span className="text-[#0000EE]">{formatParamsValue(value, false)}</span>;
    };

    return <div className="text-base font-medium break-all mt-0.5 text-left" onClick={() => {
        if (!isCollection) return;
        return setHumanizedFormat(!humanizedFormat);
    }}>
        {humanizedFormat ? formatParamsValue(value, humanizedFormat) : renderValue(value)}
    </div>
}

const CompletedIcon = () => {
    return <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
}
const SharedDataDisplay = ({
    extractedParameters,
    attachedPublicData
}: {
    extractedParameters: Record<string, string>;
    attachedPublicData: Record<string, string>;
}) => {
    return (
        <div className="flex-1 px-4 pb-4 overflow-y-auto min-h-[180px] max-h-[25vh] max-w-[30vh]">
            <div className="flex flex-col">
                <div className="space-y-3">
                    <div className="space-y-3 pr-2">
                        {Object.entries(extractedParameters).map(([key, value]) => (
                            <ParameterEntry
                                key={key}
                                paramKey={key}
                                value={value}
                            />
                        ))}
                    </div>
                </div>

                {attachedPublicData && Object.entries(attachedPublicData).length > 0 ? (<>
                    <div className="mt-2 pt-2 border-t border-gray-300">
                        <p className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className='text-gray-500' fill="currentColor"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" /></svg>
                            More
                        </p>
                        <div className="space-y-3 max-h-[20vh] overflow-y-auto pr-2">
                            {Object.entries(attachedPublicData).map(([key, value]) => (
                                <div key={key} className="flex items-start gap-3">
                                    <CompletedIcon />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide text-left">
                                            {formatParamKey(key)}
                                        </div>
                                        <_RenderValue value={value} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>) : undefined}
            </div>
        </div>
    );
};
