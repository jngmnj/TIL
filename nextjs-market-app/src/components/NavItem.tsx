import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'

const NavItem = ({mobile} : {mobile?: boolean}) => {
  const { data: session, status } = useSession();
  console.log({ session }, status);

  
  return (
    <ul
      className={`text-md justify-center flex gap-4 w-full items-center ${
        mobile && "flex-col h-full"
      }`}
    >
      {/* {session?.user?.role === "Admin" && ( */}
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <Link href="/admin">Admin</Link>
        </li>
      {/* )} */}
      {/* {session?.user?.role === "User" && ( */}
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <Link href="/user">{session?.user?.name}님</Link>
        </li>
      {/* )} */}
      {session?.user ? (
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <button onClick={() => signOut()}>Sign out</button>
        </li>
      ) : (
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <button onClick={() => signIn()}>Sign in</button>
        </li>
      )}
    </ul>
  );
}

export default NavItem