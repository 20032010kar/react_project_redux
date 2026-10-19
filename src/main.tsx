import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import RootLayout from './root_layout.js';
import App from './app.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './state/store.js';
import { addItem, removeItem, clearCart } from './state/cartSlice.js'; // 1. Імпортуємо екшени кошика

// === ТЕСТУВАННЯ REDUX СТОРУ В КОНСОЛІ ===
console.log("--- ПОЧАТОК ТЕСТУ REDUX ---");
console.log("1. Початковий стор:", store.getState());

// 2. Додаємо тестовий товар
store.dispatch(addItem({ id: 1, name: "Телефон", price: 10000 }));
console.log("2. Після додавання:", store.getState());

// 3. Видаляємо товар за id
store.dispatch(removeItem(1));
console.log("3. Після видалення:", store.getState());

// 4. Очищуємо кошик (викликаємо саму функцію-екшен усередині dispatch)
store.dispatch(clearCart());
console.log("4. Після очищення:", store.getState());
console.log("--- КІНЕЦЬ ТЕСТУ REDUX ---");


const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);