import { asset } from "../media";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <>
      <img
        src={asset("assets/images/WeCallDarkLogo.png")}
        alt="WeCall"
        className={`block light:hidden ${className}`}
      />
      <img
        src={asset("assets/images/wecall-logo.png")}
        alt="WeCall"
        className={`hidden light:block ${className}`}
      />
    </>
  );
}
