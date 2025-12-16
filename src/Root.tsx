import { Outlet } from "react-router";
import {
  LiveBackground,
  LiveBackgroundProvider,
} from "./components/LiveBackground";
import { Navbar } from "./components/Navbar";
import { ExpertContextProvider } from "./contexts/ExpertContext";

export default function Root() {
  return (
    <div className="root-bg">
      <LiveBackgroundProvider>
        <ExpertContextProvider>
          <LiveBackground>
            <Navbar />
            <Outlet />
          </LiveBackground>
        </ExpertContextProvider>
      </LiveBackgroundProvider>
    </div>
  );
}
