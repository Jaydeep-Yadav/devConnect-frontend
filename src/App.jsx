import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Components/Body.jsx";
import Login from "./Components/Login.jsx";
import Profile from "./Components/Profile.jsx";
import appStore from "./utils/appStore.js";
import { Provider } from "react-redux";
import Feed from "./Components/Feed.jsx";
import Requests from "./Components/Requests.jsx";
import Connections from "./Components/Connections.jsx";
import NotFound from "./Components/NotFound.jsx";
import Chat from "./Components/Chat.jsx";
import Logout from "./Components/Logout.jsx";
import LandingPage from "./Components/LandingPage.jsx";
import Signup from "./Components/Signup.jsx"
import EmailVerification from "./Components/EmailVerification.jsx";
import ResetPassword from "./Components/ResetPassword.jsx";
import ForgotPassword from "./Components/ForgotPassword.jsx";
import ChangePassword from "./Components/ChangePassword.jsx"
import { Toaster } from "react-hot-toast";
import { RedirectAuthenticatedUser } from "./Components/RouteTypes.jsx";

function App() {

  return (
    <>
      <div><Toaster /></div>
      <Provider store={appStore}>

        <BrowserRouter basename="/">

          <Routes>

            <Route path="/" element={<Body />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<RedirectAuthenticatedUser> <Login /> </RedirectAuthenticatedUser>} />
              <Route path="/signup" element={<RedirectAuthenticatedUser> <Signup /> </RedirectAuthenticatedUser>} />
              <Route path="/verify" element={<RedirectAuthenticatedUser> <EmailVerification /> </RedirectAuthenticatedUser>} />
              <Route path="/forgot-password" element={<RedirectAuthenticatedUser> <ForgotPassword /> </RedirectAuthenticatedUser>} />

              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/logout" element={<Logout />} />

              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/reset-password/:token" element={<ResetPassword />} />


          </Routes>

        </BrowserRouter>

      </Provider>
    </>
  );
}

export default App;
