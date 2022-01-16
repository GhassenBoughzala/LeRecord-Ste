import React from 'react'
import SIL from '../../assests/img/Spa.png'
import M from '../../assests/img/M.png'
import AV from '../../assests/img/av.png'
import EM from '../../assests/img/em.png'
import ALGO from '../../assests/img/algo.png'
import EA from '../../assests/img/ea.png'
import FR from '../../assests/img/fr.png'

function Fournisseur() {
return(
<>
   
<section className="w-full py-16 overflow-hidden bg-white relative">
    <div className="w-1/2 h-full bg-gray-50 md:block hidden absolute transform -translate-x-64 left-0 top-0"></div>
    <div className="w-1/2 h-full bg-gray-50 md:block hidden absolute transform -translate-x-24 -skew-x-[30deg] -skew-x-12 left-0 top-0"></div>
    <div className="max-w-6xl relative mx-auto flex sm:px-0 px-10 flex-col items-start sm:items-center justify-center">
        <h2 className="text-4xl font-semibold tracking-tight text-blue-700 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">Nos fournisseurs</h2>
        <p className="text-gray-600 text-lg text-left sm:text-center max-w-lg mt-5">Ces fournisseurs ont été choisis en raison de leur apport en matière de qualité et de garantie des produits ainsi que le bon rapport qualité et prix.
        Nous fournissons les accessoirs de chez de grandes marques à l’échelle internationale, telles que : «Meto», «Argo», «Anker-Tex», «Lyra» de l’Allemagne, «Stiratecnica», «Siliconi Commerciale», «Printex», de l’Italie, «Avery Dennison», de l’Angleterre... 
        </p>
        <div className="flex flex-wrap justify-start sm:grid sm:grid-cols-4 md:grid-cols-7 gap-6 mt-8">
            <div className="h-20 w-20 bg-white rounded-2xl hover:scale-125 transition-all ease-out cursor-pointer duration-200 border border-gray-200 flex items-center justify-center">
                <img src={SIL} alt='' />
            </div>
            <div className="h-20 w-20 bg-white rounded-2xl hover:scale-125 transition-all ease-out cursor-pointer duration-200 border border-gray-200 flex items-center justify-center">
                <img src={ALGO} alt=''/>
            </div>
            <div className="h-20 w-20 bg-white rounded-2xl hover:scale-125 transition-all ease-out cursor-pointer duration-200 border border-gray-200 flex items-center justify-center">
                <img src={M} alt=''/>
            </div>
            <div className="h-20 w-20 bg-white rounded-2xl hover:scale-125 transition-all ease-out cursor-pointer duration-200 border border-gray-200 flex items-center justify-center">
                <img src={EA} alt=''/>
            </div>
            <div className="h-20 w-20 bg-white sm:translate-x-12 md:translate-x-0 rounded-2xl hover:scale-125 transition-all ease-out cursor-pointer duration-200 border border-gray-200 flex items-center justify-center">
                <img src={AV} alt=''/>
            </div>
            <div className="h-20 w-20 bg-white sm:translate-x-12 md:translate-x-0 rounded-2xl hover:scale-125 transition-all ease-out cursor-pointer duration-200 border border-gray-200 flex items-center justify-center">
                <img src={FR} alt=''/>
            </div>
            <div className="h-20 w-20 bg-white sm:translate-x-12 md:translate-x-0 rounded-2xl hover:scale-125 transition-all ease-out cursor-pointer duration-200 border border-gray-200 flex items-center justify-center">
                <img src={EM} alt=''/>
            </div>
        </div>
    </div>
</section>



</>

)

}

export default Fournisseur