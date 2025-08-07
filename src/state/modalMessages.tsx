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
	LootCollection,
	aspects,
	inventoryAdd,
	meditationTechniques,
	setState,
	state,
} from "./store";
import utils from "../styles/utils.module.css";
import modalStyles from "../styles/Modal.module.css";
import { techniques } from "./techniques";
import toast from "solid-toast";
import { createStore } from "solid-js/store";
import { cloneDeep } from "lodash";
import { ShopItem } from "./shops";
import { Shop } from "../components/Shop";
import { Travel } from "../components/Travel";

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

export const sendLoot = (loot: LootCollection) => {
	const msg = {
		type: "Loot",
		loot: loot,
	} as LootModal;
	const arr = state.modalMessages.slice();
	arr.push(msg);
	setState("modalMessages", arr);
};

export const sendShop = (items: ShopItem[]) => {
	const msg = {
		type: "Shop",
		items
	} as ShopModal;
	const arr = state.modalMessages.slice();
	arr.push(msg);
	setState("modalMessages", arr)
}

export const sendTravel = () => {
	const msg = {
		type: "Travel",
	} as TravelModal;
	const arr = state.modalMessages.slice();
	arr.push(msg);
	setState("modalMessages", arr)
}

export const testModalList = <T extends { name: string }>(arr: T[]) => {
	if (arr[0]) {
		console.log(arr[0].name);
	}
};

export const ModalText: Component = () => {
	const text = createMemo(
		() => (state.modalMessages[0] as TextModal).content,
	);
	//console.log(text);

	return (
		<>
			<p> {text()} </p>
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
			<p> Choose a technique: </p>
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
						</Show>
					</>
				)}
			</For>
			<div style={{
				"min-height": "5rem",
			}}>
				<Show when={techniqueList[choice()]}>
					<p> {techniqueList[choice()].description}</p>
				</Show>
				<p></p>
			</div>
			<button
				class={utils.btn}
				onClick={() => {
					const techniquesKnown = state.techniques.slice();
					techniquesKnown.push(techniqueList[choice()]);
					setState("techniques", techniquesKnown);
					setState("trainingTechnique", 0)
					setChoice(-1)
					const arr = state.modalMessages.slice();
					arr.shift();
					setState("modalMessages", arr);
				}}
				disabled={choice() < 0}
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
			<p> Choose a meditation technique:</p>
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
									Upgrade:{" "}
									{
										state.meditationTechniques.find(
											(e) => e.name === item.name,
										)!.level
									}{" "}
									=&gt
									{state.meditationTechniques.find(
										(e) => e.name === item.name,
									)!.level + 1}{" "}
								</p>
							</Show>
							<p>{item.name}</p>
						</button>
					</>
				)}
			</For>

			<div style={{
				"min-height": "5rem",
			}}>
				<Show when={techniqueList[choice()]}>
					<p> {techniqueList[choice()].description}</p>
				</Show>
				<p></p>
			</div>
			<button
				class={utils.btn}
				onClick={() => {
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
					setChoice(-1)
				}}
				disabled={choice() < 0}
			>
				<p>Choose</p>
			</button>
		</>
	);
};

export const ModalChooseAspect: Component = () => {
	const [choice, setChoice] = createSignal(-1);
	return (
		<>
			<p> Choose an aspect for your Qi: </p>
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
			<p></p>
			<button
				class={utils.btn}
				onClick={() => {
					setState("aspect", aspects[choice()]);
					const arr = state.modalMessages.slice();
					arr.shift();
					setState("modalMessages", arr);
				}}
				disabled={choice() < 0}
			>
				<p>Choose</p>
			</button>
		</>
	);
};

export const ModalLoot: Component<{ loot: LootCollection }> = (props) => {
	const [loot, setLoot] = createStore(props.loot.slice(0));
	if (loot.length === 0) {
		const arr = state.modalMessages.slice();
		arr.shift();
		setState("modalMessages", arr);
	}
	return (
		<div class={utils.loot_modal}>
			<p> Loot: </p>
			<For each={loot}>
				{(item, i) => {
					if (item) {
						return (
							<button
								class={utils.btn}
								onClick={() => {
									inventoryAdd(item.name, item.count);
									toast(`${item.count} ${item.name} added`);
									let newLoot = loot.slice();
									newLoot.splice(i(), 1);
									setLoot(newLoot);
								}}
							>
								<p>
									{" "}
									{item.count} {item.name}{" "}
								</p>
							</button>
						);
					}
				}}
			</For>
			<div style={{
				"width": "100%",
			}}>
				<button
					class={utils.btn}
					onClick={() => {
						//console.log(loot);
						loot.forEach((item) => {
							if (item) {
								inventoryAdd(item.name, item.count);
								toast(`${item.count} ${item.name} added`);
							}
						});
						const arr = state.modalMessages.slice();
						arr.shift();
						setState("modalMessages", arr);
					}}
				>
					<p>Loot All</p>
				</button>
				<button
					class={utils.btn}
					onClick={() => {
						const arr = state.modalMessages.slice();
						arr.shift();
						setState("modalMessages", arr);
					}}
				>
					<p>Leave loot behind</p>
				</button>
			</div>
		</div>
	);
};


export const ModalShop: Component<ShopItem[]> = (items) => {
	return (
		<div>
			<Shop {...items} />
			<button
				class={utils.btn}
				onClick={() => {
					const arr = state.modalMessages.slice();
					arr.shift();
					setState("modalMessages", arr);
				}}
			>
				<p>Exit</p>
			</button>
		</div>
	);
};

export const ModalTravel: Component = () => {
	return (
		<div style={{
		}}>
			<Travel />
			<button
				class={utils.btn}
				onClick={() => {
					const arr = state.modalMessages.slice();
					arr.shift();
					setState("modalMessages", arr);
				}}
			>
				<p>Exit</p>
			</button>
		</div>
	)
}

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
			<Match when={msg().type === "Shop"}>
				<ModalShop {...(msg() as ShopModal).items} />
			</Match>
			<Match when={msg().type === "Travel"}>
				<ModalTravel />
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
	| ShopModal
	| TravelModal
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
	loot: LootCollection;
}

export interface ShopModal {
	type: "Shop",
	items: ShopItem[],
}

export interface TravelModal {
	type: "Travel",
}
