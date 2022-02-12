import { Route } from "react-router-dom";
import Join from "./components/Join/join";
import Chat from "./components/Chat/chat";
import ProtectedRoute from "./ProtectedRoute";
import "./styles.css";
import { useState } from "react";

export default function App() {
  const [loginState, setLoginState] = useState(0);
  return (
    <>
      <Route exact path="/">
        <Join setLoginState={setLoginState} />
      </Route>
      <ProtectedRoute path="/chat" isAuth={loginState} component={Chat} />
    </>
  );
}
