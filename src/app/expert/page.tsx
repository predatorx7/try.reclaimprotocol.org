import './index.css';
import { useExpertContext } from '../../contexts/ExpertContext';
import { useState } from 'react';
import { showSnackbar } from '../../components/Snackbar';
import { useNavigate } from 'react-router';

function Page() {
    const { settings, updateSettings, saveSettings } = useExpertContext();
    const [jsonError, setJsonError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSave = () => {
        setJsonError(null);
        // Validate JSON fields
        try {
            if (settings.parameters) JSON.parse(settings.parameters);
            if (settings.context) JSON.parse(settings.context);
        } catch (e) {
            setJsonError("Invalid JSON in Parameters or Context fields.");
            // We could show a toast here, but for now simple alert/error text
            alert("Invalid JSON in Parameters or Context fields.");
            return;
        }

        saveSettings();
        showSnackbar("Settings saved!");
        navigate('/');
    };

    return (
        <div className="expert-container">
            <h2 className="main-heading">Expert options</h2>

            <p className="subheading">
                Configure advanced options for verification.
            </p>

            <div className="settings-card">
                <div className="setting-header">
                    <div>
                        <div className="setting-title">Expert Mode</div>
                        <div className="setting-desc">Enable advanced configuration options.</div>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.isExpertModeEnabled}
                            onChange={(e) => updateSettings({ isExpertModeEnabled: e.target.checked })}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>

            <div className={`settings-card ${!settings.isExpertModeEnabled ? 'disabled' : ''}`}>
                <div className="setting-title">Callback URL</div>
                <div className="setting-desc">URL to receive proof callbacks.</div>
                <input
                    type="text"
                    className="input-tile"
                    placeholder="https://example.com/callback"
                    value={settings.callbackUrl}
                    onChange={(e) => updateSettings({ callbackUrl: e.target.value })}
                />
            </div>

            <div className={`settings-card ${!settings.isExpertModeEnabled ? 'disabled' : ''}`}>
                <div className="setting-title">Parameters</div>
                <div className="setting-desc">JSON string of parameters to override.</div>
                <textarea
                    className="input-tile"
                    placeholder='{"key": "value"}'
                    value={settings.parameters}
                    onChange={(e) => updateSettings({ parameters: e.target.value })}
                />
            </div>

            <div className={`settings-card ${!settings.isExpertModeEnabled ? 'disabled' : ''}`}>
                <div className="setting-title">Context</div>
                <div className="setting-desc">JSON string for additional context.</div>
                <textarea
                    className="input-tile"
                    placeholder='{"contextId": "123"}'
                    value={settings.context}
                    onChange={(e) => updateSettings({ context: e.target.value })}
                />
            </div>

            <div className={`settings-card ${!settings.isExpertModeEnabled ? 'disabled' : ''}`}>
                <div className="setting-title">Redirect URL</div>
                <div className="setting-desc">URL to redirect after verification.</div>
                <input
                    type="text"
                    className="input-tile"
                    placeholder="https://example.com/success"
                    value={settings.redirectUrl}
                    onChange={(e) => updateSettings({ redirectUrl: e.target.value })}
                />
            </div>

            <div className={`settings-card ${!settings.isExpertModeEnabled ? 'disabled' : ''}`}>
                <div className="setting-title">Provider Version</div>
                <div className="setting-desc">Specific provider version to use.</div>
                <input
                    type="text"
                    className="input-tile"
                    placeholder="v1.0.0"
                    value={settings.providerVersion}
                    onChange={(e) => updateSettings({ providerVersion: e.target.value })}
                />
            </div>

            <div className={`settings-card ${!settings.isExpertModeEnabled ? 'disabled' : ''}`}>
                <div className="setting-title">App ID</div>
                <div className="setting-desc">Your Reclaim App ID.</div>
                <input
                    type="text"
                    className="input-tile"
                    placeholder="Enter App ID"
                    value={settings.appId}
                    onChange={(e) => updateSettings({ appId: e.target.value })}
                />
            </div>

            <div className={`settings-card ${!settings.isExpertModeEnabled ? 'disabled' : ''}`}>
                <div className="setting-title">App Secret</div>
                <div className="setting-desc">Your Reclaim App Secret.</div>
                <input
                    type="password"
                    className="input-tile"
                    placeholder="Enter App Secret"
                    value={settings.appSecret}
                    onChange={(e) => updateSettings({ appSecret: e.target.value })}
                />
            </div>

            <div className="save-btn-container">
                <button className="btn-primary" onClick={handleSave}>
                    Save Settings
                </button>
            </div>
        </div>
    )
}

export default Page
