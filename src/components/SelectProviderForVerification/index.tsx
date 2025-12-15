import { useEffect, useState } from "react";
import "./index.css";

interface Provider {
    httpProviderId: string;
    name: string;
    description: string;
    logoUrl: string;
}

export default function SelectProviderForVerification() {
    const [query, setQuery] = useState("");
    const [providers, setProviders] = useState<Provider[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            if (!query.trim()) {
                setProviders([]);
                return;
            }

            setIsLoading(true);
            try {
                const res = await fetch(`https://api.reclaimprotocol.org/api/providers/active/paginated?pageKey=0&pageSize=10&searchQuery=${encodeURIComponent(query)}`);
                const data = await res.json();
                if (data.providers) {
                    setProviders(data.providers);
                }
            } catch (error) {
                console.error("Failed to fetch providers", error);
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchProviders, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelect = (id: string) => {
        setQuery(id);
        setIsOpen(false);
    };

    const actionBar = <div className="action-bar">
        <button className="btn-primary">
            Start Verification
        </button>
    </div>

    return (
        <div className="provider-selector-wrapper">
            <div className={`search-container ${isOpen ? 'open' : ''}`}>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter a provider ID"
                        className="input-field"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        // Delay closing to allow clicking on items
                        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                    />
                </div>

                {isOpen && (
                    <div className="dropdown-overlay">
                        {providers.length > 0 && (
                            <div className="results-list">
                                {providers.map((provider) => (
                                    <div
                                        key={provider.httpProviderId}
                                        className="result-item"
                                        onClick={() => handleSelect(provider.httpProviderId)}
                                    >
                                        <div className="result-name">{provider.name}</div>
                                        <div className="result-desc">{provider.description}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="action-bar-in-overlay">{actionBar}</div>
                    </div>
                )}
            </div>

            {actionBar}
        </div>
    );
}