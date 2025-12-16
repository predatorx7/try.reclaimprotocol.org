import "./index.css";
import { EvaluatorSection } from "./components/EvaluatorSection";
import { ClaimRequestSection } from "./components/ClaimRequestSection";

function Page() {
  return (
    <>
      <div className="container">
        <h2 className="main-heading">Playground</h2>

        <p className="subheading">
          Try evaluation or claim creation using Reclaim protocol attestor.
        </p>
      </div>

      <div className="section-container">
        <EvaluatorSection title="JSON Path Evaluation" />
        <EvaluatorSection title="XML Path Evaluation" />
        <ClaimRequestSection />
      </div>
    </>
  );
}

export default Page;
