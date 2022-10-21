import { Link, useNavigate } from "solid-app-router";
import { Component } from "solid-js";
import { atom } from "solid-use";

import Logo from "../assets/Scrypr-0.svg";

import PasswordInput from "../components/passwordInput";
import { createSupabase } from "../contexts/supabase";

const Login: Component<{}> = (props) => {
    const supabase = createSupabase();
    const email = atom("");
    const password = atom("");
    const navigate = useNavigate();
  
    const handleSignin = async (e: Event) => {
      e.preventDefault();
      
  
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email(),
        password: password(),
      });
  
      if (error) {
        alert(console.log(error));
      } else {
        alert("Login successful!");
        navigate("/space/create");
      }
    };
  
    return (
      <div>
        <div class="flex flex-col gap-1rem mx-auto text-center items-center pt-2rem lg:pt-5rem xl:pt-6rem px-0.4rem">
          <Link href="/">
            {/* 
          // @ts-ignore */}
            <Logo class="h-4rem fill-blue mx-auto animated hover:animate-spin cursor-pointer" />
          </Link>
          <h1 class="font-bold fs-2.2rem md:fs-2.2rem pt-1rem lh-2.4rem">Login to Scrypr</h1>
          <div class="-mt-0.8rem max-w-28rem lh-1.2rem">Now begins your amazing creative journey with AI. Don't yet have an account? <a href="/signup" class="color-blue hover:color-blue/80" > Register now</a> and get free credits!</div>
        </div>
        <form
          onSubmit={handleSignin}
          class="flex flex-col gap-1.8rem md:gap-2rem bg-white md:rounded-lg max-w-28rem mx-auto px-2rem md:px-3.2rem py-3.2rem my-3rem"
        >
          <div>
            <label>Email</label>
            <input
              type="email"
              onInput={(e) => email(e.currentTarget.value)}
              class="input border-blue/60 focus:border-blue pb-1 h-48px"
            />
          </div>
          <PasswordInput password={password} />
          <div class="flex justify-between">
            <div class="flex justify-center gap-0.4rem">
              <input type="checkbox" />
              <div class="self-center translate-y-1px invisible absolute sm:visible sm:relative">Remember me</div>
            </div>
            <div class="text-blue hover:text-blue/80 cursor-pointer">Forgot your password?</div>
          </div>
          <button class="btn bg-blu h-3rem">
            <div class="mx-auto translate-y-2px">Sign In</div>
          </button>
        </form>
      </div>
    );
  };
  

export default Login;
