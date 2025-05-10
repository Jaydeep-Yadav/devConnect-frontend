import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Components/Body.jsx";
import Login from "./Components/Login.jsx";
import Profile from "./Components/Profile.jsx";
import appStore from "./utils/appStore.js";
import { Provider } from "react-redux";
import Feed from "./Components/Feed.jsx";
import Requests from "./Components/Requests.jsx";
import Connections from "./Components/Connections.jsx";
import PublicRoute from "./Components/PublicRoute.jsx";
import NotFound from "./Components/NotFound.jsx";
import Chat from "./Components/Chat.jsx";
import Logout from "./Components/Logout.jsx";
import LandingPage from "./Components/LandingPage.jsx";

function App() {

  return (
    <>
      <Provider store={appStore}>

        <BrowserRouter basename="/">

          <Routes>

            <Route path="/" element={<Body />}>
              <Route path="/" element={<PublicRoute> <LandingPage /> </PublicRoute>} />
              <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<NotFound />}/>
            </Route>

          </Routes>

        </BrowserRouter>
        
      </Provider>
    </>
  );
}

export default App;
