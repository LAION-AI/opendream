import { Component, Show } from "solid-js";

import "./hamburger.css";

import Logo from "../assets/logo.svg";
import laion_logo from "../assets/laion_logo.png";
import fire from "../assets/fire_emoji.gif";
import blob from "../assets/blob.png";

import { atom } from "solid-use";
import { Link } from "solid-app-router";
import DropdownAvatar from "../components/dropdown";
import { useProfile } from "../contexts/supabase";
import { AnimationImage } from "../components/animation";
import { SecretPhraseInput } from "../components/passwordInput";

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
        <Logo class="h-full translate-y-7px" />
        <div class="invisible absolute md:visible md:relative xl:display-inline md:fs-2.2rem md:lh-3rem fw-800">
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
          <div class="flex flex-col justify-center items-center gap-1.2rem text-white px-8vw fw-800">
            <Link href="/login" class="bg-dark hover:bg-dark/80 h-3rem w-full btn">
              <span class="translate-y-0.2rem mx-auto">Sign In</span>
            </Link>
            <Link href="/login" class="bg-[#5D48E3] h-3rem w-full btn">
              <span class="translate-y-0.2rem mx-auto">Sign Up</span>
            </Link>
          </div>
        </div>
      </Show>
    </>
  );
};

const Buttons: Component<{}> = (props) => {
  const { secretPhrase } = useProfile();

  return (
    <Show
      when={!secretPhrase()}
      fallback={
        <div class="invisible absolute md:relative md:display-flex md:visible justify-center items-center gap-1.8rem text-white fw-800">
          <Link href="/space/create" class="bg-blu h-2.6rem btn">
            <span class="font-semibold">Go to OpenDream!</span>
          </Link>
        </div>
      }
    >
      <div class="invisible absolute md:relative md:display-flex md:visible justify-center items-center gap-1.8rem text-white fw-800">
        <Link href="/login" class="bg-blu h-2.4rem btn">
          <span class="">Log In</span>
        </Link>
      </div>
    </Show>
  );
};

const Hero: Component<{}> = (props) => {
  const { secretPhrase } = useProfile();

  return (
    <main class="lg:relative">
      <div class="flex flex-col px-1rem mx-auto max-w-1280px text-center py-2rem md:py-8rem lg:py-12rem xl:py-6rem lg:px-2.4rem lg:text-left align-middle lg:flex-row">
        <div class="flex flex-col justify-center mx-auto md:w-1/2 lg:w-3/5">
          <div class="fw-800 fs-2rem lh-2rem md:fs-2.2rem md:lh-2.2rem lg:fs-2.2rem lg:lh-2.2rem xl:fs-2.7rem xl:lh-2.8rem">
            <div class="flex justify-center lg:justify-start items-center">
              <div class="">Create without limits</div>
              <img class="h-3rem w-3rem -translate-y-0.6rem" src={fire} />
            </div>
            <div class=" text-blue">with the Open Source community</div>
          </div>
          <div class="fs-0.9rem pt-1rem font-sans px-8vw lh-1.8rem md:fs-1.2rem md:px-0 lg:fs-1.2rem xl:fs-1.2rem mt-3 text-gray-500 xl:max-w-34rem xl:lh-1.6rem">
            OpenDream is an image generation tool powered by artificial intelligence. Laion AI is giving this tool to
            the public for free in exchange for annotations.
          </div>
          <Show when={secretPhrase()}>
            <div class="py-1.2rem gap-1.8rem text-white fw-800">
              <Link href="/space/create" class="bg-blu h-2.6rem btn">
                <span class="font-medium">Start right now</span>
              </Link>
            </div>
          </Show>
        </div>
        <div class="relative -translate-y-4rem">
          <img class="absolute w-512 h-256px scale-160 top-13rem left-6rem object-fill brightness-150" src={blob} />
          <AnimationImage width={512} height={512} image={laion_logo} depth={laion_logo} speed={4} />
        </div>
      </div>
    </main>
  );
};

export default Landing;
