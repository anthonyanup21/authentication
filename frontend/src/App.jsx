import React, { useEffect } from "react";
import Login from "./pages/Login";
import VerificationToken from "./pages/VerificationToken";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import PasswordChangedSuccessfully from "./pages/PasswordChangedSuccessfully";
import { Routes, Route } from "react-router";
import PasswordResetLinkSent from "./pages/PasswordResetLinkSent";
import Home from "./pages/Home";
import { useAuthStore } from "./store/authStore";
import ProtectedRoutes from "./components/ProtectedRoutes";
import RediredtAuthUser from "./components/RedirectAuthUsers"

const App = () => {
  const { checkAuth, user, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  console.log(user);
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-md "></span>
      </div>
    );
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route path="/login" element={<RediredtAuthUser><Login /></RediredtAuthUser>} />
        <Route path="/signup" element={<RediredtAuthUser><Signup /></RediredtAuthUser>} />
        <Route path="/forgot-password" element={<RediredtAuthUser><ForgotPassword /></RediredtAuthUser>} />
        <Route path="/reset-password/:id" element={<RediredtAuthUser><NewPassword /></RediredtAuthUser>} />
        <Route path="/verification" element={<RediredtAuthUser><VerificationToken /></RediredtAuthUser>} />
        <Route
          path="/password-changed"
          element={<RediredtAuthUser><PasswordChangedSuccessfully /></RediredtAuthUser>}
        />
        <Route path="/reset-link-sent" element={<RediredtAuthUser><PasswordResetLinkSent /></RediredtAuthUser>} />

      </Routes>
    </div>
  );
};

export default App;
