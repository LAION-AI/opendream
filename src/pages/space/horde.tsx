import { Component, For } from "solid-js";
import { atom, Atom } from "solid-use";

const Horde: Component<{}> = (props) => {

  return (
    <div class="flex flex-col gap-1rem p-3rem max-w-1024px">
      <h1 class="fs-2rem font-bold">Coming from the Horde?</h1>
      <p class="fs-1.2rem lh-1.8rem">
        Configure your horde settings below. That way you can have kudos and credits automatically transferred to your account.
      </p>
    </div>
  );
};



export default Horde;
