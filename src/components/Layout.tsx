import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useLenis } from "../hooks/useLenis";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { Footer } from "./Footer";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { armVoiceUnlock } from "../lib/voiceUnlock";

export function Layout() {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  useLenis();
  useEffect(() => {
    armVoiceUnlock();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [location.pathname]);

  return (
    <div className="theme-page min-h-screen">
      <Header onOpenMenu={() => setMenu(true)} />
      <Menu open={menu} onClose={() => setMenu(false)} />
      <Outlet />
      <Footer />
    </div>
  );
}
