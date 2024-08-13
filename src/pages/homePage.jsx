import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import MovieCard from "@/components/fragments/movieCard";
import Search from "@/components/search";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cast } from "lucide-react";
import Loaders from "@/components/loaders";

const HomePage = () => {
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const getDiscoverMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}discover/movie?api_key=${import.meta.env.VITE_API_KEY}`);

        if (!res.ok) throw new Error("Failed fetch discover movies ");

        const data = await res.json();

        setDiscoverMovies(data.results);
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getDiscoverMovies();
  }, []);

  useEffect(() => {
    const getGenre = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`);

        if (!res.ok) throw new Error("Failed fetch Genres Movies");

        const data = await res.json();

        setGenres(data.genres);
      } catch (err) {
        setError(err.message);
      }
    };

    getGenre();
  }, []);

  useEffect(() => {
    const getSearchResults = async () => {
      if (search.trim() === "") {
        setSearchResult(discoverMovies);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const encodeSearch = encodeURIComponent(search);

        const res = await fetch(`${import.meta.env.VITE_API_URL}search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeSearch}`);

        if (!res.ok) throw new Error("Failed to fetch search results");

        const data = await res.json();

        console.log(data);

        setSearchResult(data.results);
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getSearchResults();
  }, [search, discoverMovies]);

  return (
    <div className="bg-primaryBg min-h-screen   ">
      <Navbar />
      <img className="fixed top-10   left-0" src="src/assets/blob1.png" alt="" />
      <img className="fixed w-80  right-0" src="src/assets/blob2.png" alt="" />
      <div className=" flex pt-32  flex-col justify-center items-center min-h-[50vh] mb-20">
        <div className=" justify-center  flex mt-10">
          <img className="w-[32rem]" src="src/assets/logo.svg" alt="ragline" />
        </div>

        <Search change={handleChange} inputRef={searchInputRef} />
      </div>

      <div className="">{search.trim() !== "" ? <h1 className="font-bold text-2xl text-yellow-300 p-5">Results For <span className="font-medium text-white">{search}</span></h1> : <h1 className="font-bold text-2xl text-yellow-300 p-5">Top Movie</h1>}</div>


      <div className="flex  ">
        <ScrollArea className="h-screen  w-1/6   p-5 ">
          <p className="text-white font-bold text-3xl">Genres</p>
          {genres.length > 0 ? (
            genres.map((item, index) => {
              return (
                <p className="text-white font-light text-lg" key={index}>
                  {item.name}
                </p>
              );
            })
          ) : (
            <Loaders />
          )}
        </ScrollArea>

        <ScrollArea className="  h-screen w-full bg-zinc-900 bg-opacity-30 rounded-tl-3xl    ">
          {loading ? <Loaders /> : error ? <p>{error}</p> : <div className="flex justify-center flex-wrap gap-5">{searchResult.length > 0 ? <MovieCard data={searchResult} /> : <p>not found</p>}</div>}
        </ScrollArea>
      </div>
    </div>
  );
};

export default HomePage;
