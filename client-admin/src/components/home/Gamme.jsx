import React from 'react'
import GM from '../../assests/img/info-img.jpg'
import RBG from '../../assests/img/MoyR.png'


function Gamme() {
return(
<>

<section class="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
    <div class="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">

       
        <div class="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
           <img src={GM} />
        </div>

      
        <div class="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
            <h2 class="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 text-blue-700 lg:text-3xl md:text-2xl">
                La Gamme
            </h2>
            <p class="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
            Notre gamme comprends une large ligne de produits de confection ,dont vous trouverez les détails dans ce catalogue, étignettes de lancements, les étigueteuses, fer à repasser, une diversité des ciseaux, l’huile blanche, détacher... Notre but est de vous servir et de vous satisfaire.            </p>
        </div>
        
    </div>
    <div class="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16">

        
        <div class="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
            <h2 class="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                Si vous avez besoin, il suffit de nous laisser un message
            </h2>
            <p class="m-0 text-xl font-normal leading-tight border-0 border-blue-300 lg:text-3xl md:text-2xl">
                Sur notre e-mail: le.record@planet.tn
            </p>
        </div>

        <div class="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
            <img src={RBG} />
        </div>
    </div>
</section>


</>

)}

export default Gamme