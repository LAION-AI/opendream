import { Component, createEffect, For, Show } from "solid-js";

import Logo from "../assets/logo.svg";
import { Atom, atom } from "solid-use";
import { Link, Navigate, NavLink, useLocation, useNavigate } from "solid-app-router";
import HashAvatar from "./avatar";
import { useProfile } from "../contexts/supabase";

export const Sidebar: Component<{ toggle: Atom<boolean> }> = (props) => {
  const { secretPhrase, credits } = useProfile();
  const hide = atom(true);
  const navigate = useNavigate();


  const handleLogout = () => {
    secretPhrase(null);
    navigate("/");
  };

  createEffect(() => {
    if (!props.toggle()) {
      setTimeout(() => {
        hide(true);
      }, 500);
    } else {
      hide(false);
    }
  });

  return (
    <div>
      <div class="fixed top-1rem right-1rem z-60"><Hamburger open={props.toggle}/></div>
    <Show when={!hide()}>
      <div
        class={`fixed top-0 left-0 w-screen z-20 bg-white sm:static sm:max-w-18rem px-4% py-2vh flex color-dark/90 flex-col justify-between h-screen align-items-center animated ${
          props.toggle() ? "animate-slide-in-left" : "animate-slide-out-left"
        } animated-faster`}
      >
        {/* Logo */}
        <div class="flex w-full justify-between sm:justify-center">
          <Link href="/">
            <div class="flex gap-1rem color-dark/90 align-items-center">
              {/* 
          // @ts-ignore */}
              <Logo class="h-2.6rem" />
              <span class="fs-2.2rem">OpenDream</span>
            </div>
          </Link>
        </div>

        {/* Avatar and username + company */}
        <div>
          <Link href="/space/annotation">
            <div class="rounded-full overflow-clip w-86px h-86px my-1rem mx-auto cursor-pointer hover:ring-blu/80 hover:ring-4px transition">
              <HashAvatar name={"1234"} height={86} width={86} radius={4} />
            </div>
          </Link>
          <div class="flex justify-center fs-1.2rem gap-0.4rem mt-0.4rem">
            <div class="i-bxs:coin translate-y-5px"></div>
            <span>{credits()}</span>
          </div>
        </div>

        {/* Sidebar Menu*/}
        <div class="flex flex-col gap-1rem max-w-18rem color-dark/90">
          <SidebarItem title="Create" icon="i-bxs:palette" />
          <SidebarItem title="Gallery" icon="i-bxs:image" />
          <SidebarItem title="Annotation" icon="i-bxs:pencil" />
          <SidebarItem title="Horde" icon="i-game-icons:entangled-typhoon" />
        </div>

        {/* Logout button */}
        <button class="flex gap-6px text-1.2rem hover:color-red -translate-x-1rem" onClick={handleLogout}>
          <div class="i-bx:exit translate-y-3px"></div>
          <span class="">Logout</span>
        </button>
      </div>
    </Show>
    </div>
  );
};

const SidebarItem: Component<{ href?: string; title: string; icon: string }> = (props) => {
  const isHover = atom(false)

  if (!props.href) {
    props.href = props.title.toLowerCase();
  }

  return (
    <NavLink
      onMouseEnter={() => isHover(true)}
      onMouseLeave={() => isHover(false)}
      href={props.href}
      class="flex transition pl-2.8rem hover:bg-gradient-to-r hover:from-transparent hover:to-blu/20 fw-500 fs-1.2rem rounded-16px py-1rem min-w-16rem shadow-blue/80 shadow-sm hover:shadow-lg"
      activeClass="hover:shadow-none bg-blu/90 color-white"
    >
      <div class="inline-block ml-1rem translate-y-2px">
        <div class={`${props.icon} self-center mr-1rem -translate-y-4px fs-1.8rem`}></div>
        {props.title}
      </div>
    </NavLink>
  );
};

const Hamburger: Component<{open: Atom<boolean>}> = (props) => {

  const handleClick = () => {
    props.open(!props.open());
    console.log(props.open());
  };

  return (
    <>
      <button
        class={`menu ${props.open() ? "opened" : ""} relative display-flex visible z-120`}
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
    </>
  );
};
