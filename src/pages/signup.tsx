import { Link } from "solid-app-router";
import { Component, Show } from "solid-js";
import { Atom, atom } from "solid-use";

import Logo from "../assets/Scrypr-0.svg";
import PasswordInput from "../components/passwordInput";
import { createSupabase } from "../contexts/supabase";


const Signup: Component<{}> = (props) => {
  const supabase = createSupabase();
  const email = atom("");
  const password = atom("");

  const handleSignup = async (e: Event) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email(),
      password: password(),
    });

    if (error) {
      alert(console.log(error));
    } else {
      alert("Check your email for the confirmation link!");
    }
  };

  return (
    <div>
      <div class="flex flex-col gap-1rem mx-auto text-center items-center pt-2rem lg:pt-8rem px-0.4rem">
        <Link href="/">
          {/* 
          // @ts-ignore */}
          <Logo class="h-4rem fill-blue mx-auto animated hover:animate-spin cursor-pointer" />
        </Link>
        <h1 class="font-bold fs-2.2rem md:fs-2.2rem pt-1rem lh-2rem">Register to Scrypr</h1>
        <div class="-mt-1rem">get some free credits to start your amazing journey 🌈</div>
      </div>
      <form
        onSubmit={handleSignup}
        class="flex flex-col gap-1.8rem md:gap-2rem bg-white md:rounded-lg max-w-28rem mx-auto px-2rem md:px-3.2rem py-2.8rem my-3rem"
      >        <div>
          <label>Email</label>
          <input
            type="email"
            onInput={(e) => email(e.currentTarget.value)}
            class="input border-blue/60 focus:border-blue pb-1 h-48px"
          />
        </div>
        <PasswordInput password={password} />
        
        <button class="btn bg-blu h-3rem">
          <div class="mx-auto translate-y-2px">Sign up</div>
        </button>
      </form>
    </div>
  );
};


export default Signup;
