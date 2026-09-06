export function ThemePhoto({
  light,
  dark,
  className = "",
  alt = "",
}: {
  light: string;
  dark: string;
  className?: string;
  alt?: string;
}) {
  return (
    <>
      <img src={dark} alt={alt} className={`block light:hidden ${className}`} />
      <img src={light} alt={alt} className={`hidden light:block ${className}`} />
    </>
  );
}
