import Search from "./search";

const Navbar = ({ searchHandle, searchRef }) => {
  return (
    <nav className="  ">
      <div className="bg-[#151515]  flex justify-between items-center  text-cyan-900 p-5">
        <img className=" w-40 h-full " src="assets/logo.svg" alt="Logo" />
        <div className=" ">
          <Search change={searchHandle} inputRef={searchRef} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
