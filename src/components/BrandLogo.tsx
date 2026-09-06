export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <>
      <img
        src="/media/WeCallDarkLogo.png"
        alt="WeCall"
        className={`block light:hidden ${className}`}
      />
      <img
        src="/media/wecall-logo.png"
        alt="WeCall"
        className={`hidden light:block ${className}`}
      />
    </>
  );
}
