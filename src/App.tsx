import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Outlet, Route, Routes, useLocation, useNavigate } from "solid-app-router";
import { Component, createEffect, createMemo, onMount, Show } from "solid-js";

import Landing from "./pages/landing";
import Login from "./pages/login";

import Logo from "../assets/logo.svg";
import { atom } from "solid-use";
import { Sidebar } from "./components/sidebar";
import { createOnAuthStateChange, ProfileProvider, SupabaseProvider, useProfile } from "./contexts/supabase";
import Gallery from "./pages/space/gallery";
import Create from "./pages/space/create";
import { DataProvider } from "./contexts/data";
import { ConfigProvider } from "./contexts/config";
import PasswordInput, { SecretPhraseInput } from "./components/passwordInput";
import Annotation from "./pages/space/annotation";
import Horde from "./pages/space/horde";

const App: Component = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

  return (
    <SupabaseProvider client={supabase}>
      <ProfileProvider>
        <DataProvider>
        <ConfigProvider>
        <Routes>
          <Route path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/space" component={Space}>
            <Route path="/gallery" component={Gallery} />
            <Route path="/create" component={Create} />
            <Route path="/annotation" component={Annotation} />
            <Route path="/horde" component={Horde} />
          </Route>
        </Routes>
        </ConfigProvider>
        </DataProvider>
      </ProfileProvider>
    </SupabaseProvider>
  );
};

export function Space() {
  const { secretPhrase } = useProfile();
  const navigate = useNavigate();

  const toggle = atom(true);
  const hide = atom(false);

  setTimeout(() => {
    if (!secretPhrase()) {
      navigate("/login");
    }
  }, 1000);



  createEffect(() => {
    if (!toggle()) {
      setTimeout(() => {
        hide(true);
      }, 500);
    } else {
      hide(false);
    }
  });

  return (
    <Show when={secretPhrase()}>
      <FirstConnectPopup />
      <div class="bg-white flex h-screen w-screen">
        <Sidebar toggle={toggle} />

        <div class="flex flex-col bg-base rounded-l-25px flex-1">
          {/* Main section content */}
          <div
            class={`flex bg-[#EEF1FF] flex-grow ${
              hide() ? "" : "rounded-l-25px"
            } overflow-y-scroll scrollbar scrollbar-rounded scrollbar-w-4px scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4 scrollbar-track-color-surface2 scrollbar-thumb-color-text/5`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </Show>
  );
}

const FirstConnectPopup: Component = () => {
  const { firstConnect } = useProfile();
  const disabled = atom(true);

  return (
    <Show when={firstConnect()}>
    <div class="flex justify-center align-items-center fixed h-screen w-screen bg-black/70 backdrop-blur z-100">
      <div class="flex flex-col justify-around bg-white rounded-12px p-1.8rem gap-1.4rem ">
        <h1 class="font-bold fs-1.4rem">Welcome to OpenDream!</h1>
        <p class="fs-1rem lh-1rem max-w-356px">OpenDream is a community gathered around the open-source project LAION. Our goal is to gather annotations to create open-source datasets. </p>
        <p class="fs-1rem lh-1rem max-w-356px">We are not collecting any data on the users, and please write down carefully your secret phrase as there is no way to get back your account if you lose it.</p>

        <SecretPhraseInput />

        <div class="flex justify-left gap-0.4rem">
              <input onClick={() => disabled(!disabled)} class="cursor-pointer" type="checkbox" />
              <div class="self-center translate-y-1px invisible absolute sm:visible sm:relative">I have written down my secret phrase</div>
        </div>

        <button onClick={() => firstConnect(false)} class="bg-blu text-white py-0.6rem rounded-12px" disabled={disabled()}>Go to OpenDream</button>

      </div>
    </div>
    </Show>
  )
}

export default App;
