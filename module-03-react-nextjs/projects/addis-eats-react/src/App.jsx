import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import DishDetail from "./pages/DishDetail";
import OrderDetail from "./pages/OrderDetail";
import RequireAuth from "./auth/RequireAuth";
import SignIn from "./auth/SignIn";

import AdminLayout from "./components/AdminLayout";
import RequireAdmin from "./components/RequireAdmin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMenu from "./pages/AdminMenu";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:dishId" element={<DishDetail />} />
        <Route path="/favorites" element={<RequireAuth requireFreshLogin><Favorites /></RequireAuth>} />
        <Route path="/orders" element={<RequireAuth requireFreshLogin><Orders /></RequireAuth>} />
        <Route path="/orders/:orderId" element={<RequireAuth><OrderDetail /></RequireAuth>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
      </Route>

      <Route path="/sign-in" element={<SignIn />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="menu" element={<AdminMenu />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;