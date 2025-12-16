import { useState } from "react";
import { Reclaim } from "../../service/reclaim";
import { useNavigate } from "react-router";
import { showSnackbar } from "../Snackbar";

export interface StartVerificationButtonProps {
  providerId: string;
}

export default function StartVerificationButton({
  providerId,
}: StartVerificationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const startVerification = async (providerId: string) => {
    try {
      const request = await Reclaim.createVerificationRequest(providerId);
      const encodedRequest = encodeURIComponent(btoa(request));

      navigate(`/verify?request=${encodedRequest}`);
    } catch (error) {
      console.error(error);
      showSnackbar(
        `Could not request verification because ${typeof error === "object" && error && "message" in error ? error.message : error}`,
      );
    }
  };

  return (
    <button
      className="btn-primary"
      disabled={isLoading}
      onClick={async () => {
        if (isLoading) return;
        setIsLoading(true);
        await startVerification(providerId);
        setIsLoading(false);
      }}
    >
      {isLoading ? "Starting Verification..." : "Start Verification"}
    </button>
  );
}
