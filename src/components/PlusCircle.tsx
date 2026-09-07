import { Link } from "react-router-dom";
import { scrollToTop } from "../lib/smoothScroll";

type Props = {
  to: string;
  label?: string;
  className?: string;
};

export function PlusCircle({ to, label = "Open", className = "" }: Props) {
  return (
    <Link to={to} className={`plus-circle ${className}`} aria-label={label} onClick={() => scrollToTop(false)}>
      <svg className="plus-circle-svg" viewBox="0 0 150 150" aria-hidden>
        <circle className="plus-circle-track" cx="75" cy="75" r="72" />
        <circle className="plus-circle-arc" cx="75" cy="75" r="72" />
        <path className="plus-circle-plus" d="M75 58 V92 M58 75 H92" />
      </svg>
    </Link>
  );
}
