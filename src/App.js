import Login from "./Component/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Register from "./Component/Register";
import Welcome from "./Component/Welcome";
import { AuthProvider } from "./Utils/Auth";
import Profile from "./Component/Profile";
import { RequireAuth } from "./Utils/RequireAuth";
import EditProfile from "./Component/EditProfile";
import Transaction from "./Component/Transaction";
import ForPass from "./Component/ForPass";
import MyNetwork from "./Component/MyNetwork";
import IndividualNetwork from "./Component/IndividualNetwork";
import Statement from "./Component/Statement";
import PasswordReset from "./Component/PasswordReset";

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />}></Route>
            {/* <Route path="register" element={<Register />} /> */}
            <Route path="forpass" element={<ForPass />} />

            <Route
              path="welcome"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="mynetworks/:id"
              element={
                <RequireAuth>
                  <MyNetwork />
                </RequireAuth>
              }
            />

            <Route
              path="mynetworks/:id"
              element={
                <RequireAuth>
                  <IndividualNetwork />
                </RequireAuth>
              }
            />

            <Route
              path="editprofile/:id"
              element={
                <RequireAuth>
                  <EditProfile />
                </RequireAuth>
              }
            />

            <Route
              path="transaction"
              element={
                <RequireAuth>
                  <Transaction />
                </RequireAuth>
              }
            />
            <Route
              path="statement"
              element={
                <RequireAuth>
                  <Statement />
                </RequireAuth>
              }
            />

            <Route
              path="Resetpasword"
              element={
                <RequireAuth>

                  <PasswordReset />

                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
