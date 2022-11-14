import React, { useEffect } from "react";
import GM from "../../assests/img/info-img.jpg";
import RBG from "../../assests/img/contact.png";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

function Gamme() {
  /*   const swipes1 = {
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
    hidden: { x: 0, opacity: 0, transition: { duration: 1 } },
  }; */

  const swipes2 = {
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
    hidden: { x: -400, opacity: 0, transition: { duration: 1 } },
  };
  const control = useAnimation();
  //const [ref, inView] = useInView();
  const [ref2, inView2] = useInView();

  useEffect(() => {
    /*     if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    } */

    if (inView2) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView2]);

  return (
    <>
      <section className="w-full bg-white pt-7 pb-7 md:pb-24">
        <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
          <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
            <img src={GM} alt="" />
          </div>

          <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 text-blue-700 lg:text-3xl md:text-2xl">
              La Gamme
            </h2>
            <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
              Notre gamme comprend une large ligne de produits de confection,
              dont vous trouverez les détails dans ce catalogue, étignettes de
              lancements, les étiqueteuses, fer à repasser, une diversité des
              ciseaux, l’huile blanche, détacher... 
              Notre but est de vos serviret de vous satisfaire.
            </p>
            <Link to={"/catalogue"}>
              <button
                type="button"
                className=" animate-bounce flex max-w-sm bg-grad bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-600 hover:to-blue-600 focus:outline-none text-white text-2xl uppercase font-bold shadow-md rounded-lg p-2"
              >
                <div className="flex sm:flex-cols-12 gap-3">
                  <div className="col-span-1">
                    <i className="far fa-arrow-alt-circle-right"></i>
                  </div>
                  <div className=" flex col-span-2 pt-1.5">Catalogue</div>
                </div>
              </button>
            </Link>
          </div>
        </div>

        <motion.div
          ref={ref2}
          variants={swipes2}
          initial="hidden"
          animate={control}
          className="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16"
        >
          <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
              Si vous avez besoin, il suffit de nous laisser un message
            </h2>
            <p className="m-0 text-xl font-normal leading-tight border-0 border-blue-300 lg:text-3xl md:text-2xl">
              Sur notre e-mail: le.record@planet.tn
            </p>
          </div>

          <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
            <img src={RBG} alt="" />
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default Gamme;
