import { Component, For, Show } from "solid-js";
import { atom, Atom } from "solid-use";

const Annotation: Component<{}> = (props) => {
  const currentRating = atom(null);
  const showHistory = atom(false);

  return (
    <div class="flex">
      <div class="flex flex-col gap-1rem p-3rem max-w-1024px">
        <h1 class="fs-2rem font-bold">Annotation</h1>
        <p class="fs-1.2rem lh-1.8rem">
          Please annotate the aesthetic rating of the image below on a scale from 1 to 10, where 1 is the least
          aesthetic and 10 is the most aesthetic.
        </p>
        <div class="py-3rem hover:shadow-lg rounded-12px bg-black/90 relative">
          {/* History button */}
          <div class="absolute top-1rem right-1.4rem z-20" onClick={() => showHistory(!showHistory())}>
            <div
              class={
                "color-white/80 hover:color-white i-bxs:time  cursor-pointer  fs-2rem hover:shadow-lg transition duration-500"
              }
            ></div>
          </div>
          <Show when={showHistory()}>
            <div class="flex flex-col overflow-y-scroll sexybar absolute top-0 left-0 w-full h-full bg-white/20 rounded-12px backdrop-blur p-1.3rem">
              <h2 class="font-bold fs-1.6rem text-center color-white">History</h2>
              <div class="flex flex-wrap justify-center gap-1rem mt-2rem">
                <For each={Array(100).fill(5)}>
                  {(item, index) => (
                    <div class="flex aspect-7/3 h-5rem bg-white rounded-4px ring-3px ring-blu hover:shadow-xl cursor-pointer hover:ring-white hover:ring-4px transition duration-500" onClick={()=>{showHistory(false); currentRating(5)}}>
                      <img
                        class="object-cover rounded-l-4px"
                        src="https://content3.jdmagicbox.com/comp/pali-rajasthan/a6/9999p2932.2932.180310123954.a3a6/catalogue/mahal-mubarak-resorts-pali-rajasthan-banquet-halls-hntht.jpg"
                      />
                      <div class="flex flex-1 justify-center flex-col align-items-center text-center fs-0.8rem p-1rem">
                        <p class="font-semibold fs-1.2rem text-center">5</p>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </Show>

          <img class="mx-auto" src={"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"} />
        </div>
        <div class="flex flex-wrap justify-center gap-0.6rem mx-auto" md="justify-start">
          <For each={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}>
            {(item) => <RatingButton number={item} currentRating={currentRating} />}
          </For>
        </div>
        <button class="bg-white rounded-12px font-semibold py-1rem px-5rem self-center hover:bg-white/70 hover:ring-2px hover:ring-blu transition duration-500">Submit</button>
      </div>
      {/* <HistoricBar /> */}
    </div>
  );
};

const HistoricBar: Component<{}> = (props) => {
  return (
    <div class="flex w-256px bg-white rounded-12px shadow-lg shrink">
      <div class="flex justify-center align-items-center bg-blu/60 hover:bg-blue/80 cursor-pointer">
        <div class="i-bxs:chevron-left color-white fs-1.4rem"></div>
      </div>
      <div class="">
        <h1 class="font-semibold p-1.1rem fs-1.3rem">Annotation History</h1>
      </div>
    </div>
  );
};

const RatingButton: Component<{ number: number; currentRating: Atom<number> }> = (props) => {
  return (
    <button
      class={`${
        props.currentRating() == props.number
          ? "bg-white color-text hover:bg-white/80 ring-3 ring-blu shadow-xl"
          : "bg-blu color-white hover:bg-blu/90"
      } transition duration-500 p-1rem rounded-12px font-mono font-bold px-2rem`}
      onClick={() => props.currentRating(props.number)}
    >
      {props.number}
    </button>
  );
};

export default Annotation;
