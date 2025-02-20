import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { fetchItems } from "./features/menu/menuSlice";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import RegisterPage from "./pages/RegisterPage";
import StockPage from "./pages/StockPage";
import AdminRoute from "./routes/AdminRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AppDispatch } from "./store/store";
import DashboardPage from "./pages/DashboardPage";




function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchItems())
  }, [])
  
  return (
      <HashRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<h1>Home</h1>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/stock" element={<AdminRoute><StockPage/></AdminRoute>}></Route>
          <Route path="/dashboard" element={<AdminRoute><DashboardPage/></AdminRoute>}></Route>
          <Route path="/orders" element={<ProtectedRoute><OrderPage/></ProtectedRoute>}></Route>
          <Route path="*" element={<h1>Home</h1>}/>
        </Routes>
      </HashRouter>
  );
}

export default App;
