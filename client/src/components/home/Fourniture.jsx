import React from "react";

function Fourniture() {
  return (
    <>
      <section className="sm:py-16 bg-white">
        <div className="max-w-7xl px-10 mx-auto sm:text-center">
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mt-3 text-blue-700">
            Nos fournitures de confection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 my-12 sm:my-16">
            <div className="rounded-lg py-6 flex flex-col items-center justify-center shadow-lg border border-gray-100">
              <p className="font-bold mt-4">Les coupe-passants</p>
            </div>
            <div className="rounded-lg py-6 flex flex-col items-center justify-center shadow-lg border border-gray-100">
              <p className="font-bold mt-4">Ciseaux et accesoires</p>
            </div>
            <div className="rounded-lg py-6 flex flex-col items-center justify-center shadow-lg border border-gray-100">
              <p className="font-bold mt-4">Instruments de mesure</p>
            </div>
            <div className="rounded-lg py-6 flex flex-col items-center justify-center shadow-lg border border-gray-100">
              <p className="font-bold mt-4">Stylos de marquages et crayons</p>
            </div>
            <div className="rounded-lg py-6 flex flex-col items-center justify-center shadow-lg border border-gray-100">
              <p className="font-bold mt-4">Agrafes et Agrafeuses</p>
            </div>
            <div className="rounded-lg py-6 flex flex-col items-center justify-center shadow-lg border border-gray-100">
              <p className="font-bold mt-4">Etiqueteuse et etiquettes</p>
            </div>
            <div className="rounded-lg py-6 flex flex-col items-center justify-center shadow-lg border border-gray-100">
              <p className="font-bold mt-4">Détachage et lubrifiants</p>
            </div>
            <div className="rounded-lg py-6 flex flex-col items-center justify-center shadow-lg border border-gray-100">
              <p className="font-bold mt-4">Pistolet et attaches</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Fourniture;
