import {createContext} from 'react';
import Registration from './pages/Registration';
import Login from './pages/Login';
import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Store from './store/store';
import type {StoreContext} from './types/types';

const store = new Store();
export const Context = createContext<StoreContext>({
  store
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/registration",
    element: <Registration></Registration>
  },
  {
    path: "/login",
    element: <Login></Login>
  }
]);

function App() {
  return (
    <Context.Provider value={{store}}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}

export default App;
