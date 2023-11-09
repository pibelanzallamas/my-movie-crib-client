import React from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Pelicula from "./components/Pelicula";
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./components/User";
import Search from "./components/Search";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/:page"} element={<Home />} />
        <Route path={"movies/search/:id"} element={<Pelicula />} />
        <Route path={"movies/:name"} element={<Search />} />
        <Route path={"users/register"} element={<Register />} />
        <Route path={"users/login"} element={<Login />} />
        <Route path={"users/:id"} element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
