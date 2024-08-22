import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = ({ change, inputRef }) => {
  return (
    <div className="flex w-full justify-center  items-center  ">
      <div className="  rounded-xl bg-gradient-to-r from-[#F78FF8] via-[#A5A586] to-[#844BD2] p-1">
        <div className="bg-[#1D2028] flex justify-between rounded-lg w-96">
          <Input ref={inputRef} onChange={change} className="bg-transparent   w-full border-none outline-none text-white placeholder:text-gray-500 " type="text" placeholder="What movie do you want?" />
          <Button className="bg-transparent hover:bg-transparent" type="submit">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
