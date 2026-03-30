import { type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import header from "../styles/Header.module.css";

export const Header: Component = () => {

  return (
    <div
      class={`${utils.border} ${header.header}`}
    >
      header
    </div>
  );
}
