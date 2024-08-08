import { useRouteError } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="bg-primaryBg min-h-screen gap-10 flex flex-col justify-center items-center">
      <img className=" fixed left-0" src="src/assets/blob1.png" alt="" />
      <img className="fixed w-72 top-0 right-0" src="src/assets/blob2.png" alt="" />
      <img className="w-1/2" src="src/assets/404.svg" alt="" />
      <div className="bg-gradient-to-r from-[#F78FF8] via-[#A5A586] to-[#844BD2] bg-clip-text">
        <p className="text-transparent text-xl font-bold ">{error.statusText}.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
