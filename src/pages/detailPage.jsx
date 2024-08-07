import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dot from "@/components/dot";

const DetailPage = () => {
  const [movie, setMovie] = useState([]);
  const [caster, setCaster] = useState([]);
  const [director, setDirector] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getMovie = () => {
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f6cd99bd3f5a84bb726cd9c3311f7d07`)
        .then((res) => res.json())
        .then((data) => setMovie(data));
    };

    getMovie();
  }, [id]);

  useEffect(() => {
    const getCaster = () => {
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f6cd99bd3f5a84bb726cd9c3311f7d07`)
        .then((res) => res.json())
        .then((data) => {
          setCaster(data.cast);
        });
    };

    const getDirector = () => {
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f6cd99bd3f5a84bb726cd9c3311f7d07`)
        .then((res) => res.json())
        .then((data) => {
          setDirector(data.crew);
        });
    };

    getCaster();
    getDirector();
  }, [id]);

  const directed = director ? director.filter((person) => person.job === "Director") : [];
  const popularCast = caster ? caster.filter((person) => person.popularity > 20) : [];
  const bg = movie.backdrop_path;
  console.log(bg);
  return (
    <div className="bg-primaryBg  min-h-screen ">
      <img className="fixed top-10 z-10   left-0" src="../src/assets/blob1.png" alt="" />
      <img className="fixed w-80  right-0" src="../src/assets/blob2.png" alt="" />
      {movie.title ? (
        <div className={`p-10 flex gap-10`}>
          <div className="w-1/2">
            <img className="rounded-xl w-full" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
          </div>
          <div className={`p-6 w-full bg-[url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')]`}>
            <h1 className="text-white  text-7xl  font-bold">{movie.title}</h1>
            <div className="flex gap-3 items-center mt-3  ">
              <p className="text-zinc-400">
                <span className="mr-1">⭐</span>
                {movie.vote_average.toFixed(1)}
              </p>

              <Dot />

              <p className="text-zinc-400">{movie.runtime}m</p>

              <Dot />

              <p className="text-zinc-400">{movie.release_date.split("-")[0]}</p>

              <p className="bg-slate-700 text-white font-bold inline-block rounded-md px-1">PG</p>
            </div>
            <div className="flex gap-2 mt-3">
              {movie.genres.map((item, index) => {
                return (
                  <p className="text-zinc-400 font-semibold" key={index}>
                    {item.name},
                  </p>
                );
              })}
            </div>

            <p className="text-white text-lg mt-6">{movie.overview}</p>

            <div className="flex gap-20 mt-10">
              <p className="font-bold text-zinc-300">Star</p>
              <p className="text-white font-semibold">
                {popularCast.map((item) => {
                  return `${item.name},  `;
                })}
              </p>
            </div>

            <div className="flex gap-7 mt-10">
              <p className="font-bold text-zinc-300">Directed By</p>
              {directed.map((item, index) => {
                return (
                  <p key={index} className="text-white font-semibold">
                    {item.name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#F78FF8] via-[#A5A586] to-[#844BD2] bg-clip-text">
          <p className="text-transparent text-3xl font-bold ">
            No Result Found <span className="text-neutral-50">😢</span>{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
