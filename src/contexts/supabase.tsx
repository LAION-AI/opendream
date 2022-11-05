import { Component, createEffect, JSX } from "solid-js";
import { createContext } from "solid-js";
import type { AuthChangeEvent, Session, SupabaseClient, User } from "@supabase/supabase-js";
import { createRenderEffect, onCleanup, useContext } from "solid-js";
import { Atom, atom } from "solid-use";

export const SupabaseContext = createContext<SupabaseClient>();

interface Props {
  client: SupabaseClient;
  children?: JSX.Element;
}


const ProfileContext = createContext<{secretPhrase: Atom<string>, firstConnect: Atom<boolean>, credits: Atom<number>}>();

export function ProfileProvider(props) {
  const secretPhrase = atom<string>(localStorage.getItem("openDreamSecretPhrase"))
  const firstConnect = atom<boolean>(false);
  const credits = atom<number>(0);


  createEffect(() => {
    if (secretPhrase()) {
      localStorage.setItem("openDreamSecretPhrase", secretPhrase());
    }
    else {
      localStorage.removeItem("openDreamSecretPhrase");
    }
  })
  

  return (
      <ProfileContext.Provider value={{secretPhrase, firstConnect, credits}}>
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

