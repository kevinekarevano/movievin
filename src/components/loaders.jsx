const Loaders = () => {
  return (
    <div className="w-full min-h-screen  flex flex-col justify-center items-center">
      <div className="flex gap-x-2">
        <div className="w-5 bg-[#d991c2]  h-5 rounded-full animate-bounce"></div>
        <div className="w-5  h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
        <div className="w-5 h-5  bg-[#6756cc] rounded-full animate-bounce"></div>
      </div>
      <p className="text-white mt-3 text-lg    ">Loading...</p>
      <p className="text-white  text-md   font-thin ">Waiting for content 🧐</p>

    </div>
  );
};

export default Loaders;
