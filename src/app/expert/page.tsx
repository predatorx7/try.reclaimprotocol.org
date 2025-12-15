import './index.css';
import wordLogo from '../../assets/word_icon.svg'
import simpleLogo from '/icon.svg'

function Page() {
    return (
        <>
            <div className='container'>
                <a href="https://reclaimprotocol.org" target="_blank">
                    <img src={simpleLogo} alt="Reclaim Protocol logo" />
                </a>
                <a href="https://reclaimprotocol.org" target="_blank">
                    <img src={wordLogo} alt="Reclaim Protocol logo" />
                </a>
            </div>
            <h1>Reclaim Protocol</h1>
        </>
    )
}

export default Page
