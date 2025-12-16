import { useState } from 'react';

export function ClaimRequestSection() {
    const [claimRequest, setClaimRequest] = useState('');
    const [claimResult, setClaimResult] = useState('');
    const [minimalData, setMinimalData] = useState('');
    const [loading, setLoading] = useState(false);

    const mockEvaluate = async () => {
        return new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve("Evaluation Successful. Verification confirmed.");
            }, 3000);
        });
    };

    const handleClaim = async () => {
        setLoading(true);
        setClaimResult('');
        setMinimalData('');
        const res = await mockEvaluate();
        setClaimResult(res);
        setMinimalData("Extracted Data: User ID: 12345, Active: true");
        setLoading(false);
    };

    return (
        <div className="card">
            <h2>Claim Verification</h2>
            <div className="input-group">
                <label>Claim Request</label>
                <textarea
                    value={claimRequest}
                    onChange={(e) => setClaimRequest(e.target.value)}
                    placeholder="Enter claim request"
                    rows={4}
                />
            </div>
            <button className="plg-button" onClick={handleClaim} disabled={loading}>
                {loading ? 'Processing...' : 'Start Claim'}
            </button>
            {claimResult && (
                <div className="result-box">
                    <strong>Evaluation Result:</strong>
                    <p>{claimResult}</p>
                </div>
            )}
            {minimalData && (
                <div className="result-box highlight">
                    <strong>Minimal Data Extracted:</strong>
                    <p>{minimalData}</p>
                </div>
            )}
        </div>
    );
}
