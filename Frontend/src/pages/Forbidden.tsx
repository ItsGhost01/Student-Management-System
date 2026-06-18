import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router";

export default function Forbidden() {

  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      
      <div className="max-w-250 sm:max-w-lg md:max-w-3xl">
        <DotLottieReact
          src="/Forbidden.lottie"
          loop
          autoplay
          className="w-full h-auto"
        />
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-6 text-error">
        403-Access Denied
      </h1>

      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        Cannot Access the page
      </p>

      <button 
      onClick={() => navigate(-1)}
      className="p-3 bg-primary text-white font-bold mt-2 rounded-2xl cursor-pointer hover:bg-buttonSec">
        
        Back to Dashboard
      </button>
  
    </div>
  );
}