interface PromoBannerProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  bgColor?: string;
  textColor?: string;
}

export default function PromoBanner({ 
  title, 
  subtitle, 
  buttonText = "CONFIRA", 
  buttonLink = "#",
  bgColor = "bg-primary",
  textColor = "text-white"
}: PromoBannerProps) {
  return (
    <div className={`${bgColor} ${textColor} rounded-lg p-8 text-center shadow-lg border-b-4 border-secondary`}>
      <h2 className="text-2xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-xl mb-6">{subtitle}</p>}
      {buttonText && (
        <a 
          href={buttonLink} 
          className={`inline-block bg-white text-primary hover:text-secondary px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition`}
        >
          {buttonText}
        </a>
      )}
    </div>
  );
} 