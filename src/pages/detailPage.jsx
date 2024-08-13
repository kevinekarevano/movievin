import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dot from "@/components/dot";
import Loaders from "@/components/loaders";

const DetailPage = () => {
  const [movie, setMovie] = useState(null);
  const [caster, setCaster] = useState([]);
  const [director, setDirector] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f6cd99bd3f5a84bb726cd9c3311f7d07`);
        const movieData = await movieResponse.json();
        if (movieData && movieData.status_code !== 34) {
          // Status code 34 berarti film tidak ditemukan
          setMovie(movieData);

          const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f6cd99bd3f5a84bb726cd9c3311f7d07`);
          const creditsData = await creditsResponse.json();
          setCaster(creditsData.cast);
          setDirector(creditsData.crew);
        } else {
          setMovie(null); // Tidak ada data film
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
        setMovie(null); // Tangani error dengan mengatur movie menjadi null
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const directed = director ? director.filter((person) => person.job === "Director") : [];
  const popularCast = caster ? caster.filter((person) => person.popularity > 10) : [];

  
  const popularCastText = popularCast
    .map((item, index) => item.name)
    .reduce((acc, name, index, array) => {
      if (index === array.length - 1) {
        return `${acc}${name}.`; // Tambahkan titik di akhir nama terakhir
      }
      return `${acc}${name}, `;
    }, "");

  const directedText = directed
    .map((item) => item.name)
    .reduce((acc, name, index, array) => {
      if (index === array.length - 1) {
        return `${acc}${name}.`; // Tambahkan titik di akhir nama terakhir
      }
      return `${acc}${name}, `;
    }, "");

  return (
    <div className="bg-primaryBg min-h-screen">
      {isLoading ? (
        <Loaders />
      ) : // Tampilkan loader saat data sedang dimuat
      movie ? (
        <div className={`p-10 flex gap-10`}>
          <img className="fixed blur-md brightness-50 right-0 top-0 w-full opacity-30 h-full object-cover " src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="" />
          <div className="w-1/2 z-[999]">
            <img className="rounded-xl w-full" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
          </div>
          <div className="p-6 w-full z-[999]">
            <h1 className="text-white text-7xl font-bold">{movie.title}</h1>
            <div className="flex gap-3 items-center mt-3">
              <p className="text-zinc-400">
                <span className="mr-1">⭐</span>
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </p>

              <Dot />

              <p className="text-zinc-400">{movie.runtime ? `${movie.runtime}m` : "N/A"}</p>

              <Dot />

              <p className="text-zinc-400">{movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>

              <p className="bg-slate-700 text-white font-bold inline-block rounded-md px-1">PG</p>
            </div>
            <div className="flex gap-2 mt-3">
              {movie.genres
                ? movie.genres.map((item, index) => (
                    <p className="text-zinc-400 font-semibold" key={index}>
                      {item.name},
                    </p>
                  ))
                : "N/A"}
            </div>

            <p className="text-white text-lg mt-6">{movie.overview ? movie.overview : "No overview available"}</p>

            <div className="flex gap-20 mt-10">
              <p className="font-bold text-zinc-300">Star</p>
              <p className="text-white font-semibold">{popularCastText}</p>
            </div>

            <div className="flex gap-7 mt-10">
              <p className="font-bold text-zinc-300">Directed By</p>

              <p className="text-white font-semibold">{directedText}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#F78FF8] via-[#A5A586] to-[#844BD2] bg-clip-text">
          <p className="text-transparent text-3xl font-bold">
            No Result Found <span className="text-neutral-50">😢</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
