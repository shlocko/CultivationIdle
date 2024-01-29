import { modalChooseAspect } from "../state/modalMessages";
import { advance, setState } from "../state/store";
import utils from "../styles/utils.module.css";

export const advancementMethods = {
  Foundation: () => {
    setState(
      "modalMessage",
      <>
        <p>
          You feel your mana reach a critical density and begin to condense into
          a mana core. You may now choose an aspect to cultivate and begin
          learing to use your mana.
        </p>
        <button
          class={utils.btn}
          onClick={() => {
            modalChooseAspect();
          }}
        >
          Next
        </button>
      </>,
    );
    advance();
  },
  CoreFormation: () => {},
};
