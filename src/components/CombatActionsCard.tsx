import { Component, For, Match, Switch, createSignal } from "solid-js"
import utils from "../styles/utils.module.css";
import { activeTechniqueCount, clearNotOngoing, combatState, setState, state } from "../state/store"
import { actionChoice, setActionChoice } from "./Combat";

type tabs = "techniques" | "items" | "actions"

export const CombatActionsCard: Component = () => {
	const [tab, setTab] = createSignal<tabs>("actions")

	return (
		<div classList={{
			[utils.combat_card]: true,
			[utils.container]: true,
		}}>
			<div>
				<button
					class={utils.btn}
					classList={{
						[utils.btn_active]: tab() === "actions"
					}}
					onClick={() => setTab("actions")}
				>
					<p>Actions</p>
				</button>
				<button
					class={utils.btn}
					classList={{
						[utils.btn_active]: tab() === "techniques"
					}}
					onClick={() => setTab("techniques")}
				>
					<p>Techniques</p>
				</button>
				<button
					class={utils.btn}
					classList={{
						[utils.btn_active]: tab() === "items"
					}}
					onClick={() => setTab("items")}
				>
					<p>Items</p>
				</button>
			</div>
			<div class={utils.container}>
				<Switch>
					<Match when={tab() === "actions"}>
						<button
							classList={{
								[utils.btn]: true,
								[utils.btn_active]: actionChoice() === 3,
							}}
							onClick={() => {
								setActionChoice(3);
								clearNotOngoing();
							}}
						>
							<p>Attack</p>
						</button>
					</Match>
					<Match when={tab() === "techniques"}>
						<For each={state.techniques}>
							{(item, i) => (
								<div>
									<button
										classList={{
											[utils.btn]: true,
											[utils.btn_active]: item.active,
											[utils.btn_ongoing]:
												item.onGoing,
										}}
										onClick={() => {
											if (item.onGoing) {
												setState(
													"techniques",
													i(),
													"onGoing",
													false,
												);
											} else {
												if (
													activeTechniqueCount() <
													Math.ceil(
														state.rank / 3,
													) &&
													!item.active
												) {
													setState(
														"techniques",
														i(),
														"active",
														true,
													);
												} else {
													setState(
														"techniques",
														i(),
														"active",
														false,
													);
												}
											}
											setActionChoice(-1);
										}}
									>
										<p>{item.name}: {item.multiplier}</p>
									</button>
									<button
										class={utils.btn}
										onClick={() => {
											setState(
												"techniques",
												i(),
												"multiplier",
												(n) => n + 1,
											);
										}}
									>
										{" "}
										<p>+</p>{" "}
									</button>
									<button
										class={utils.btn}
										onClick={() => {
											setState(
												"techniques",
												i(),
												"multiplier",
												(n) => n - 1,
											);
										}}
										disabled={state.techniques[i()].multiplier <= 0}
									>
										{" "}
										<p>-</p>{" "}
									</button>
								</div>
							)}
						</For>
					</Match>
					<Match when={tab() === "items"}>
						<button
							classList={{
								[utils.btn]: true,
								[utils.btn_active]: actionChoice() === 1,
							}}
							onClick={() => {
								setActionChoice(1);
								clearNotOngoing();
							}}
						>
							<p>Health Potion</p>
						</button>
						<button
							classList={{
								[utils.btn]: true,
								[utils.btn_active]: actionChoice() === 2,
							}}
							onClick={() => {
								setActionChoice(2);
								clearNotOngoing();
							}}
						>
							<p>Mana Potion</p>
						</button>
					</Match>

				</Switch>
			</div>
		</div >
	)
}
