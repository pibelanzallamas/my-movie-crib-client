import React from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";
import "../styles/Login.css";

function Login() {
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogIn(e) {
    e.preventDefault();
    axios
      .post("/api/users/login", {
        email: email.value,
        password: password.value,
      })
      .then((payload) => {
        dispatch(setUser(payload.data));
        alert(`Bienvenido ${payload.data.name}!`);
        navigate("/1");
      })
      .catch(() => alert("Datos incorrectos!"));
  }

  return (
    <div>
      <form onSubmit={handleLogIn}>
        <h3 className="titulo">Ingresar</h3>
        <div className="form">
          <input
            {...email}
            className="input-form"
            type="email"
            placeholder="Email"
          />
          <input
            {...password}
            className="input-form"
            type="password"
            placeholder="Password"
          />
          <button className="button is-primary">Enviar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
