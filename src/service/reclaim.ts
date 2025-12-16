import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';

export const Reclaim = {
    /**
     * @deprecated This should happen on your backend
     * 
     * @param providerId - The unique identifier of Reclaim's data provider 
     * @returns 
     */
    createVerificationRequest: async (providerId: string) => {
        const reclaimAppId = import.meta.env.VITE_RECLAIM_APP_ID || "";
        const reclaimAppSecret = import.meta.env.VITE_RECLAIM_APP_SECRET || "";
        const proofRequest = await ReclaimProofRequest.init(reclaimAppId, reclaimAppSecret, providerId);

        return proofRequest.toJsonString();
    },
    restoreVerificationRequest: async (encodedRequest: string) => {
        const requestJsonString = atob(encodedRequest);
        const proofRequest = await ReclaimProofRequest.fromJsonString(requestJsonString);

        return proofRequest;
    },
}