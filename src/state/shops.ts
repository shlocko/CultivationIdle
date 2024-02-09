import { Item } from "./store";

export interface ShopItem {
	item: Item;
	cost: number;
}

export const basicShop: ShopItem[] = [
	{
		item: "Health Potion",
		cost: 50,
	},
	{
		item: "Mana Potion",
		cost: 50,
	},
	{
		item: "Herb",
		cost: 10,
	},
];
