import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import RegView from "../registration-view/registration-view";
import Signout from "../signout/signout.jsx";
import Error from "../error/error.jsx";
import Navbar from "../navbar/navbar";
import Genre from "../genre/genre";
import Director from "../director/director";
import Profile from "../profile/profile";

const MainView = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const Username = localStorage.getItem("user");
      axios
        .get("https://herokumovieapi.herokuapp.com/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          const allUsersAr = response.data;
          setUser(
            allUsersAr.filter((account) => account.Username === Username)[0]
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);


  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route
          path="/registration"
          element={<RegView />}
        // element={user ? <Navigate to="/movies" /> : <RegView />}
        />
        <Route
          path="/movies"
          element={
            <MovieCard />
          }
        />
        <Route
          path="/movies/:movieId"
          element={<MovieView />}
        />
        <Route
          path="/signout"
          element={<Signout />}
        />
        <Route path="/directors/:name" element={<Director />} />
        <Route path="/genres/:name" element={<Genre />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router >
  );
};
export default MainView;
