import { AttributifyAttributes } from "@unocss/preset-attributify";

declare module "solid-js" {
  namespace JSX {
    interface HTMLAttributes<T> extends AttributifyAttributes {}
    interface AnchorHTMLAttributes<T> extends AttributifyAttributes {}
  }
}