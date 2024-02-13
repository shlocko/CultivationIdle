import { type Component } from "solid-js";
import styles from "../styles/Nav.module.css";
import { A } from "@solidjs/router";
import { setPause, load, persist, clear } from "../state/store";

export const Nav: Component = () => {
	return (
		<div class={styles.nav}>
			<A class={styles.nav_item} href="/">
				Meditate
			</A>
			<A class={styles.nav_item} href="/train">
				Train
			</A>
			<A class={styles.nav_item} href="/adventure">
				Adventure
			</A>
			<A class={styles.nav_item} href="/inventory">
				Inventory
			</A>
			<A class={styles.nav_item} href="/shop">
				Shop
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
				<p>Load</p>
			</button>
			<button
				class={styles.nav_item}
				onClick={() => {
					persist();
				}}
			>
				<p>Save</p>
			</button>
			<button
				class={styles.nav_item}
				onClick={() => {
					clear();
				}}
			>
				<p>Clear</p>
			</button>
		</div>
	);
};
