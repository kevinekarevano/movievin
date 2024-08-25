import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = ({ change, inputRef }) => {
  return (
    <div className=" rounded-xl shadow-[-2px_3px_28px_3px_#844BD2] lg:w-96 transition-all duration-700   bg-gradient-to-r from-[#F78FF8] via-[#A5A586] to-[#844BD2] p-1">
      <div className="bg-[#1D2028] flex justify-between rounded-lg w-full">
        <Input ref={inputRef} onChange={change} className="bg-transparent w-full   border-none outline-none text-white placeholder:text-gray-500 " type="text" placeholder="What movie do you want?" />
        <Button className="bg-transparent hover:bg-transparent" type="submit">
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
