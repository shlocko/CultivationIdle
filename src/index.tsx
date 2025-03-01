/* @refresh reload */
import { render } from "solid-js/web";
import { Route, HashRouter } from "@solidjs/router";

import "./index.css";
import { Main } from "./components/main";
import { Train } from "./components/Train";
import { Combat } from "./components/Combat";
import { Toaster } from "solid-toast";
import { Inventory } from "./components/Inventory";
import Modal from "@lutaok/solid-modal";
import { state, setState, setPause } from "./state/store";
import { ModalMessage } from "./state/modalMessages";
import { Shop } from "./components/Shop";
import { Adventure } from "./components/Adventure";
import { Template } from "./components/Template";
import utils from "./styles/utils.module.css";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
	);
}

render(
	() => (
		<div class={utils.max}>
			<Toaster />
			<Modal
				isOpen={
					state.state === "Modal" && state.modalMessages.length > 0
				}
				onCloseRequest={() => {
					setPause(false);
				}}
			>
				<ModalMessage />
			</Modal>
			<HashRouter root={Template} base="/">
				<Route path="/" component={Main} />
				<Route path="/adventure" component={Adventure} />
				<Route path="/inventory" component={Inventory} />
				<Route path="/shop" component={Shop} />
			</HashRouter>
		</div>
	),
	root!,
);
