

interface MediaPosterProps {
  title: string;
  posterPath: string;
  tagline: string;
  imageUrl: string;
}

export const MediaPoster = ({
  title,
  posterPath,
  tagline,
  imageUrl}: MediaPosterProps) => (
  <div className="flex flex-col items-center justify-center">
    <h1 className="w-[450px] text-center break-words mx-auto text-white text-xl font-bold mb-4 lg:w-[300px] lg:text-lg sm:w-[200px] sm:text-base">
      {title}
    </h1>
    {posterPath ? (
      <img
        src={`${imageUrl}${posterPath}`}
        alt={title}
        className="w-[450px] rounded-md shadow-lg lg:w-[350px] sm:w-[250px]"
      />
    ) : (
      <div className="w-[450px] h-[675px] bg-hover rounded-xl flex items-center justify-center text-muted lg:w-[350px] sm:w-[250px]">
        No Image Available
      </div>
    )}
    {tagline && (
      <p className="w-[450px] mt-4 text-center break-words mx-auto text-white italic text-lg lg:w-[300px] lg:text-base sm:w-[200px] sm:text-sm">
        "{tagline}"
      </p>
    )}
  </div>
);
