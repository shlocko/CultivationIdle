import {
	For,
	type Component,
	createSignal,
	createEffect,
	createMemo,
	Switch,
	Match,
	Show,
	onMount,
} from "solid-js";
import {
	Aspect,
	LootTable,
	Technique,
	aspects,
	inventoryAdd,
	meditationTechnique,
	meditationTechniques,
	opponent,
	setOpponent,
	setState,
	state,
} from "./store";
import utils from "../styles/utils.module.css";
import modalStyles from "../styles/Modal.module.css";
import { techniques } from "./techniques";
import toast from "solid-toast";
import { createStore } from "solid-js/store";
import { cloneDeep } from "lodash";

export const sendModal = (content: string) => {
	const msg = {
		type: "Text",
		content: content,
	} as TextModal;
	const arr = state.modalMessages.slice();
	arr.push(msg);
	setState("modalMessages", arr);
};

export const sendChoice = <T extends { name: string }>(
	store: string,
	items: T[],
) => {
	const msg = {
		type: "Choose",
		store: store,
		items: items,
	} as ChooseModalState;

	const arr = state.modalMessages.slice();
	arr.push(msg);
	setState("modalMessages", arr);
};

export const sendTechniqueChoice = () => {
	const msg = {
		type: "ChooseTechnique",
	} as ChooseTechniqueModal;
	const arr = state.modalMessages.slice();
	arr.push(msg);
	setState("modalMessages", arr);
};

export const sendMeditationTechniqueChoice = () => {
	const msg = {
		type: "ChooseMeditationTechnique",
	} as ChooseMeditationTechniqueModal;
	const arr = state.modalMessages.slice();
	arr.push(msg);
	setState("modalMessages", arr);
};

export const sendAspectChoice = () => {
	const msg = {
		type: "ChooseAspect",
	} as ChooseAspectModal;
	const arr = state.modalMessages.slice();
	arr.push(msg);
	setState("modalMessages", arr);
};

export const sendLoot = (loot: LootTable) => {
	const msg = {
		type: "Loot",
		loot: loot,
	} as LootModal;
	const arr = state.modalMessages.slice();
	arr.push(msg);
	setState("modalMessages", arr);
};

export const testModalList = <T extends { name: string }>(arr: T[]) => {
	if (arr[0]) {
		console.log(arr[0].name);
	}
};

export const ModalText: Component = () => {
	const text = (state.modalMessages[0] as TextModal).content;

	return (
		<>
			<p> {text} </p>
			<button
				class={utils.btn}
				onClick={() => {
					const arr = state.modalMessages.slice();
					arr.shift();
					setState("modalMessages", arr);
				}}
			>
				Next
			</button>
		</>
	);
};

export const ModalChooseTechnique: Component = () => {
	const [choice, setChoice] = createSignal(-1);
	const techniqueList = techniques[state.aspect as keyof typeof techniques];
	return (
		<>
			<p> Choose: </p>
			<For each={techniqueList}>
				{(item, i) => (
					<>
						<Show
							when={
								state.techniques.find(
									(e) => e.name === item.name,
								) === undefined
							}
						>
							<button
								classList={{
									[utils.btn]: true,
									[modalStyles.btn_choice]: true,
									[utils.btn_active]: choice() === i(),
								}}
								onClick={() => {
									setChoice(i());
								}}
							>
								<p>{item.name}</p>
							</button>
							<Show when={choice() === i()}>
								<p> {item.description} </p>
							</Show>
						</Show>
					</>
				)}
			</For>

			<button
				class={utils.btn}
				onClick={() => {
					if (choice() >= 0) {
						const techniquesKnown = state.techniques.slice();
						techniquesKnown.push(techniqueList[choice()]);
						setState("techniques", techniquesKnown);
					}
					const arr = state.modalMessages.slice();
					arr.shift();
					setState("modalMessages", arr);
				}}
			>
				<p>Choose</p>
			</button>
		</>
	);
};

