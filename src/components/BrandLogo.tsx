export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <>
      <img
        src="/assets/images/WeCallDarkLogo.png"
        alt="WeCall"
        className={`block light:hidden ${className}`}
      />
      <img
        src="/assets/images/wecall-logo.png"
        alt="WeCall"
        className={`hidden light:block ${className}`}
      />
    </>
  );
}
