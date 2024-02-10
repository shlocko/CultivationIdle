import { type Component, JSXElement, onCleanup, createSignal } from "solid-js";
import utils from "../styles/utils.module.css";
import {
	state,
	setState,
	tick,
	tickSpeed,
	pause,
	persist,
	combatState,
	setCombatState,
	changeState,
} from "../state/store";
import { Nav } from "./Nav";
import { QuickInfo } from "./QuickInfo";
import { Toaster } from "solid-toast";
import { perTick } from "../functions/tickMethods";
import { cloneDeep } from "lodash";

export const Template: Component<{ children: JSXElement }> = (props) => {
	const [saveTimer, setSaveTimer] = createSignal(0);
	const timer = setInterval(() => {
		// Timer for auto saves
		setSaveTimer((t) => t + 10);
		if (saveTimer() >= 9000) {
			setSaveTimer(0);
			persist();
		}
		// Check for pending modals, if so go to modal state
		if (state.modalMessages.length > 0 && state.state !== "Modal") {
			changeState("Modal");
		}
		// state machine behavior
		if (state.state === "Tick") {
			if (!pause()) {
				setState("bar", (bar) => bar + 1.0 / tickSpeed());
			}
			if (state.bar > 100) {
				setState("bar", 0.0);
				tick[state.action]();
				perTick();
			}
		} else if (state.state === "Modal") {
			if (state.modalMessages.length === 0) {
				setState("state", state.previousState);
				// ignore
			}
		} else if (state.state === "Combat") {
			combatState.opponents.forEach((e, i) => {
				if (e.health <= 0) {
					let arr = cloneDeep(combatState.opponents);
					console.log("preded");
					console.log(e.health);
					console.log(i);
					console.log(combatState.opponents);
					console.log(e);
					arr.splice(i, 1);
					setCombatState("opponents", arr);
					console.log("ded");
					console.log(e.health);
					console.log(i);
					console.log(combatState.opponents);
					console.log(e);
				}
			});
			if (combatState.opponents.length === 0) {
				console.log(`zero ${combatState.opponents.length}`);
				changeState(combatState.returnState);
			}
		}
	}, 10);
	onCleanup(() => {
		clearInterval(timer);
	});
	return (
		<div class={utils.App}>
			<QuickInfo />
			<progress max="100" value={state.bar}>
				{state.bar}/100
			</progress>
			{props.children}
			<Nav />
		</div>
	);
};
