import { type Component, JSXElement, onCleanup, createSignal, Show } from "solid-js";
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
	addCoins,
	setAction,
	setBar,
	bar,
} from "../state/store";
import { Nav } from "./Nav";
import { QuickInfo } from "./QuickInfo";
import { Toaster } from "solid-toast";
import { offlineTraining, perTick } from "../functions/tickMethods";
import { cloneDeep } from "lodash";
import { pickLoot } from "../functions/combatMethods";
import { sendLoot, sendModal } from "../state/modalMessages";
import { RouteSectionProps } from "@solidjs/router";
import { TickBar } from "./TickBar";
import { Combat } from "./Combat";

export const Template: Component<RouteSectionProps> = (props) => {
	const [saveTimer, setSaveTimer] = createSignal(0);
	const timer = setInterval(() => {
		if (document.hidden) return
		let timestamp = Date.now()
		//console.log(timestamp)
		//console.log(timestamp - state.timeStamp)
		if ((timestamp - state.timeStamp) / (1000) > 5) {
			console.log("gap")
			console.log(timestamp - state.timeStamp)
			offlineTraining(timestamp - state.timeStamp)
		}
		setState("timeStamp", Date.now())
		// Timer for auto saves
		setSaveTimer((t) => t + 10);
		if (saveTimer() >= 1000) {
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
				setBar((bar) => bar + 1.0 / tickSpeed());
			}
			if (bar() > 100) {
				setBar(0.0);
				perTick();
				tick[state.action]();
				if (state.mana > state.maxMana) {
					setState("mana", state.maxMana);
				}
			}
		} else if (state.state === "Modal") {
			if (state.modalMessages.length === 0) {
				setState("state", state.previousState);
			}
		} else if (state.state === "Combat") {
			setCombatState("opponents", (opponents) =>
				opponents.filter((opponent) => opponent.health > 0),
			);
			if (combatState.opponents.length === 0) {
				sendLoot(pickLoot(combatState.loot));
				addCoins(combatState.coinMin, combatState.coinMax);
				changeState(combatState.returnState);
				if (combatState.returnFunction) {
					combatState.returnFunction();
				}
			} else if (state.health <= 0) {
				changeState("Tick");
				setAction("Meditate");
				sendModal("You died! Meditate on your failures and try again!");
			}
		}
	}, 10);
	onCleanup(() => {
		clearInterval(timer);
	});
	return (
		<div classList={{
			[utils.App]: state.state !== "Combat",
			[utils.combat_container]: state.state === "Combat",
		}}>
			<Show when={state.state !== "Combat"}>
				<Nav />
				<QuickInfo />
				<div
					style={{
						"flex-grow": 1,
						"overflow-y": "auto",
						display: "flex",
						"flex-direction": "column",
						"grid-area": "main",
					}}
				>
					{props.children}
				</div>
				<TickBar />
			</Show>
			<Show when={state.state === "Combat"}>
				<QuickInfo />
				<div class={utils.container}
					style={{
						"width": "100%",
						"flex-grow": "1",
					}}>
					<Combat />
				</div>
			</Show>
		</div>
	);
};
