import { BrowserRouter, Routes, Route } from "react-router-dom"
import Body from "./Components/Body.jsx"
import Login from "./Components/Login.jsx"
import Profile from "./Components/Profile.jsx"
import appStore from "./utils/appStore.js"
import { Provider } from "react-redux"
import Feed from "./Components/Feed.jsx"
import Requests from "./Components/Requests.jsx"
import Connections from "./Components/Connections.jsx"
import PublicRoute from "./Components/PublicRoute.jsx"
import NotFound from "./Components/NotFound.jsx"

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />} >
              <Route path="/" element={<Feed />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/connections" element={<Connections />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
