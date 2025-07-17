import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/hooks/use-auth.jsx';
import toast from 'react-hot-toast';

const MainNavigation = ({ isMobile = false, closeMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const activeLink = params.get("show");
  const place = params.get("place");
  const { isLoggedIn, logout } = useAuth();

  const handleClick = (event) => {
    if (event.target.innerText.toLowerCase() === "home") {
      navigate("/");
    }
  }

  return (
    <nav >
      <ul className={`flex ${isMobile ? "flex-col space-y-4" : "space-x-6"}`} >
        <li className="bg-stone-800 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              isActive && !activeLink ? "text-yellow-400 hover:bg-slate-700" : "hover:bg-slate-700"                
            }
            end 
            onClick={handleClick}
          >
            Home
          </NavLink>
        </li>

        {!isLoggedIn && (
          <>
            <li className="bg-stone-800 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
              <NavLink 
                to="/search" 
                className={({isActive}) => 
                  isActive ? "text-yellow-400 hover:bg-slate-700" : undefined
                } onClick={handleClick}
              >
                Search
              </NavLink>
            </li>

            <li className="bg-stone-800 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
              <NavLink
                //to="/?show=charts"
                to={`/location?place=${place}&show=charts`}
                className={() =>
                  activeLink === "charts" ? "text-yellow-400 hover:bg-slate-700" : "hover:bg-slate-700"
                }
              >
                Charts
              </NavLink>
            </li>
            <li className="bg-stone-800 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
              <NavLink
                //to="/?show=sevendayforecast"
                to={`/location?place=${place}&show=fivedays`}
                className={() =>
                  activeLink === "fivedays" ? "text-yellow-400 hover:bg-slate-700" : "hover:bg-slate-700"
                }
              >
                5 Days
              </NavLink>
            </li>
          </>
        )}

        {!isLoggedIn && (  
          <li className="bg-stone-800 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
            <NavLink 
              to="/login" 
              className={({isActive}) => 
                isActive ? "text-yellow-400 hover:bg-slate-700" : "hover:bg-slate-700"
              } onClick={handleClick}
            >
              Login
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li className="bg-stone-800 text-slate-200 px-4 py-2 rounded-md hover:text-yellow-700">
            <button
              onClick={() => {
                logout();
                toast("You've been logged out!");
                navigate('/');
              }}
              className="hover:text-yellow-400"
            >
              Logout
            </button>
          </li>
        )}
      </ul>

    </nav>
  )
}

export default MainNavigation;