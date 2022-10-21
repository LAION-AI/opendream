import { Component, createEffect, For, onMount, Show, Suspense } from "solid-js";
import { createSelasClient, Job, Result, TextPrompt } from "selas";
import { Atom, atom } from "solid-use";
import { useData } from "../../contexts/data";
import { createMemo } from "solid-js";
import { createDexieArrayQuery } from "solid-dexie";
import { DND } from "../../components/options";
import { useConfig } from "../../contexts/config";

const Create: Component<{}> = (props) => {
  const selas = createSelasClient();
  const { jobs, results, addJob, addResult } = useData();

  return (
    <div class="flex flex-col w-full">
      <div class="flex flex-col gap-1.4rem pt-4rem px-2rem w-full mx-auto max-w-1248px">
        <SimplePrompt prompt={prompt} />
        <AdvancedOptions />
      </div>
      <ResultGallery />
    </div>
  );
};

const SimplePrompt: Component<{ prompt: Atom<string> }> = (props) => {
  const { diffusionConfig } = useConfig();
  const { jobs, results, addJob, addResult } = useData();
  const selas = createSelasClient();
  const prompt = atom("A cute calico cat in the grass on a beautiful day, artstation, storybook art");

  const handleNewResult = async (payload) => {
    const result: Result = payload.new;
    await addResult(result);
  };

  onMount(async () => {
    const selasEmail = import.meta.env.VITE_SELAS_EMAIL;
    const selasPassword = import.meta.env.VITE_SELAS_PASSWORD;
    await selas.signIn(selasEmail, selasPassword);
  });

  
  
  const submitJob = async (e: Event) => {
    e.preventDefault();
    const {diffusionConfig} = useConfig();

    const postJob = async () => {
      const currentConfig = diffusionConfig();

      const { data: job } = await selas.postJob({diffusion: currentConfig});

      await addJob(job);
      await selas.subscribeToResults(job.id, handleNewResult);
    };

    for (let i = 0; i < parseInt("1"); i++) postJob();
  };

  return (
    <div class="w-full">
      <div class="flex flex-col gap-0.4rem">
        <h1 class="color-dark/90 lh-0.8rem text-center lg:text-left">
          Write a detailed description of the image you want
        </h1>
        <div class="flex flex-col lg:flex-row group">
          <textarea
            placeholder="A cute calico cat in the grass on a beautiful day, artstation, storybook art"
            class="peer w-full sexybar placeholder-color-dark/30 font-mono fs-1rem lh-1rem py-1rem px-1rem rounded-t-12px lg:rounded-l-12px transition duration-500 shadow-md shadow-blu/20 focus:shadow-lg focus:shadow-blu/50 h-7rem md:h-5rem lg:h-4rem xl:h-3rem outline-none border-none resize-none"
            onInput={(e) => {
              props.prompt(e.currentTarget.value);
            }}
          />
          <button onClick={()=> null} class="flex btn bg-blu rounded-t-0 lh-1.4rem transition duration-500 fs-0.9rem md:fs-1rem lg:rounded-r-12px lg:rounded-l-0px shadow-md shadow-blu/30 peer-focus:shadow-lg peer-focus:shadow-blu/50  xl:h-3rem">
            <span class="mx-auto translate-y-1px lg:mx-0 lg:translate-y-2px">GENERATE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const AdvancedOptions: Component<{}> = (props) => {
  const show = atom(true);

  return (
    <div class="">
      <div
        onClick={() => show(!show())}
        class="flex items-center gap-0.4rem color-blue/90 font-mono fs-0.8rem cursor-pointer mb-1.4rem"
      >
        <input type="checkbox" class="cursor-pointer border-blue/" checked={show()} />
        <a class="hover:color-blue/80 cursor-pointer translate-y-px">advanced options</a>
      </div>
      
      <Show when={show()}>
      <DND />
      </Show>
    </div>
  );
};

const InitImageOptions: Component = () => {
  return (
    <div class="flex flex-col justify-center bg-white p-1rem">
      <h3 class="text-lg text-center font-medium leading-6 text-gray-900 py-0.4rem">Starting Image</h3>
      <div class="aspect-ratio-square h-12rem w-12rem cursor-pointer relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blu focus:ring-offset-2 ">
      </div>
    </div>
  );
};

const FormatOptions: Component<{}> = (props) => {
  return (
    <div class="bg-white shadow sm:rounded-lg w-1/3 sm:max-h-140px flex flex-1 max-w-350px sm:min-w-280px group relative flex-basis-12rem">
      <div class="px-4 py-5 sm:p-6 w-full">
        <h3 class="text-lg text-center font-medium leading-6 text-gray-900">Image</h3>
        {/* WIDTH */}
        <div class="flex  flex-wrap justify-center gap-1rem max-w-xl text-sm text-gray-500 py-1rem">
          <div class="flex flex-col align-items-center h-2rem max-w-128px">
            <p class="text-dark/90 fs-1.1rem translate-y-4px lh-1.1rem">width</p>
            <span class="isolate inline-flex rounded-md shadow-sm font-mono">
              <button
                type="button"
                class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue/80 focus:outline-none focus:ring-1 focus:ring-blue/80"
              >
                512
              </button>
              <button
                type="button"
                class="relative -ml-px inline-flex items-center border rounded-r-md border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue/80 focus:outline-none focus:ring-1 focus:ring-blue/80"
              >
                768
              </button>
            </span>
          </div>
          {/* HEIGHT */}
          <div class="flex flex-col align-items-center h-2rem max-w-128px">
            <p class="text-dark/90 fs-1.1rem translate-y-4px lh-1.1rem">height</p>
            <span class="isolate inline-flex rounded-md shadow-sm font-mono">
              <button
                type="button"
                class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue/80 focus:outline-none focus:ring-1 focus:ring-blue/80"
              >
                512
              </button>
              <button
                type="button"
                class="relative -ml-px inline-flex items-center border rounded-r-md border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue/80 focus:outline-none focus:ring-1 focus:ring-blue/80"
              >
                768
              </button>
            </span>
          </div>
          {/* IMAGE FORMAT */}
          {/* <SelectExtension /> */}
        </div>
      </div>
    </div>
  );
};

const JobOptions: Component<{ batchSize: Atom<string>; jobNumber: Atom<string> }> = (props) => {
  return (
    <div class="bg-white shadow sm:rounded-lg w-1/3 flex flex-2 max-w-320px min-w-220px group relative flex-basis-12rem">
      <div class="px-4 py-5 sm:p-6 w-full mx-auto">
        <h3 class="text-lg text-center font-medium leading-6 text-gray-900">Job</h3>
        <div>
          {/* BATCH SIZE */}
          <div class="flex flex-col py-1rem max-w-224px justify-center items-center mx-auto">
            <p class="text-center lh-1.8rem">Batch</p>
            <CircleNav value={props.batchSize} />
          </div>
          {/* Job SIZE */}
          <div class="flex flex-col py-1rem max-w-224px justify-center items-center mx-auto">
            <p class="text-center lh-1.8rem">Number of Jobs</p>
            <CircleNav value={props.jobNumber} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CircleNav: Component<{ value: Atom<string> }> = (props) => {
  const currentDigit = props.value;

  const Circle = (props: { digit: string; currentDigit: Atom<string>; final?: boolean }) => {
    const isActive = createMemo(() => props.digit <= props.currentDigit());

    return (
      <li
        class={`${props.final ? "" : "pr-8 sm:pr-2rem"} relative font-mono`}
        onClick={() => {
          props.currentDigit(props.digit);
        }}
      >
        <Show when={!props.final}>
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class={`h-0.24rem w-full ${isActive() ? "bg-blue/70" : "bg-gray/70"}`}></div>
          </div>
        </Show>
        <Show
          when={isActive()}
          fallback={
            <a
              href="#"
              class="relative flex h-0.8rem w-0.8rem items-center justify-center rounded-full bg-gray hover:scale-150 transition color-white"
            ></a>
          }
        >
          <a
            href="#"
            class="relative flex h-1.3rem w-1.3rem items-center justify-center rounded-full bg-blu color-white"
          >
            <span class="translate-y-2px fw-500 fs-0.9rem mx-auto">{props.digit}</span>
          </a>
        </Show>
      </li>
    );
  };

  return (
    <nav aria-label="Progress">
      <ol role="list" class="flex items-center">
        <Circle digit={"1"} currentDigit={currentDigit} />
        <Circle digit={"2"} currentDigit={currentDigit} />
        <Circle digit={"3"} currentDigit={currentDigit} />
        <Circle digit={"4"} currentDigit={currentDigit} final={true} />
      </ol>
    </nav>
  );
};

const SelectExtension: Component<{ extension: Atom<string> }> = (props) => {
  return (
    <div>
      <label id="listbox-label" class="sr-only">
        {" "}
        Change published status{" "}
      </label>
      <div class="relative">
        <div class="inline-flex divide-x divide-indigo-600 rounded-md shadow-sm">
          <div class="inline-flex divide-x divide-indigo-600 rounded-md shadow-sm">
            <div class="inline-flex items-center rounded-l-md border border-transparent bg-indigo-500 py-2 pl-3 pr-4 text-white shadow-sm">
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="ml-2.5 text-sm font-medium">Published</p>
            </div>
            <button
              type="button"
              class="inline-flex items-center rounded-l-none rounded-r-md bg-indigo-500 p-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
            >
              <span class="sr-only">Change published status</span>
              <svg
                class="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <ul
          class="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-0"
        >
          <li class="text-gray-900 cursor-default select-none p-4 text-sm" id="listbox-option-0" role="option">
            <div class="flex flex-col">
              <div class="flex justify-between">
                <p class="font-normal">Published</p>
                <span class="text-indigo-500">
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <p class="text-gray-500 mt-2">This job posting can be viewed by anyone who has the link.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const ResultGallery: Component = (props) => {
  const { results } = useData();

  return (
    <div class=" h-full w-full items-center">
      <div class="flex flex-wrap mx-auto justify-center gap-1rem  max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <For each={results.slice().reverse()}>{(result) => <ResultCard result={result} />}</For>
      </div>
    </div>
  );
};

const ResultCard: Component<{ result: Result }> = (props) => {
  const { db } = useData();

  const job = createDexieArrayQuery(() => db.jobs.where("id").equals(props.result.job_id).toArray());

  return (
    <Show when={job[0]}>
      <div class="flex flex-1 max-w-350px max-h-380px sm:max-h-380px min-w-180px sm:min-w-280px group relative flex-basis-12rem flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div class="aspect-square bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-14rem">
          <img
            src={props.result.uri}
            class="h-full w-full object-cover aspect-square object-center sm:h-full sm:w-full"
          />
        </div>
        <div class="flex flex-1 flex-col space-y-2 p-1rem">
          <h3 class="text-sm font-medium text-gray-900">
            <a href="#">
              <span aria-hidden="true" class="absolute inset-0"></span>
            </a>
          </h3>
          {/* 
        //@ts-ignore */}
          <p class="text-sm text-gray-500 lh-1rem">{job[0].config.diffusion.prompts[0].text}</p>
          <div class="flex flex-1 flex-col justify-end">
            <p class="text-sm italic text-gray-500">{job[0].config.diffusion.steps} steps</p>
            <div class="flex items-center gap-0.4rem justify-between">
              <div class="flex items-center gap-0.4rem">
                <div class="i-bxs:coin -translate-y-2px"></div>
                <p class="text-base font-medium text-gray-900">{job[0].job_cost}</p>
              </div>
              {/* 
              //@ts-ignore */}
              <a
                href={props.result.uri}
                target="_blank"
                download={(job[0].config.diffusion.prompts[0] as TextPrompt).text}
                class="absolute right-1rem bottom-0.25rem sm:bottom-1rem cursor-pointer rounded-full p-0.25rem transition duration-400 hover:shadow-blu hover:shadow-md"
              >
                <div class=" i-bxs:cloud-download h-2rem w-2rem hover:shadow-blu hover:shadow-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};

const JobCard: Component<{ job: Job }> = (props) => {
  return <a class="w-12rem h-12rem bg-white"></a>;
};

export default Create;
