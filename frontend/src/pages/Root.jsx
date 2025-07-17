// import { Outlet } from 'react-router-dom';
import App2 from "../App2.jsx";
// import MainNavigation from '../components/UI/MainNavigation';

const RootLayout = () => {

  return (
    <div>
      <App2 />
      {/* <MainNavigation /> */}
      {/* <main className="flex-1 p-4">
        <Outlet />
      </main> */}
     </div>
  )
}

export default RootLayout;