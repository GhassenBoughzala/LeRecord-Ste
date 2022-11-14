import React, { useEffect } from "react";
import SIL from "../../assests/img/Spa.png";
import M from "../../assests/img/M.png";
import AV from "../../assests/img/av.png";
import EM from "../../assests/img/em.png";
import ALGO from "../../assests/img/algo.png";
import EA from "../../assests/img/ea.jpg";
import FR from "../../assests/img/fr.png";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Fournisseur() {
  const swipes1 = {
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
    hidden: { x: 0, opacity: 0, transition: { duration: 1 } },
  };

  const swipes2 = {
    visible: { x: 0, opacity: 1, transition: { duration: 2.5 } },
    hidden: { x: 0, opacity: 0, transition: { duration: 2.5 } },
  };
  const control = useAnimation();
  const [ref, inView] = useInView();
  const [ref2, inView2] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }

    if (inView2) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView, inView2]);
  return (
    <>
      <section className="w-full py-12 overflow-hidden bg-white relative">
        <div className="w-1/2 h-full bg-gray-50 md:block hidden absolute transform -translate-x-64 left-0 top-0"></div>
        <div className="w-1/2 h-full bg-gray-50 md:block hidden absolute transform -translate-x-24 left-0 top-0"></div>
        <div className="max-w-6xl relative mx-auto flex sm:px-0 px-10 flex-col items-start sm:items-center justify-center">
          <h2 className="text-4xl font-semibold tracking-tight text-blue-700 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
            Nos fournisseurs
          </h2>
          <motion.div
            ref={ref}
            variants={swipes1}
            initial="hidden"
            animate={control}
          >
            <p className="text-gray-600 text-lg text-left sm:text-center max-w-lg mt-5">
              Ces fournisseurs ont été choisis en raison de leur apport en
              matière de qualité et de garantie des produits ainsi que le bon
              rapport qualité et prix. Nous fournissons les accessoires de chez
              de grandes marques à l’échelle internationale, telles que :
              «Meto», «Argo», «Anker-Tex», «Lyra» de l’Allemagne,
              «Stiratecnica», «Siliconi Commerciale», «Printex», de l’Italie,
              «Avery Dennison», de l’Angleterre...
            </p>
          </motion.div>

          <motion.div
            ref={ref2}
            variants={swipes2}
            initial="hidden"
            animate={control}
            className="flex flex-wrap justify-start sm:grid sm:grid-cols-1 lg:grid-cols-7 gap-6 mt-8"
          >
            <div className="h-20 w-20 min-w-30 min-h-20 bg-white flex items-center justify-center mx-6">
              <img src={SIL} alt="" />
            </div>
            <div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="h-20 w-30 min-w-30 min-h-20 bg-white flex items-center justify-center"
            >
              <img src={ALGO} alt="" />
            </div>
            <div className="h-20 w-30 min-w-30 min-h-20 bg-white flex items-center justify-center">
              <img src={M} alt="" />
            </div>
            <div className="h-20 w-30 min-w-30 min-h-20 bg-white flex items-center justify-center">
              <img src={EA} alt="" />
            </div>
            <div className="h-20 w-30 min-w-30 min-h-20 bg-white flex items-center justify-center">
              <img src={AV} alt="" />
            </div>
            <div className="h-20 w-20 min-w-20 min-h-20 bg-white flex items-center justify-center mx-6">
              <img src={FR} alt="" />
            </div>
            <div className="h-20 w-30 min-w-30 min-h-20 bg-white flex items-center justify-center">
              <img src={EM} alt="" />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Fournisseur;
