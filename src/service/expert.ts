export interface ExpertSettings {
    isExpertModeEnabled: boolean;
    callbackUrl: string;
    parameters: string; // JSON string
    context: string; // JSON string
    redirectUrl: string;
    providerVersion: string;
    appId: string;
    appSecret: string;
    sharePageUrl: string;
}
