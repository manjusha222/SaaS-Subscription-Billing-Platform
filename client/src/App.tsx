import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";

{/*import MainLayout from "./layouts/MainLayout";*/}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/*<Route element={<MainLayout />}>*/}

          <Route
            path="/dashboard"
            element={
            <ProtectedRoute>
               <Dashboard />
            </ProtectedRoute>}
           
          />

          <Route
            path="/plans"
            element={
          <ProtectedRoute>
             <Plans />
          </ProtectedRoute>
          
          }
          />

          <Route
            path="/profile"
            element={
            <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
          }
          />

        

      </Routes>

    </BrowserRouter>
  );
}

export default App;