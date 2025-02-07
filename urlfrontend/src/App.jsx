import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import QrCode from "./components/QrCode";
import LinkPage from "./components/LinkPage";
import Analytics from "./components/Analytics";
import SignIn from "./components/Auth/SignIn";
import Home from "./components/Home";
import Create from "./components/Create";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import UserQrCodes from "./components/UserQrCodes";

const App = () => {
  return (


      <BrowserRouter>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />

        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />


          <Route path='/create' element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>}
          />
          <Route path='/home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>}
          />
          <Route path='/link-page/create' element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>}
          />

          <Route path='/qr-code/create' element={
            <ProtectedRoute>
              <QrCode />
            </ProtectedRoute>}
          />

          <Route path='/qr-code' element={
            <ProtectedRoute>
              <UserQrCodes />
            </ProtectedRoute>}
          />

          <Route path='/link-page' element={
            <ProtectedRoute>
              <LinkPage />
            </ProtectedRoute>}
          />
          <Route path='/analytics' element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>}
          />

        </Routes>
      </BrowserRouter>
  

  );
}
export default App;