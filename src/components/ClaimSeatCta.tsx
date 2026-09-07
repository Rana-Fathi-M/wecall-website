import { Link } from "react-router-dom";
import { scrollToTop } from "../lib/smoothScroll";

type Props = {
  to?: string;
  type?: "submit" | "button";
  disabled?: boolean;
  className?: string;
  compact?: boolean;
  wide?: boolean;
  busyLabel?: string;
  onClick?: () => void;
};

export function ClaimSeatCta({
  to = "/apply",
  type,
  disabled,
  className = "",
  compact,
  wide,
  busyLabel,
  onClick,
}: Props) {
  const classes = compact
    ? `nav-cta ${className}`
    : `hero-cta-primary ${wide ? "hero-cta-wide" : ""} ${className}`;

  const inner = (
    <>
      <span className={compact ? "nav-cta-shine" : "hero-cta-shine"} />
      <span className="cta-line">{busyLabel ?? "Claim Your Investor Seat"}</span>
      {busyLabel ? null : <em>2 cohort seats left</em>}
    </>
  );

  if (type === "submit" || type === "button") {
    return (
      <button type={type} disabled={disabled} className={classes} onClick={onClick}>
        {inner}
      </button>
    );
  }

  return (
    <Link
      to={to}
      className={classes}
      onClick={() => {
        onClick?.();
        scrollToTop(false);
      }}
    >
      {inner}
    </Link>
  );
}
