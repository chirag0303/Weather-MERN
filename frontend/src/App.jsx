import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';

import Sidebar from "./components/UI/Sidebar.jsx";
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import RootLayout from './pages/Root.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Header from './components/UI/Navigation/Header.jsx';

const router = createBrowserRouter([  
  { path: '/', 
    element: <RootLayout />, 
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home />},
      { path: '/search', element: <Search /> }
    ]
  },
]);

const App = () => {
  return (
    <div className="h-screen bg-weather-teal">
      <div >
        <Header />
      </div>

      <div className="flex my-2">
        <Sidebar className="justify-start"/>
        <RouterProvider className="bg-weather-teal" router={router} />   
      </div>
    </div>
  );
}

export default App;