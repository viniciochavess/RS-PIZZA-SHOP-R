import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Routes } from './routes'
import {Toaster} from 'sonner'


export function App() {
  return (
    <HelmetProvider>
      <Toaster/>
      <Helmet titleTemplate="%s | pizza.shop" />

      <RouterProvider router={Routes} />
    </HelmetProvider>
  )
}
