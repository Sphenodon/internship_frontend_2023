import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { store } from "./app/store";
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from "react-query";


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: 3,
        }
    }
});

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <App />
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