export const ModalChooseMeditationTechnique: Component = () => {
	const [choice, setChoice] = createSignal(-1);
	const techniqueList = meditationTechniques;
	return (
		<>
			<p> Choose </p>
			<For each={techniqueList}>
				{(item, i) => (
					<>
						<button
							classList={{
								[utils.btn]: true,
								[modalStyles.btn_choice]: true,
								[utils.btn_active]: choice() === i(),
							}}
							onClick={() => {
								setChoice(i());
							}}
						>
							<Show
								when={state.meditationTechniques.find(
									(e) => e.name === item.name,
								)}
							>
								<p>
									Upgrade: {item.level} =&gt {item.level + 1}
								</p>
							</Show>
							<p>{item.name}</p>
						</button>
						<Show when={choice() === i()}>
							<p> {item.description} </p>
						</Show>
					</>
				)}
			</For>

			<button
				class={utils.btn}
				onClick={() => {
					if (choice() >= 0) {
						const techniquesKnown = cloneDeep(
							state.meditationTechniques,
						);
						if (
							techniquesKnown.find(
								(e) => e.name === techniqueList[choice()].name,
							) === undefined
						) {
							techniquesKnown.push(techniqueList[choice()]);
						} else {
							const tech = techniquesKnown.find(
								(e) => e.name === techniqueList[choice()].name,
							);
							if (tech !== undefined) {
								console.log("upgrade");
								tech.level += 1;
							} else {
								console.log("error upgrading");
							}
						}
						setState("meditationTechniques", techniquesKnown);
						const arr = state.modalMessages.slice();
						arr.shift();
						setState("modalMessages", arr);
					}
				}}
			>
				<p>Choose</p>
			</button>
		</>
	);
};

export const ModalChooseAspect: Component = () => {
	const [choice, setChoice] = createSignal(-1);
	return (
		<div class={utils.container}>
			<p> Choose </p>
			<For each={aspects}>
				{(item, i) => (
					<>
						<Show
							when={techniques[item as keyof typeof techniques]}
						>
							<button
								classList={{
									[utils.btn]: true,
									[modalStyles.btn_choice]: true,
									[utils.btn_active]: choice() === i(),
								}}
								onClick={() => {
									setChoice(i());
								}}
							>
								<p>{item}</p>
							</button>
						</Show>
					</>
				)}
			</For>

			<button
				class={utils.btn}
				onClick={() => {
					if (choice() >= 0) {
						setState("aspect", aspects[choice()]);
					}
					const arr = state.modalMessages.slice();
					arr.shift();
					setState("modalMessages", arr);
				}}
			>
				<p>Choose</p>
			</button>
		</div>
	);
};

export const ModalLoot: Component<{ loot: LootTable }> = (props) => {
	const [loot, setLoot] = createStore(props.loot.slice(0));
	return (
		<div class={utils.container}>
			<p> Loot: </p>
			<For each={loot}>
				{(item, i) => {
					const chanceRoll = Math.floor(Math.random() * 100) + 1;
					setLoot(i(), "show", chanceRoll <= item.chance);
					const quantity =
						Math.floor(Math.random() * (item.max - item.min + 1)) +
						item.min;
					return (
						<Show when={item.show}>
							<button
								class={utils.btn}
								onClick={() => {
									inventoryAdd(item.name, quantity);
									toast(`${quantity} ${item.name} added`);
									setLoot(i(), "show", false);
								}}
							>
								<p>
									{" "}
									{quantity} {item.name}{" "}
								</p>
							</button>
						</Show>
					);
				}}
			</For>
			<button
				class={utils.btn}
				onClick={() => {
					const arr = state.modalMessages.slice();
					arr.shift();
					setState("modalMessages", arr);
				}}
			>
				<p>Next</p>
			</button>
		</div>
	);
};

export const ModalMessage: Component = () => {
	//let msg = state.modalMessages[0];
	const [msg, setMsg] = createSignal(state.modalMessages[0]);

	// Update the message whenever state.modalMessages changes
	createEffect(() => {
		setMsg(state.modalMessages[0]);
	});
	return (
		<Switch>
			<Match when={msg().type === "Text"}>
				<ModalText />
			</Match>
			<Match when={msg().type === "ChooseTechnique"}>
				<ModalChooseTechnique />
			</Match>
			<Match when={msg().type === "ChooseAspect"}>
				<ModalChooseAspect />
			</Match>
			<Match when={msg().type === "ChooseMeditationTechnique"}>
				<ModalChooseMeditationTechnique />
			</Match>
			<Match when={msg().type === "Loot"}>
				<ModalLoot loot={(msg() as LootModal).loot} />
			</Match>
		</Switch>
	);
};

export type ModalMessageType =
	| TextModal
	| ChooseModalState
	| ChooseTechniqueModal
	| ChooseMeditationTechniqueModal
	| ChooseAspectModal
	| LootModal;

export interface TextModal {
	type: "Text";
	content: string;
}

export interface ChooseModalState {
	type: "Choose";
	store: string;
	items: any[];
}

export interface ChooseTechniqueModal {
	type: "ChooseTechnique";
}

export interface ChooseAspectModal {
	type: "ChooseAspect";
}

export interface ChooseMeditationTechniqueModal {
	type: "ChooseMeditationTechnique";
}

export interface LootModal {
	type: "Loot";
	loot: LootTable;
}
