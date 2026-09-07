import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { BrandLogo } from "./BrandLogo";

type Props = {
  onOpenMenu: () => void;
};

export function Header({ onOpenMenu }: Props) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 90);
      setScrolled(y > 16);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${hidden ? "is-hidden" : ""} ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-nav">
        <div className="nav-side nav-side-left">
          <button type="button" onClick={onOpenMenu} className="nav-menu">
            Menu
            <span className="nav-chevron" aria-hidden />
          </button>
          <NavLink to="/about" className="nav-link">
            About Us
          </NavLink>
          <NavLink to="/services" className="nav-link">
            Services
          </NavLink>
        </div>

        <Link to="/" className="nav-logo" aria-label="WeCall home">
          <BrandLogo />
        </Link>

        <div className="nav-side nav-side-right">
          <ThemeToggle />
          <Link to="/apply" className="nav-cta">
            <span className="nav-cta-shine" />
            Claim Seat
          </Link>
        </div>
      </div>
    </header>
  );
}
