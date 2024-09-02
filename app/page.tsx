"use client";

import Spinner from "@/components/Spinner";
import axios from "axios";
import { FormEvent, useState } from "react";
import { FaCopy, FaRegCopy } from "react-icons/fa6";

interface ResponseProp {
  success: boolean;
  newLink: {
    createdAt: string;
    id: string;
    originalUrl: string;
    shortCode: string;
  };
}

export default function Homepage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const sendReq = await axios.post("/api/shorten", {
        url: url.trim(),
      });

      const res: ResponseProp = sendReq.data;

      if (res.success) {
        setResult(`${window.location.origin}/${res.newLink.shortCode}`);
      }
    } catch (e: any) {
      console.error("Error occured:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const onCopyHandle = async () => {
    await navigator.clipboard.writeText(result);
    setIsCopied(true);
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center justify-center px-4 py-28">
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
        onSubmit={handleShorten}
      >
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="px-4 py-2 md:px-6 md:py-3 w-11/12 md:w-2/3 text-base md:text-lg outline-none rounded-xl shadow-lg text-black"
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
          error ? "flex" : "hidden"
        } mt-24 text-red-400 text-base md:text-xl`}
      >
        <p>{error}</p>
      </div>
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
