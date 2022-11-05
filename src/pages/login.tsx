import { Link, useNavigate } from "solid-app-router";
import { Component } from "solid-js";
import { atom } from "solid-use";

import Logo from "../assets/logo.svg";

import PasswordInput from "../components/passwordInput";
import { createSupabase, useProfile } from "../contexts/supabase";

const Login: Component<{}> = (props) => {
  const supabase = createSupabase();
  const password = atom("");
  const navigate = useNavigate();
  const { secretPhrase, firstConnect, credits } = useProfile();

  const handleSignin = async (e: Event) => {
    e.preventDefault();

    const { data, error } = await supabase.rpc("check_credits", {phrase_arg: password()});
    
    if (error) {
      alert(error.message);
    }
    else if (data===null) {
      alert("Invalid secret phrase");
    }
    else {
      secretPhrase(password());
      credits(data);
      navigate("/space/create");
    }

  };

  const handleRegister = async (e: Event) => {
    e.preventDefault();
    // const { data, error } = await supabase.from("users").insert({}).select();
    const { data, error } = await supabase.rpc("create_user");
    
    
    if (error) {
      alert(error.message);
    } else {
      secretPhrase(data);
      firstConnect(true);
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
        <h1 class="font-bold fs-2.2rem md:fs-2.2rem pt-1rem lh-2.4rem">Login to OpenDream</h1>
        <div class="-mt-0.8rem max-w-28rem lh-1.2rem">
          Now begins your amazing creative journey with AI. Don't yet have an account?{" "}
          <a onClick={handleRegister} class="color-red hover:color-red/80 cursor-pointer">
            {" "}
            Register now
          </a>{" "}
          and get free credits!
        </div>
      </div>
      <form
        onSubmit={handleSignin}
        class="flex flex-col gap-1.8rem md:gap-2rem bg-white md:rounded-lg max-w-28rem mx-auto px-2rem md:px-3.2rem py-3.2rem my-3rem"
      >
        <PasswordInput password={password} />
        <div class="flex justify-between">
          <div class="flex justify-center gap-0.4rem">
            <input type="checkbox" />
            <div class="self-center -translate-y-3px invisible absolute sm:visible sm:relative">Remember me</div>
          </div>
        </div>
        <button class="btn bg-blu h-3rem">
          <div class="mx-auto font-bold fs-1.2rem">Sign In</div>
        </button>
      </form>
    </div>
  );
};

export default Login;
