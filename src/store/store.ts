import { configureStore } from "@reduxjs/toolkit";
import menuReducer from '../features/menu/menuSlice'
import pagesReducer from '../features/pages/pagesSlice'
import usersReducer from '../features/users/usersSlice'
import loggerMiddleware from "../middlewares/logger";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    pages: pagesReducer,
    users: usersReducer
  },
  middleware: (getDefaultMiddelware) => getDefaultMiddelware().concat(loggerMiddleware)
});
export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
