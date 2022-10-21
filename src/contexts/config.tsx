import { createContext, useContext } from "solid-js";
import { atom, Atom } from "solid-use";
import { createStore } from "solid-js/store";
import { DiffusionConfig, IOConfig, Job, Result } from "selas/index";



const ConfigContext = createContext<{ioConfig: Atom<IOConfig>, diffusionConfig: Atom<DiffusionConfig>}>();  

export function ConfigProvider(props) {
  const ioConfig = atom({} as IOConfig);
  const diffusionConfig = atom({} as DiffusionConfig);

  return <ConfigContext.Provider value={{ ioConfig, diffusionConfig }}>{props.children}</ConfigContext.Provider>;
}

export const useConfig = () => {
  return useContext(ConfigContext);
};
