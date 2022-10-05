import React from 'react';
import './App.css';
import {Header, Auth, Sidebar} from 'components';
import {
  Routes,
  Route,
} from "react-router-dom";
import routes from './routes'

function App() {
  return (
    <Auth>
      <Header/>
      <Sidebar/>
      <div className="bg-gray-100 w-screen h-screen">
        <Routes>
          {
            routes.map(()=>{

            })
          }

        </Routes>
      </div>

    </Auth>
  );
}

export default App;

