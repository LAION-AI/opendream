


import Monkey from "../assets/monkey_surprised.svg";
import MonkeyHappy from "../assets/monkey_happy.svg";
import MonkeyHands from "../assets/monkey_hands.svg";
import { Component } from "solid-js";
import { atom, Atom } from "solid-use";

const PasswordInput: Component<{ password: Atom<string> }> = (props) => {
    const showPassword = atom(false);
  
    return (
      <div class="relative">
        <label>Password</label>
        <input
          type={showPassword() ? "text" : "password"}
          onInput={(e) => props.password(e.currentTarget.value)}
          class="input input border-blue/60 focus:border-blue pb-1 h-48px"
        />
        <div onClick={() => showPassword(!showPassword())} class="cursor-pointer">
          <Show when={showPassword()} fallback={<Monkey class="absolute top-1/2 -translate-y-0.3rem right-0.4rem h-2rem" />}>
            <MonkeyHappy class="absolute top-1/2 -translate-y-0.3rem right-0.4rem h-2rem" />
          </Show>
          <MonkeyHands
            class={`absolute top-1/2 right-0.4rem h-1.6rem ${
              showPassword()
                ? "animated animate-fade-out-down animated-faster"
                : "animated animate-fade-in-up animated-faster"
            }`}
          />
        </div>
      </div>
    );
  };
  

export default PasswordInput;