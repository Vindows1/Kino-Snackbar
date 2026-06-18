import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Getraenke} from './pages/Getraenke.tsx'
import {Snacks} from './pages/Snacks.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
// @ts-ignore
import { AuthProvider } from "./context/AuthContext.tsx";
import {Bestellung} from "./pages/Bestellung.tsx";

const router = createBrowserRouter([

        //path: '/test',
        //element: <Test/>
    {
        path: '/getraenke/all',
        element: <Getraenke/>
    },
    {
        path: '/snacks/all',
        element: <Snacks/>
    },
    {
        path: '/bestellungen/all',
        element: <Bestellung/>
    }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <RouterProvider router={router}/>
  </StrictMode>,
)
