import { Component, Show } from "solid-js";

import "./hamburger.css";

import Logo from "../assets/Scrypr-0.svg";
import polaroid from "../assets/polaroid_fun.avif";
import fire from "../assets/fire_emoji.gif";

import { atom } from "solid-use";
import { Link } from "solid-app-router";
import DropdownAvatar from "../components/dropdown";
import { useProfile } from "../contexts/supabase";

const Landing: Component<{}> = (props) => {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
};

const Navbar: Component<{}> = (props) => {
  return (
    <div class="flex items-center mx-auto px-1rem my-1rem h-2rem md:h-3rem md:px-1.4rem lg:h-4rem lg:px-2.4rem mx-auto min-w-280px sm:px-1rem justify-between max-w-1480px">
      <div class="flex h-2rem  md:h-2.4rem justify-center gap-1rem">
        {/* 
        //@ts-ignore */}
        <Logo class="h-full" />
        <div class="invisible absolute md:visible md:relative xl:display-inline md:fs-2.2rem md:lh-3rem fw-400">
          OpenDream
        </div>
      </div>
      <Hamburger />
      <DropdownAvatar />
      <Buttons />
      
    </div>
  );
};

const Hamburger: Component<{}> = (props) => {
  const open = atom(false);

  const handleClick = () => {
    open(!open());
  };

  return (
    <>
      <button
        class={`menu ${open() ? "opened" : ""} md:invisible md:absolute relative display-flex visible z-20`}
        onClick={handleClick}
      >
        <svg class="h-2rem w-2rem" viewBox="0 0 100 100">
          <path
            class="line line1"
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
          />
          <path class="line line2" d="M 20,50 H 80" />
          <path
            class="line line3"
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
          />
        </svg>
      </button>
      <Show when={open()}>
        <div class="flex flex-col w-full h-full fixed top-0 left-0 backdrop-blur-16px z-10 pt-5rem">
          <div class="flex flex-col justify-center items-center gap-1.2rem text-white px-8vw">
            <Link href="/login" class="bg-dark hover:bg-dark/80 h-3rem w-full btn">
              <span class="translate-y-0.2rem mx-auto">Sign In</span>
            </Link>
            <Link href="/signup" class="bg-[#5D48E3] h-3rem w-full btn">
              <span class="translate-y-0.2rem mx-auto">Sign Up</span>
            </Link>
          </div>
        </div>
      </Show>
    </>
  );
};

const Buttons: Component<{}> = (props) => {
  const { user } = useProfile();

  return (
    <Show when={!user()}>
    <div class="invisible absolute md:relative md:display-flex md:visible justify-center items-center gap-1.8rem text-white">
      <Link href="/login" class="bg-dark hover:bg-dark/80 h-2.4rem btn">
        <span class="translate-y-0.2rem">Sign In</span>
      </Link>
      <Link href="/signup" class="bg-[#5D48E3] h-2.4rem btn">
        <span class="translate-y-0.2rem">Sign Up</span>
      </Link>
    </div>
    </Show>
  );
};

const Hero: Component<{}> = (props) => {
  return (
    <main class="lg:relative">
      <div class="flex flex-col px-1rem mx-auto max-w-1280px text-center py-6rem md:py-8rem lg:py-12rem xl:py-14rem lg:px-2.4rem lg:text-left justify-center lg:flex-row">
        <div class="flex flex-col mx-auto md:w-1/2 lg:w-3/5">
          <div class="font-bold fs-2rem lh-2rem md:fs-2.2rem md:lh-2.2rem lg:fs-2.2rem lg:lh-2.2rem xl:fs-2.7rem xl:lh-2.8rem">
            <div class="flex justify-center lg:justify-start items-center">
            <div class="">Create without limits</div>
            <img class="h-3rem w-3rem -translate-y-1.2rem" src={fire} />
            </div>
            <div class=" text-blue">powered by Selas API</div>
          </div>
          <div class="fs-1.2rem px-8vw lh-1.1rem md:fs-1.2rem md:px-0 lg:fs-1.2rem xl:fs-1.4rem mt-3 text-gray-500 xl:max-w-36rem xl:lh-1.5rem">
            OpenDream is an image generation tool powered by artificial intelligence. It is capable of transforming your
            ideas into unique and original images. No need to be an expert in graphic techniques, only your ideas
            matter!
          </div>
        </div>
        <div class="flex shrink-1 scale-70 -translate-y-1rem md:-translate-y-3rem md:scale-80 lg:scale-90 xl:scale-100 lg:-translate-y-10rem xl:-translate-y-10rem">
          <img class="flex object-cover" src={polaroid} alt="" />
        </div>
      </div>
    </main>
  );
};

export default Landing;
