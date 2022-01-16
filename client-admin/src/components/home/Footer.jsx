import React from 'react'


function Footer() {
return(
<>
    <section className="bg-white">
    <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
            <div className="px-5 py-2">
                <p className="text-base leading-6 text-gray-500 hover:text-gray-900">Tel : 216 72 286 319 </p>
            </div>
            <div className="px-5 py-2">
                <p className="text-base leading-6 text-gray-500 hover:text-gray-900"> Fax : 216 72 285 373</p>
            </div>
        </nav>

        <p className="mt-8 text-base leading-6 text-center text-gray-400">
            © 2021 Le Record, Inc. All rights reserved.
        </p>
    </div>
    </section>
</>
)

}

export default Footer