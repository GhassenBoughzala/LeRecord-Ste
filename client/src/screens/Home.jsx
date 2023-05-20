import React from "react";
import Container from "../components/container/container.component";
import Footer from "../components/home/Footer";
import RBG from "../assests/img/MoyR.png";
import COTU from "../assests/img/couverture-articles-01.png";
import Fournisseur from "../components/home/Fournisseur";
import Fourniture from "../components/home/Fourniture";
import Gamme from "../components/home/Gamme";
import Navbar from "../components/navbar/navbar.component";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Accueil</title>
        <meta
          name="description"
          content="LE RECORD spécialisée dans la commercialisation de fournitures de confection - Entreprises Export - Textile - Accessoires - Avenue Habib Bourguiba, Nabeul 8000"
          />
        <link rel="canonical" href="/accueil" />
      </Helmet>
      <Container>
        <Navbar />
        <br />
        <section className="w-full pb-12 antialiased bg-white">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
            className="mx-auto max-w-7xl"
          >
            <div className="container max-w-lg px-4 py-12 mx-auto text-left md:max-w-none md:text-center">
              <div className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
                <span className="inline md:block"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-500 md:inline-block">
                  <img src={RBG} alt="" />
                </span>
                <h1 className="m-0 text-xl font-semibold leading-tight lg:text-2xl md:text-2xl pt-6 text-blue-900">
                  Nous avons l’honneur de tenir cette opportunité pour nous présenter brièvement notre société
                </h1>

                <div className="m-0 text-xl font-semibold leading-tight lg:text-2xl md:text-2xl pt-6 text-blue-900">
                  Nous « Le Record », sommes spécialisé dans la commercialisation de fournitures de confection
                </div>
              </div>
            </div>
            <div className="w-full md:text-center">
              <div className="w-full overflow-hidden rounded-md sm:rounded-xl pb-12">
                <img src={COTU} alt="" />
              </div>
            </div>
          </motion.div>
        </section>

        <Fournisseur />
        <br />
        <Fourniture />
        <br />
        <Gamme />
      </Container>
      <Footer />
    </>
  );
};

export default Home;
