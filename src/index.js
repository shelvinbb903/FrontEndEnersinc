import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { store } from './store/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={ AppRouter } />
        </Provider>
    </React.StrictMode>
)