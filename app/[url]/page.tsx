"use client";

import Spinner from "@/components/Spinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RedirectingPage = ({ params }: { params: { url: string } }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function handleUrlChange() {
      setLoading(true);
      try {
        const sendReq = await axios.get(`/api/${params.url}`);
        const res = sendReq.data;

        if (res.success) {
          setResult(`Redirecting to ${res.url.originalUrl}...`);
          setTimeout(() => {
            router.push(res.url.originalUrl);
          }, 2000);
        } else {
          setError("Failed to retrieve URL");
        }
      } catch (e: any) {
        console.error(e);
        setError(e.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
    handleUrlChange();
  }, [params.url, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="">
      {error ? (
        <p className="text-lg text-red-400">Error occurred: {error}</p>
      ) : (
        <h1 className="text-lg text-white">{result}</h1>
      )}
    </div>
  );
};

export default RedirectingPage;
