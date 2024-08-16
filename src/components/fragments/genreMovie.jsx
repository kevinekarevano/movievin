import { Link } from "react-router-dom";

const GenreMovie = ({ data }) => {
  return data.map((item, index) => {
    return (
      <div key={index} className="z-40   overflow-hidden mt-5 w-1/6">
        <Link to={`/movie/${item.id}`}>
          <div>
            <div className="bg-slate-200 h-72 rounded-lg overflow-hidden">
              <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={`${item.title}-image`} />
            </div>
            <p className="text-white truncate font-bold text-2xl mt-2">{item.title}</p>
            <div className="flex justify-between mt-3">
              <p className="font-medium text-zinc-400">⭐{item.vote_average ? item.vote_average.toFixed(1) : "N/A"}</p>
              <p className="bg-zinc-600 text-white font-semibold inline-block rounded-md px-1">{item.release_date ? item.release_date.split("-")[0] : "N/A"}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  });
};

export default GenreMovie;
