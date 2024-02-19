export interface Event {
	name: string;
	isUnlocked: () => boolean;
	activation: Function;
}

// Rarity: Common, Uncommon, Rare, Epic, Legendary, Mythical, Unique
