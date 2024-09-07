import Link from "next/link";
import React from "react";
import { FaGithub, FaStar } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="p-4 w-full flex gap-4 justify-end">
      <Link
        href="https://github.com/cryskram/minifyr"
        target="_blank"
        className="border-2 border-mGreen rounded-xl px-4 py-2 flex items-center gap-4 justify-center"
      >
        <FaGithub size={30} />
        <h1 className="text-xl">See the code</h1>
      </Link>
    </div>
  );
};

export default Navbar;
