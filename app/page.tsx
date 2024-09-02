"use client";

import { useState } from "react";
import { FaCopy, FaRegCopy } from "react-icons/fa6";

export default function Homepage() {
  const [result, setResult] = useState("this will be the shortened url");
  const [isCopied, setIsCopied] = useState(false);

  const onCopyHandle = () => {
    setIsCopied(true);
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center px-10 py-28">
      <h1 className="text-5xl md:text-7xl font-bold text-mGreen">
        Mini
        <span className="bg-mGreen rounded-2xl px-2 text-mBackground ml-1.5">
          Fyr
        </span>
      </h1>
      <p className="mt-6 text-gray-300 font-mono text-center text-sm md:text-xl">
        Effortlessly Shorten, Seamlessly Share
      </p>
      <form
        className="flex flex-col items-center justify-center w-full mt-32"
        action=""
      >
        <input
          className="px-8 py-4 w-full md:w-2/3 text-base md:text-lg outline-none rounded-xl shadow-lg text-black"
          type="text"
          name="originalurl"
          id="originalurl"
          placeholder="Enter the url to shorten..."
        />
        <button
          className="mt-6 bg-mGreen rounded-2xl text-lg md:text-2xl px-4 py-2 md:px-6 md:py-3 text-mBackground font-bold border-2 border-mGreen hover:bg-mBackground hover:text-mGreen transition duration-300"
          type="submit"
        >
          Minify Now
        </button>
      </form>
      <div
        className={`${
          result ? "flex" : "hidden"
        } mt-24 flex items-center gap-5 text-mGreen text-base md:text-xl`}
      >
        <p>{result}</p>
        <button onClick={onCopyHandle}>
          {isCopied ? <FaCopy className="animate-ping" /> : <FaRegCopy />}
        </button>
      </div>
    </div>
  );
}
