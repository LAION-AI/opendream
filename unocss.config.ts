import presetAttributify from "@unocss/preset-attributify";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import presetTagify from "@unocss/preset-tagify";
import presetWindi from "@unocss/preset-wind";
import presetWebFonts from "@unocss/preset-web-fonts";
import { presetForms } from "@julr/unocss-preset-forms";
import { presetScalpel } from "unocss-preset-scalpel";
import { presetExtra } from "unocss-preset-extra";
import { presetScrollbar } from "unocss-preset-scrollbar";
import { defineConfig, presetTypography, transformerDirectives, transformerVariantGroup } from "unocss";
import { presetBetterNestedColors } from "unocss-preset-better-nested-colors";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWindi(),
    presetTagify(),
    presetScalpel(),
    presetForms(),
    presetTypography(),
    presetExtra(),
    presetScrollbar(), // @ts-ignore
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      green: "#00E94F",
      pink: "#E08AF4",
      teal: "#00D1B0",
      blue: "#1D374E",
      blu: "#1D374E",
    },
  },
  shortcuts: [
    {
      input:
        "w-full border-radius-4px focus:ring-0 border-2px border-overlay0/25 px-0.8rem py-0.6rem mt-0.1rem bg-base/20",
      btn: "inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue/80 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2",
      sexybar:
        "scrollbar scrollbar-thumb-color-overlay2/30 scrollbar-track-color-overlay0/30 scrollbar-rounded scrollbar-w-8px scrollbar-radius-4px scrollbar-track-radius-4",
    },
  ],
  rules: [
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        // @ts-ignore
        if (theme.colors[c])
          // @ts-ignore
          return { color: theme.colors[c] };
      },
    ],
  ],
});
