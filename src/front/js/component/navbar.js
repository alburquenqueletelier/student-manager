import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-md bg-light sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand m-auto d-flex" href="/">
            Gestor de Alumnos
          </a>
		</div>
      </nav>
	);
};
