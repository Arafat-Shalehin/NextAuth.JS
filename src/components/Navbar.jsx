import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="border-b-2 py-3 text-center space-x-6">
      <Link href="/">Home</Link>
      <Link href="/public">Public</Link>
      <Link href="/private">Private</Link>
      <Link href="/admin">Admin</Link>
    </div>
  );
};

export default Navbar;
