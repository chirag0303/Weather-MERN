import { useState } from 'react';
import { Menu, X } from "lucide-react";
import MainNavigation from "../MainNavigation.jsx";

import sunImg from "../../../assets/images/sunny.png";

const Header = ({ toggleSidebar }) => {
  const [menuOpen, setMenuOpen ] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  }

  const handleCloseMenu = () => {
    setMenuOpen(false);
  }

  return (
    <header className="bg-weather-teal w-full relative">
      <div className="flex items-center justify-between  px-4 py-2">
        <div className="flex items-center">
          <img src={ sunImg } alt="Sunny weather" className="w-28 h-28 mr-4" />
          <h1 className="bg-weather-teal text-teal-500 text-3xl md:text-5xl"><span className="text-amber-400">Weather</span>Link</h1>
        </div>

        {/* Hamburger Icon (Mobile only) */}
        <button onClick={handleToggleMenu} className="block md:hidden p-2 focus:outline-none">
          {menuOpen ? (
          <X className="w-10 h-10 text-white" />
          ) : (
            <Menu className="w-10 h-10 text-white" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <MainNavigation />
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <MainNavigation isMobile={true} closeMenu={handleCloseMenu} />
        </div>
      )}
  </header>
  )
}

//   return (
//     <header className="bg-weather-teal w-full">
//       {/* Top Section: Logo + Title + Hamburger */}
//       <div className="flex items-center justify-between px-4 py-2">
//         <div className="flex items-center">
//           <img src={sunImg} alt="Sunny weather" className="w-28 h-28 mr-4" />
//           <h1 className="bg-weather-teal text-teal-500 text-3xl md:text-5xl">
//             <span className="text-amber-400">Weather</span>Link
//           </h1>
//         </div>

//         {/* Hamburger Icon (Mobile only) */}
//         <button
//           onClick={handleToggleMenu}
//           className="block md:hidden p-2 focus:outline-none"
//         >
//           {menuOpen ? (
//             <X className="w-10 h-10 text-white" />
//           ) : (
//             <Menu className="w-10 h-10 text-white" />
//           )}
//         </button>

//         {/* Desktop Navigation */}
//         <div className="hidden md:block">
//           <MainNavigation />
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {menuOpen && (
//         <div className="md:hidden px-4 pb-4">
//           <MainNavigation isMobile={true} />
//         </div>
//       )}
//     </header>
//   );
// }

export default Header;