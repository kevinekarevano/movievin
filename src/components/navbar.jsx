import Search from "./search";

const Navbar = ({ searchHandle, searchRef, isShow, type = false }) => {
  return (
    <>
      {type ? (
        <nav className={`${isShow ? "top-5" : "-top-24"} duration-500 transition-all fixed z-[99999] flex w-full justify-center`}>
          <Search change={searchHandle} inputRef={searchRef}  />
        </nav>
      ) : (
        <nav>
          <div className={` bg-cover bg-center  bg-[url('https://i.pinimg.com/originals/01/9f/5c/019f5c50d2c49ae35aaefc9834bf4550.gif')]  flex justify-between items-center  text-cyan-900 p-5`}>
            <img className=" w-40 h-full " src="assets/logo.svg" alt="Logo" />
            
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
