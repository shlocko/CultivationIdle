import { For, type Component } from "solid-js";
import { Template } from "./Template";
import { state, inventoryRemove, inventoryAdd } from "../state/store";
import utils from "../styles/utils.module.css";
import toast from "solid-toast";

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
								{item.item} x {item.quantity}
							</p>
							<button
								class={utils.btn}
								onClick={() => {
									inventoryRemove(item.item);
									toast(
										`${item.quantity} ${item.item} removed`,
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
						inventoryAdd("Iron Bar", 3);
					}}
				>
					Add 3 Iron Bar
				</button>
				<div class={utils.top_auto} />
			</Template>
		</>
	);
};
