import { For, type Component, Show } from "solid-js";
import { Template } from "./Template";
import {
	state,
	inventoryRemove,
	inventoryAdd,
	setState,
	Weapon,
	inventoryRemoveQuantity,
} from "../state/store";
import utils from "../styles/utils.module.css";
import toast from "solid-toast";
import { ItemNames } from "../state/items";

export const Inventory: Component = () => {
	return (
		<>
			<h2>Inventory</h2>
			<For each={state.inventory}>
				{(item) => (
					<>
						<p>
							{" "}
							{item.item.name} x {item.quantity}
						</p>
						<button
							class={utils.btn}
							onClick={() => {
								inventoryRemove(item.item.name as ItemNames);
								toast(
									`${item.quantity} ${item.item.name} removed`,
								);
							}}
						>
							X
						</button>
						<Show when={item.item.type === "weapon"}>
							<button
								class={utils.btn}
								onClick={() => {
									if (state.equippedWeapon !== undefined) {
										inventoryAdd(
											state.equippedWeapon.name,
											1,
										);
									}
									setState(
										"equippedWeapon",
										item.item as Weapon,
									);
									inventoryRemoveQuantity(item.item.name, 1);
								}}
							>
								<p> Equip </p>
							</button>
						</Show>
					</>
				)}
			</For>
			<button
				onClick={() => {
					inventoryAdd("Health Potion", 3);
				}}
			>
				Add 3 health Potion
			</button>
			<button
				onClick={() => {
					inventoryAdd("Mana Potion", 3);
				}}
			>
				Add 3 Mana Potion
			</button>
			<button
				onClick={() => {
					inventoryAdd("Dagger", 1);
				}}
			>
				Add Dagger
			</button>
			<button
				onClick={() => {
					inventoryAdd("Sword", 1);
				}}
			>
				Add Sword
			</button>
			<div class={utils.top_auto} />
		</>
	);
};
