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
        const movieResponse = await fetch(`${import.meta.env.VITE_API_URL}movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
        const movieData = await movieResponse.json();
        if (movieData && movieData.status_code !== 34) {
          setMovie(movieData);

          const creditsResponse = await fetch(`${import.meta.env.VITE_API_URL}movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`);
          const creditsData = await creditsResponse.json();
          setCaster(creditsData.cast);
          setDirector(creditsData.crew);
        } else {
          setMovie(null);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
        setMovie(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const directed = director.filter((person) => person.job === "Director") || [];
  const popularCast = caster.filter((person) => person.popularity > 10) || [];

  const formatText = (items) => items.map((item) => item.name).join(", ");

  return (
    <div className="bg-primaryBg min-h-screen">
      {isLoading ? (
        <Loaders />
      ) : movie ? (
        <div className="lg:p-10 md:flex gap-10">
          <img
            className="fixed blur-md brightness-50 right-0 top-0 w-full opacity-30 h-full object-cover"
            src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : `https://i.pinimg.com/564x/0d/2c/7e/0d2c7ea30eae81c3a575b4e4f1f93e1a.jpg`}
            alt="Backdrop"
          />
          <div className="p-10 md:p-0  sm:w-1/2">
            <img className="rounded-xl   w-full" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg"} alt="Poster" />
          </div>
          <div className="p-6 w-full z-[999999] ">
            <h1 className="text-white text-2xl md:text-5xl  font-monument">{movie.title}</h1>
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
              {movie.genres.map((item) => (
                <p className="text-zinc-400 font-semibold" key={item.id}>
                  {item.name}
                </p>
              ))}
            </div>
            <p className="text-white text-lg mt-6">{movie.overview || "No overview available"}</p>
            <div className="flex gap-20 mt-10">
              <p className="font-bold text-zinc-300">Star</p>
              <p className="text-white font-semibold">{popularCast.length > 0 ? formatText(popularCast) : "No popular cast available"}</p>
            </div>
            <div className="flex gap-7 mt-10">
              <p className="font-bold text-zinc-300">Directed By</p>
              <p className="text-white font-semibold">{directed.length > 0 ? formatText(directed) : "No director information available"}</p>
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
