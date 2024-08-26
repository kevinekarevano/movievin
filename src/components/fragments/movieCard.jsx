import { Link } from "react-router-dom";

const MovieCard = ({ data }) => {
  return data.map((item, index) => {
    return (
      <div key={index} className=" w-80  mt-5   md:w-1/5">
        <Link to={`/movie/${item.id}`}>
          <div className=" h-full">
            <div className=" rounded-lg h-96 overflow-hidden">
              <img className="h-full w-full object-cover" src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg"} alt={`${item.title}-image`} />
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

export default MovieCard;
