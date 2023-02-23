import {createContext} from 'react';
import Registration from './pages/Registration';
import './App.css';

import Store from './store/store';
import type {StoreContext} from './types/types';

const store = new Store();
export const Context = createContext<StoreContext>({
  store
});

function App() {
  return (
    <Context.Provider value={{store}}>
      <Registration></Registration>
    </Context.Provider>
  );
}

export default App;
