import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import MovieCard from "@/components/fragments/movieCard";
import Search from "@/components/search";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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
    const getMovie = () => {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=f6cd99bd3f5a84bb726cd9c3311f7d07`)
        .then((res) => res.json())
        .then((data) => setMovies(data.results));
    };

    getMovie();
  }, []);

  useEffect(() => {
    if (search !== "") {
      const result = movies.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult(result);
    } else {
      setSearchResult(movies);
    }
  }, [search, movies]);

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

      <div className="flex justify-center pb-10  h-full flex-wrap  gap-10">{searchResult.length > 0 ? <MovieCard data={searchResult} /> : <p className="text-white font-semibold text-lg">No results found😥</p>}</div>
    </div>
  );
};

export default HomePage;
