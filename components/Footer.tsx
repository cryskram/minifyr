import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center p-4 text-white">
      <h1 className="flex items-center gap-2 text-xl">
        Made with <FaHeart className="text-red-500" /> by{" "}
        <Link
          href="https://github.com/cryskram"
          className="underline underline-offset-4"
          target="_blank"
        >
          Cryskram
        </Link>
      </h1>
    </footer>
  );
};

export default Footer;
