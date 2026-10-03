import {
  lazy,
  Suspense,
} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

const Login = lazy(
  () => import("../pages/Login"),
);

const Dashboard = lazy(
  () => import("../pages/Dashboard"),
);

const Users = lazy(
  () => import("../pages/Users"),
);

const Products = lazy(
  () => import("../pages/Products"),
);

const Transactions = lazy(
  () => import("../pages/Transactions"),
);

const Analytics = lazy(
  () => import("../pages/Analytics"),
);

const Settings = lazy(
  () => import("../pages/Settings"),
);

const Profile = lazy(
  () => import("../pages/Profile"),
);

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-400">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Authentication */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Protected Dashboard */}
          <Route
            element={<ProtectedRoute />}
          >
            <Route
              element={<DashboardLayout />}
            >
              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/users"
                element={<Users />}
              />

              <Route
                path="/products"
                element={<Products />}
              />

              <Route
                path="/transactions"
                element={<Transactions />}
              />

              <Route
                path="/analytics"
                element={<Analytics />}
              />

              <Route
                path="/settings"
                element={<Settings />}
              />

              <Route
                path="/profile"
                element={<Profile />}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;