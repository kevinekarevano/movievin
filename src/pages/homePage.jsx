import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import MovieCard from "@/components/fragments/movieCard";
import Search from "@/components/search";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loaders from "@/components/loaders";
import { Separator } from "@/components/ui/separator";


const HomePage = () => {
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [genreMovie, setGenreMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleGenreId = (data) => {
    setGenreId(data.id);
    setSearch(""); // Reset search when a genre is selected
    setSearchResult([]); // Clear search results
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
        if (genreId) {
          setSearchResult(genreMovie); // Show genre movies if genreId is set
        } else {
          setSearchResult(discoverMovies); // Show discover movies if no search and no genreId
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const encodeSearch = encodeURIComponent(search);

        const res = await fetch(`${import.meta.env.VITE_API_URL}search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeSearch}`);

        if (!res.ok) throw new Error("Failed to fetch search results");

        const data = await res.json();
        setSearchResult(data.results);
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getSearchResults();
  }, [search, discoverMovies, genreId, genreMovie]); // Add genreId and genreMovie as dependencies

  useEffect(() => {
    const getGenreMovie = async () => {
      if (!genreId) return; // Skip fetching if no genreId

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${genreId}`);
        if (!res.ok) throw new Error("Failed to fetch genre movie");
        const data = await res.json();
        setGenreMovie(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getGenreMovie();
  }, [genreId]); // Depend on genreId to fetch movies when genre changes

  return (
    <div className="bg-primaryBg min-h-screen">
      <Navbar />
      {/* <img className="fixed rotate-180 w-80 right-0" src="src/assets/blob1.png" alt="" />
      <img className="fixed rotate-180 top-10 left-0" src="src/assets/blob2.png" alt="" /> */}
      <div className="flex pt-32 flex-col justify-center items-center min-h-[50vh] mb-20">
        <div className="justify-center flex mt-10">
          <img className="w-[32rem]" src="assets/logo.svg" alt="logo" />
        </div>

        <Search change={handleChange} inputRef={searchInputRef} />
      </div>

      <div className="">
        {search.trim() !== "" ? (
          <h1 className="font-bold text-2xl text-yellow-300 p-5">
            Results For <span className="font-medium text-white">{search}</span>
          </h1>
        ) : genreId ? (
          <h1 className="font-bold text-2xl text-yellow-300 p-5">Genre Movies</h1>
        ) : (
          <h1 className="font-bold text-2xl text-yellow-300 p-5">Top Movie</h1>
        )}
      </div>

      <div className="flex">
        <ScrollArea className="w-1/6 h-screen p-5">
          <p className="text-white font-monument  text-3xl">Genres</p>
          {genres.length > 0 ? (
            <div>
              {genres.map((item, index) => (
                <p onClick={() => handleGenreId(item)} className="text-white font-light text-lg cursor-pointer hover:font-semibold duration-300" key={index}>
                  {item.name}
                </p>
              ))}

              <Separator className="my-5" />
              <h1 className="text-white ">
                Made By <span className="text-yellow-200">Kevin</span>
              </h1>
              <p className="text-white font-light">
                Using <span className="font-bold">TMDB API</span>
              </p>
            </div>
          ) : (
            <Loaders />
          )}
        </ScrollArea>

        <ScrollArea className="w-full bg-zinc-900 bg-opacity-30 rounded-tl-3xl pb-10 h-screen">
          {loading ? <Loaders /> : error ? <p>{error}</p> : <div className="flex justify-center flex-wrap gap-5">{searchResult.length > 0 ? <MovieCard data={searchResult} /> : <p>No movies found</p>}</div>}
        </ScrollArea>
      </div>
    </div>
  );
};

export default HomePage;
