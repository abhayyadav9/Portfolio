import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import projectSlice from "./projectSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Persist config
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  project: projectSlice,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer and middleware adjustments
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Export store and persistor
export const persistor = persistStore(store);
export default store;
