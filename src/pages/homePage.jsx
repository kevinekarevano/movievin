import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import MovieCard from "@/components/fragments/movieCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loaders from "@/components/loaders";
import { Separator } from "@/components/ui/separator";
import { Swiper, SwiperSlide } from "swiper/react";
import Dot from "@/components/dot";
import { SheetClose, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { RiArrowRightWideFill } from "react-icons/ri";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SkeletonGenre from "@/components/skeletonGenre";

const HomePage = () => {
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [genreMovie, setGenreMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleNavbar = () => {
    const scrollPosition = Math.round(window.scrollY);
    // console.log(scrollPosition);
    scrollPosition >= 120 ? setShowNavbar(true) : setShowNavbar(false);
  };

  window.addEventListener("scroll", handleNavbar);

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
        console.log(data);
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
      <Navbar searchHandle={handleChange} searchRef={searchInputRef} isShow={showNavbar} />

      <Navbar searchHandle={handleChange} searchRef={searchInputRef} type={true} isShow={showNavbar} />

      <div className={`  min-h-screen`}>
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper "
        >
          {loading ? (
            <Loaders />
          ) : error ? (
            <Loaders />
          ) : (
            discoverMovies.map((item) => (
              <SwiperSlide key={item.id} style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${item.backdrop_path}')` }} className=" bg-center lg:bg-top bg-cover  ">
                <div className="bg-black h-screen p-10 lg:p-32 bg-opacity-70  ">
                  <div className=" lg:w-1/2 ">
                    <p className="font-bold text-4xl lg:text-5xl mb-7 lg:mb-5   text-white ">{item.title}</p>
                    <div className="flex items-center gap-2 mb-6 lg:mb-4">
                      <p className="text-white font-semibold">{item.release_date ? item.release_date.split("-")[0] : "N/A"}</p>
                      <Dot />
                      <p className="text-yellow-300  bg-primaryBg px-2 rounded-md font-medium ">{item.vote_average ? item.vote_average.toFixed(1) : "N/A"}</p>
                      <Dot />
                      <p className="text-white bg-primaryBg px-2  rounded-md font-medium"> {item.original_language.toUpperCase()}</p>
                    </div>
                    <p className="text-white line-clamp-6 ">{item.overview}</p>

                    <Link to={`/movie/${item.id}`}>
                      <div className="mt-6  lg:hover:w-1/3 hover:tracking-widest  transition-all duration-500 hover:bg-zinc-700 hover:bg-opacity-55  bg-primaryBg border-zinc-700 border-2 bg-opacity-75 lg:w-1/4 justify-center gap-2 cursor-pointer rounded-full h-11  flex items-center">
                        <p className="font-bold text-white">Detail</p>
                        <FiArrowUpRight color="white" size={20} />
                      </div>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>

      <div className="flex">
        <ScrollArea className={`w-1/6 hidden md:block  h-screen p-5`}>
          <p className="text-white font-monument  text-2xl">Genres</p>
          {genres.length > 0 ? (
            <div>
              {genres.map((item, index) => (
                <p onClick={() => handleGenreId(item)} className="text-white font-light text-lg cursor-pointer hover:font-semibold duration-300" key={index}>
                  {item.name}
                </p>
              ))}

              <Separator className="my-5" />
              <h1 className="text-white ">
                Made By{" "}
                <a href="https://github.com/kevinekarevano" className="text-yellow-200">
                  Kevin 😎
                </a>
              </h1>
              <p className="text-white font-light">
                Using <span className="font-bold">TMDB API</span>
              </p>
            </div>
          ) : (
            <SkeletonGenre />
          )}
        </ScrollArea> 



        <ScrollArea className="w-full   bg-zinc-900 l   bg-opacity-30 md:rounded-tl-3xl lg:pb-6 md:h-screen  h-full">
          {search.trim() !== "" ? (
            <h1 className="font-bold text-2xl text-yellow-300 p-5">
              Results For <span className="font-medium text-white">{search}</span>
            </h1>
          ) : genreId ? (
            <h1 className="font-bold text-2xl text-yellow-300 p-5">Genre Movies</h1>
          ) : (
            <h1 className="font-bold text-2xl text-yellow-300 p-5">Popular Movie</h1>
          )}
          {loading ? (
            <Loaders />
          ) : error ? (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#F78FF8] via-[#A5A586] to-[#844BD2] bg-clip-text">
              <p className="text-transparent text-3xl font-bold">
                Ooops.. Something Wrong <span className="text-neutral-50">😢</span>
              </p>
            </div>
          ) : (
            <div className="   flex flex-wrap gap-5 justify-center ">
              {searchResult.length > 0 ? (
                <MovieCard data={searchResult} />
              ) : (
                <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#F78FF8] via-[#A5A586] to-[#844BD2] bg-clip-text">
                  <p className="text-transparent text-3xl font-bold">
                    No Result Found <span className="text-neutral-50">😢</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </div>

      <Sheet>
        <SheetTrigger className={`${!showNavbar ? "-translate-x-10" : ""} transition-all duration-500 lg:hidden z-[99999] fixed top-1/2 bg-zinc-900 rounded-br-md py-5 rounded-tr-md  `}>
          <RiArrowRightWideFill size={30} className="text-violet-500" />
        </SheetTrigger>
        <SheetContent className="bg-primaryBg z-[99999999]  w-full" side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <p className="text-white font-monument text-start font-medium  text-2xl">Genres</p>
            </SheetTitle>
          </SheetHeader>
          {genres.length > 0 ? (
            <div c>
              {genres.map((item, index) => (
                <SheetClose asChild key={index}>
                  <p onClick={() => handleGenreId(item)} className="text-white font-light text-lg cursor-pointer hover:font-semibold duration-300">
                    {item.name}
                  </p>
                </SheetClose>
              ))}

              <Separator className="my-5" />

              <SheetFooter>
                <h1 className="text-white ">
                  Made By{" "}
                  <a href="https://github.com/kevinekarevano" className="text-yellow-200">
                    Kevin 😎
                  </a>
                </h1>
                <p className="text-white font-light">
                  Using <span className="font-bold">TMDB API</span>
                </p>
              </SheetFooter>
            </div>
          ) : (
            <SkeletonGenre />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HomePage;
