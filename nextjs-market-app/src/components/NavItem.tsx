import { User } from '@prisma/client';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'

interface NavItemProps {
  mobile?: boolean;
  currentUser?: User | null;
}
const NavItem = ({ mobile, currentUser }: NavItemProps) => {
  return (
    <ul
      className={`text-md justify-center flex gap-4 w-full items-center ${
        mobile && "flex-col h-full"
      }`}
    >
      {currentUser?.userType === "Admin" && (
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <Link href="/admin">Admin</Link>
        </li>
      )}
      {currentUser?.userType === "User" && (
      <>
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <Link href="/user">{currentUser?.name}님</Link>
        </li>
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <Link href="/chat">채팅</Link>
        </li>
      </>
      )} 
      {currentUser ? (
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
};

export default NavItem