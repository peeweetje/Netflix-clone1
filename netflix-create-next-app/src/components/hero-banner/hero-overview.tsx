interface HeroOverviewProps {
  overview: string;
  movieId: number;
  showInfo: boolean;
}

export const HeroOverview = ({ overview, movieId, showInfo }: HeroOverviewProps) => {
  return (
    <div className="min-h-[50px] xs:min-h-[60px] sm:min-h-[80px] md:min-h-[100px] transition-all duration-300 ease-in-out">
      <p
        id={`overview-${movieId}`}
        className={`text-white/90 xs:text-white/95 sm:text-white text-[0.65rem] xs:text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-lg transition-all duration-300 ease-in-out ${
          showInfo
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2"
        }`}
      >
        {overview}
      </p>
    </div>
  );
};