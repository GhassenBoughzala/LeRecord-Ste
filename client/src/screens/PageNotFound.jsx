import Container from "../components/container/container.component";
import React from "react";
import Navbar from "../components/navbar/navbar.component";
import { Helmet } from "react-helmet-async";
import "../components/404.css";

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>PageNotFound</title>
        <meta
          name="description"
          content="Page not found, please return to the home page"
        />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="/page-not-found" />
      </Helmet>
      <Container>
        <Navbar />
        <br />
        <div className="max-w-6xl px-12 mx-auto text-center">
          <div className="circles text-center fluid">
            <p className="text-secondary">
              404
              <br />
              <small>Page non trouvée</small>
            </p>
            <span className="circle big"></span>
            <span className="circle med"></span>
            <span className="circle small"></span>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PageNotFound;
