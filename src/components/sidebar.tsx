import { Component, createEffect, For, Show } from "solid-js";

import Logo from "../assets/Scrypr-0.svg";
import { Atom, atom } from "solid-use";
import { Session } from "@supabase/supabase-js";
import { Link, NavLink, useLocation } from "solid-app-router";
import HashAvatar from "./avatar";
import { createSupabaseAuth, useProfile } from "../contexts/supabase";

export const Sidebar: Component<{ toggle: Atom<boolean> }> = (props) => {
  const { user, profile } = useProfile();
  const auth = createSupabaseAuth();
  const hide = atom(true);

  const handleLogout = () => {
    auth.signOut();
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
    <Show when={!hide()}>
      <div
        class={`fixed top-0 left-0 w-screen z-20 bg-white sm:static sm:max-w-18rem px-4% py-2vh flex color-dark/90 flex-col justify-between h-screen align-items-center animated ${
          props.toggle() ? "animate-slide-in-left" : "animate-slide-out-left"
        } animated-faster`}
      >
        {/* Logo */}
        <div class="flex w-full justify-between sm:justify-center">
          <Link href="/">
            <div class="flex gap-1rem color-dark/90">
              {/* 
          // @ts-ignore */}
              <Logo class="h-2.6rem" />
              <span class="fs-2.2rem">SCRYPR</span>
            </div>
          </Link>
          <Show when={props.toggle()}>
            <button onClick={() => props.toggle(false)} class="i-bxs:arrow-from-right h-2rem min-w-2rem sm-hidden" />
          </Show>
        </div>

        {/* Avatar and username + company */}
        <div>
          <Link href="/space/profile">
            <div class="rounded-full overflow-clip w-86px h-86px my-1rem mx-auto cursor-pointer hover:ring-blu/80 hover:ring-4px transition">
              <HashAvatar name={user().id} height={86} width={86} radius={4} />
            </div>
          </Link>
          <div class="text-center fw-400 fs-1.3rem mt-1.2rem">
            {profile().fullname ? profile().fullname : user().email}
          </div>
          <div class="text-center fw-500 fs-1.3rem color-text -mt-8px">{profile().organization}</div>
          <div class="flex justify-center fs-1.2rem gap-0.4rem mt-0.4rem">
            <div class="i-bxs:coin translate-y-2px"></div>
            <span>10.000</span>
          </div>
        </div>

        {/* Sidebar Menu*/}
        <div class="flex flex-col gap-1rem max-w-18rem color-dark/90">
          <SidebarItem title="Create" icon="i-bxs:palette" />
          <SidebarItem title="Gallery" icon="i-bxs:image" />
          <SidebarItem title="Community" icon="i-bxs:planet" />

          <SidebarItem title="Profile" icon="i-bxs:face" />
        </div>

        {/* Logout button */}
        <button class="flex gap-6px text-1.2rem hover:color-red -translate-x-1rem" onClick={handleLogout}>
          <div class="i-bx:exit translate-y-3px"></div>
          <span class="">Logout</span>
        </button>
      </div>
    </Show>
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
        <div class={`${props.icon} self-center mr-1rem -translate-y-1px fs-1.8rem`}></div>
        {props.title}
      </div>
    </NavLink>
  );
};
