import { useState } from "react";

export interface StartVerificationButtonProps {
    providerId: string;
}

export default function StartVerificationButton({ providerId }: StartVerificationButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const startVerification = async (providerId: string) => {
        try {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 2500);
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button className="btn-primary"
            disabled={isLoading}
            onClick={async () => {
                if (isLoading) return;
                setIsLoading(true);
                await startVerification(providerId);
                setIsLoading(false);
            }}>
            {isLoading ? 'Starting Verification...' : 'Start Verification'}
        </button>
    )
}