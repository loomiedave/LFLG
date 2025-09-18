// rounded-full overflow-hidden

export default function LogoImage({
  src,
  alt = "Logo",
}: {
  src?: string;
  alt?: string;
}) {
  return (
    <div className="inline-flex items-center justify-center  border-2 border-gray-200 bg-gray-100 max-w-[2rem] max-h-[2rem]">
      {src ? (
        <img src={src} alt={alt} className="w-auto h-full object-contain" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          <span className="text-xs font-medium text-gray-600">
            {alt.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
