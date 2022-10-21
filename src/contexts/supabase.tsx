import type { Component, JSX } from "solid-js";
import { createContext } from "solid-js";
import type { AuthChangeEvent, Session, SupabaseClient, User } from "@supabase/supabase-js";
import { createRenderEffect, onCleanup, useContext } from "solid-js";
import { Atom, atom } from "solid-use";

export const SupabaseContext = createContext<SupabaseClient>();

interface Props {
  client: SupabaseClient;
  children?: JSX.Element;
}

type Profile = {
  id: string;
  fullname: string;
  avatar_url: string;
  username: string;
  organization: string;
  bio: string;
  website: string;
  email: string;
  phone: string
}

const ProfileContext = createContext<{profile: Atom<Profile>, user: Atom<User>, fetch: () => void, loading: Atom<boolean>}>();

export function ProfileProvider(props) {
  const supabase = createSupabase()
  const auth = createSupabaseAuth()
  
  const profile = atom<Profile>(null)
  const user = atom<User>(null)
  const loading = atom(true)


  const fetch = async () => {
      await supabase.from("profiles").select("*").eq("id", user().id).single().then((data) => { profile(data.data) })
      loading(false)
  }

  createOnAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      user(session.user)
      fetch()
    }
    if (event === "SIGNED_OUT") {
      user(null);
      profile(null);
    }
  })



  return (
      <ProfileContext.Provider value={{profile, user, fetch , loading}}>
          {props.children}
      </ProfileContext.Provider>
  )
}

export const useProfile = () => { return useContext(ProfileContext); }


export const SupabaseProvider: Component<Props> = (props) => {
  return <SupabaseContext.Provider value={props.client}>{props.children}</SupabaseContext.Provider>;
};

export const createSupabase = () => {
  const ctx = useContext(SupabaseContext);

  if (!ctx) throw new Error("createSupabase must be used within a SupabaseContext.Provider");

  return ctx;
};

export function createSupabaseAuth(): SupabaseClient["auth"] {
  const supabase = createSupabase();
  return supabase.auth;
}

export function createSupabaseStorage(): SupabaseClient["storage"] {
  const supabase = createSupabase();
  return supabase.storage;
}

export function createSupabaseFrom(): SupabaseClient["from"] {
  const supabase = createSupabase();
  return supabase.from;
}

type AuthChangeHandler = (event: AuthChangeEvent, session: Session | null) => void;

export function createOnAuthStateChange(callback: AuthChangeHandler): void {
  const client = createSupabase();

  const { data: authListener } = client.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });

  createRenderEffect(() => {
    client.auth.getSession().then(({ data }) => {
      if (data.session) callback("SIGNED_IN", data.session);
    });

    onCleanup(() => {
      authListener.subscription?.unsubscribe();
    });
  });

}

