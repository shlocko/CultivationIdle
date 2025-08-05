import { Show, type Component } from "solid-js";
import styles from "../styles/Nav.module.css";
import { A } from "@solidjs/router";
import { setPause, load, persist, clear, state } from "../state/store";

export const Nav: Component = () => {
	return (
		<div class={styles.nav}>
			<A class={styles.nav_item} href="/">
				<p>Camp</p>
			</A>
			<Show when={state.unlocks.adventure}>
				<A class={styles.nav_item} href="/adventure">
					<p>Adventure</p>
				</A>
			</Show>
			<A class={styles.nav_item} href="/inventory">
				<p>Inventory</p>
			</A>
			<A class={styles.nav_item} href="/shop">
				<p>Shop</p>
			</A>
			<button
				class={styles.nav_item}
				onClick={() => {
					setPause((pause) => !pause);
				}}
			>
				Pause/Unpause
			</button>
			<button
				class={styles.nav_item}
				onClick={() => {
					load();
				}}
			>
				Load
			</button>
			<button
				class={styles.nav_item}
				onClick={() => {
					persist();
				}}
			>
				Save
			</button>
			<button
				class={styles.nav_item}
				onClick={() => {
					clear();
				}}
			>
				Clear
			</button>
		</div>
	);
};
