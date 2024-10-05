import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import your global styles
import { ThemeProvider } from "./contexts/ThemeContext";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./redux/store"; // Assuming this is the correct path to your store
import { persistStore } from "redux-persist"; // Correctly importing persistStore
import { AdminProvider } from "./contexts/publicViewContext";

// Create the persistor instance
const persistor = persistStore(store);

// Create the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AdminProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
        </AdminProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
