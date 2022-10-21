import logo_black from "../assets/Scrypr-0.svg";
import polaroid from "../assets/polaroid.avif";
import { Component } from "solid-js";


const Maintenance: Component<{}> = (props) => {
    return (
      <div>
        <div class="flex h-35px justify-center gap-1rem my-24px">
          <img class="h-42px" src={logo_black}></img>
          <div class="fs-2.2rem fw-400">SCRYPR</div>
        </div>
        <main class="lg:relative">
          <div class="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
            <div class="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
              <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span class="block xl:inline">Currently under maintenance 🛠️</span>
                <span class="block text-indigo-600 xl:inline"></span>
              </h1>
              <p class="mx-auto max-h-612px max-w-612px mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                {" "}
                We are currently working on the new version of Srypr. Be ready for a new sleek and blazingly fast ⚡
                Scrypr. We will be back soon!
              </p>
            </div>
          </div>
          <div class="relative h-28rem scale-85 -translate-y-8rem w-full sm:h-28rem sm:-translate-y-7rem md:h-42rem lg:translate-y-0 lg:scale-100 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
            <img class="absolute inset-0 h-full w-full lg:max-w-612px object-cover" src={polaroid} alt="" />
          </div>
        </main>
      </div>
    );
  };

export default Maintenance;