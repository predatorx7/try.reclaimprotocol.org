import wordLogo from "../../assets/word_icon.svg";

export default function WordLogo() {
  return (
    <div className="logo-container">
      <a href="https://reclaimprotocol.org" target="_blank" rel="noreferrer">
        <img
          src={wordLogo}
          alt="Reclaim Protocol"
          className="logo-icon"
          style={{ height: "40px", width: "auto" }}
        />
      </a>
    </div>
  );
}
