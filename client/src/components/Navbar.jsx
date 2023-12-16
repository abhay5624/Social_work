import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import { useLocal } from "../store/auth_context";
export default function Navbar() {
  const { isLoggedIn } = useLocal();
  const [Log, setLog] = useState(isLoggedIn);
  useEffect(() => {
    setLog(isLoggedIn);
  }, [isLoggedIn]);
  return (
    <>
      <div id="navbar">
        <input type="checkbox" id="toggler" />
        <label htmlFor="toggler" id="tog">
          <div id="menu">toggler</div>
          <div id="close">close</div>
        </label>

        <div id="navmenu">
          <div>
            <Link to="/home">Home</Link>
          </div>

          {!Log ? (
            <>
              <div>
                <Link to="/">Login</Link>
              </div>
              <div>
                <Link to="/signup">Sign up</Link>
              </div>
            </>
          ) : (
            <div>
              <Link to="/Logout">Logout</Link>
            </div>
          )}

          <div>
            <Link to="/signup">Kuch bhi</Link>
          </div>
          <div>
            <Link to="/Logout">Kuch bhi</Link>
          </div>
        </div>
      </div>
    </>
  );
}
