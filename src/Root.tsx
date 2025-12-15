import { Outlet } from "react-router";
import { LiveBackground, LiveBackgroundProvider } from "./components/LiveBackground";
import { Navbar } from "./components/Navbar";

export default function Root() {
    return <div className="root-bg">
        <LiveBackgroundProvider>
            <LiveBackground>
                <Navbar />
                <Outlet />
            </LiveBackground>
        </LiveBackgroundProvider>
    </div>;
}