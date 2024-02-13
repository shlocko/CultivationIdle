import { getItem } from "./items";
import { Item } from "./store";

export interface ShopItem {
	item: Item;
	cost: number;
}

export const basicShop: ShopItem[] = [
	{
		item: getItem("Health Potion"),
		cost: 50,
	},
	{
		item: getItem("Mana Potion"),
		cost: 50,
	},
	{
		item: getItem("Herb"),
		cost: 10,
	},
];
