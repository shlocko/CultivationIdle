import { For, type Component } from "solid-js";
import { Template } from "./Template";
import { state, inventoryRemove, inventoryAdd } from "../state/store";
import utils from "../styles/utils.module.css";
import toast from "solid-toast";
import { ItemNames } from "../state/items";

export const Inventory: Component = () => {
	return (
		<>
			<Template>
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
									inventoryRemove(
										item.item.name as ItemNames,
									);
									toast(
										`${item.quantity} ${item.item.name} removed`,
									);
								}}
							>
								X
							</button>
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
						inventoryAdd("Dagger", 1);
					}}
				>
					Add Dagger
				</button>
				<div class={utils.top_auto} />
			</Template>
		</>
	);
};
