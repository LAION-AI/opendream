import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Outlet, Route, Routes, useLocation, useNavigate } from "solid-app-router";
import { Component, createEffect, createMemo, onMount, Show } from "solid-js";

import Landing from "./pages/landing";
import Login from "./pages/login";

import Logo from "../assets/logo.svg";
import { atom } from "solid-use";
import { Sidebar } from "./components/sidebar";
import { createOnAuthStateChange, ProfileProvider, SupabaseProvider, useProfile } from "./contexts/supabase";
import Community from "./pages/space/community";
import Gallery from "./pages/space/gallery";
import Create from "./pages/space/create";
import Profile from "./pages/space/profile";
import { DataProvider } from "./contexts/data";
import { ConfigProvider } from "./contexts/config";

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
            <Route path="/community" component={Community} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/create" component={Create} />
            <Route path="/profile" component={Profile} />
          </Route>
        </Routes>
        </ConfigProvider>
        </DataProvider>
      </ProfileProvider>
    </SupabaseProvider>
  );
};

export function Space() {
  const { profile, user } = useProfile();
  const navigate = useNavigate();

  const toggle = atom(true);
  const hide = atom(false);

  createOnAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      navigate("/login");
    }
  });

  onMount(() => {
    setTimeout(() => {
      if (!user()) {
        navigate("/login");
      }
    }, 1000);
  });

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
    <Show when={user() && profile()}>
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

export default App;
