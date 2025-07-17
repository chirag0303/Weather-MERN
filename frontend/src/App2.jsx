import Header from './components/UI/Navigation/Header.jsx';
import Sidebar from './components/UI/Sidebar.jsx';
import { Outlet } from 'react-router-dom';

const App2 = () => {
  return (
    <div className="flex flex-col h-screen bg-weather-teal">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="w-64 bg-gray-800 text-stone-200 min-h-screen" />
        {/* <div className="flex-1">
          Content will be handled by the router in main.jsx 
        </div> */}
        <div className="flex-1 px-3 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App2;