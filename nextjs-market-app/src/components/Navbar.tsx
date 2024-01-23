'use client'

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => setMenu(!menu);
  return (
    <nav>
      <div>
        
        <div className="flex items-center text-2xl h-14">
          <Link href="/">Logo</Link>
        </div>

        {/* sm보다 클때 */}
        <div className="text-2xl sm:hidden">
          {(menu === false) ? <button onClick={handleMenu}>+</button> : <button onClick={handleMenu}>-</button>}
        </div>
      </div>
    </nav>

  )
}

export default Navbar;