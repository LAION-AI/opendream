// @ts-nocheck
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  closestCenter,
} from "@thisbeyond/solid-dnd";
import { createEffect, createMemo, createSignal, For, Switch } from "solid-js";

import "solid-slider/slider.css";
import { Slider, createSlider, SliderProvider, SliderButton } from "solid-slider";
import { useConfig } from "../contexts/config";

const InitCard = () => {
  const sortable = createSortable(2);
  return (
    <>
      <h3 class="text-lg text-center font-medium leading-6 text-gray-900 pb-1rem">Starting Image</h3>
      <div class="aspect-ratio-square cursor-pointer relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blu focus:ring-offset-2 "></div>
    </>
  );
};

const DiffusionCard = () => {
  const sortable = createSortable(3);
  return (
    <>
      <h3 class="text-lg text-center font-medium leading-6 text-gray-900 pb-1rem">Diffusion Parameters</h3>
      <div class="aspect-ratio-square cursor-pointer relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blu focus:ring-offset-2 "></div>
    </>
  );
};

const FormatCard = () => {
  const sortable = createSortable(1);
  const { diffusionConfig } = useConfig();
  const options = { loop: true };
  const [slider, { current, next, prev, moveTo }] = createSlider(options);

  enum Size {
    square,
    landscape,
    portrait,
  }

  // const width = createMemo(() => {
  //   Size[current()] == "landscape" ? "768" : "512";
  // });
  // const height = createMemo(() => {
  //   Size[current()] == "landscape" ? "768" : "512";
  // });

  createEffect(() => {
    const currentConfig = diffusionConfig();
    currentConfig.width = Size[current()] == "landscape" ? "768" : "512";
    currentConfig.height = Size[current()] == "portrait" ? "768" : "512";

    console.log(currentConfig);
    diffusionConfig(currentConfig);
  });


  return (
    <>
      <SliderProvider>
        <h3 class="text-lg text-center font-medium leading-6 text-gray-900 p-1rem">Image Format</h3>
        <div class="flex align-items-middle">
          <div
            onClick={() => prev()}
            class="i-bxs:chevron-left transition self-center fs-1.6rem hover:color-blu hover:shadow-xl hover:scale-140 cursor-pointer"
          />
          <div use:slider class="fs-0.4rem scale-90">
            <div class="aspect-square relative">
              <div class="flex absolute top-50% left-50% -translate-x-4rem -translate-y-4rem aspect-square bg-blu rounded-4px h-8rem color-white font-mono justify-center shadow-xl">
                <div class="my-auto font-bold fs-0.8rem">Square</div>{" "}
              </div>
            </div>
            <div class="aspect-square relative">
              <div class="flex absolute top-50% left-50% -translate-x-5.5rem -translate-y-4rem aspect-4/3 bg-blu rounded-4px h-8rem color-white font-mono justify-center shadow-xl">
                <div class="my-auto font-bold fs-0.8rem">Landscape</div>{" "}
              </div>
            </div>
            <div class="aspect-square relative">
              <div class="flex absolute top-50% left-50% -translate-x-3rem -translate-y-4rem aspect-3/4 bg-blu rounded-4px h-8rem color-white font-mono justify-center shadow-xl">
                <div class="my-auto font-bold fs-0.8rem">Portrait</div>{" "}
              </div>
            </div>
          </div>
          <div
            onClick={() => next()}
            class="i-bxs:chevron-right transition self-center fs-1.6rem hover:color-blu hover:shadow-xl hover:scale-140 cursor-pointer"
          />
        </div>
      </SliderProvider>
    </>
  );
};

const Sortable = (props) => {
  const sortable = createSortable(props.item);

  return (
    <div
      use:sortable
      class="flex flex flex-col justify-center bg-white p-1.4rem h-280px aspect-square rounded-12px hover:shadow-2xl hover:shadow-dark/20 transition"
      classList={{ "opacity-35": sortable.isActiveDraggable }}
    >
      <Switch>
        <Match when={props.item === 1}>
          <FormatCard />
        </Match>
        <Match when={props.item === 2}>
          <InitCard />
        </Match>
      </Switch>
    </div>
  );
};

export const DND = () => {
  const [items, setItems] = createSignal([1, 2]);
  const [activeItem, setActiveItem] = createSignal(null);
  const ids = () => items();

  const onDragStart = ({ draggable }) => setActiveItem(draggable.id);

  const onDragEnd = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currentItems = ids();
      const fromIndex = currentItems.indexOf(draggable.id);
      const toIndex = currentItems.indexOf(droppable.id);
      if (fromIndex !== toIndex) {
        const updatedItems = currentItems.slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        setItems(updatedItems);
      }
    }
    setActiveItem(null);
  };

  return (
    <DragDropProvider onDragStart={onDragStart} onDragEnd={onDragEnd} collisionDetector={closestCenter}>
      <DragDropSensors />
      <div class="flex-wrap flex gap-1rem">
        <SortableProvider ids={ids()}>
          <For each={items()}>{(item) => <Sortable item={item} />}</For>

          <div
            class={`group flex justify-center items-center relative cursor-pointer h-280px w-280px block rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2`}
          >
            <div class="i-bx:plus h-5rem w-5rem color-gray-300 group-hover:color-blu/70" />
          </div>
        </SortableProvider>
      </div>
      <DragOverlay>
        <div class="flex h-80px aspect-square hidden"></div>
      </DragOverlay>
    </DragDropProvider>
  );
};
