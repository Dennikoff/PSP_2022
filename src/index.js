import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

export const ThemContext = React.createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemContext.Provider value={false}>
          <App />
      </ThemContext.Provider>
  </React.StrictMode>
);

