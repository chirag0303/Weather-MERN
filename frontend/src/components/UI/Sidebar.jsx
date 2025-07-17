import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen ] = useState(false);

  return (
    <aside className={`w-1/4 h-full px-2 py-4 bg-stone-800 md:w-72 text-stone-300 rounded-r-md
      transition-all duration-300 ease-in-out ${isOpen ? "w-64 px-4" : "w-[8px] overflow-hidden" } md:w-72`}
     onMouseEnter={() => setIsOpen(true)}
     onMouseLeave={() => setIsOpen(false)}
    >
      <div className={`transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible w-full" : "opacity-0 invisible w-0"
        } md:opacity-100 md:visible md:w-full `}
      >
        <p>Weather</p>
        <h2>Weatherzone</h2>
        <h2>Cities around the world</h2>
      </div>

    </aside>
  )
};

export default Sidebar;