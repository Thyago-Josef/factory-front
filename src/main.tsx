import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // 1. Importe o Provider
import { store } from './app/store';    // 2. Importe a sua Store
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 3. Envolva o App com o Provider passando a store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);