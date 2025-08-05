
//export type Area = "VerdantFields" | "SecondArea";

import { Event } from "../state/events"
import { HollowWoods } from "./HollowWoods"
import { VerdantFields } from "./VerdantFields"

export type AreaState = {
	name: string,
	unlocked: boolean,
	tickCount: number,
	unlocks: Record<string, boolean>,
}

export type Area = {
	unlockThresholds: Record<string, number>,
	subArea: boolean,
	subAreaTo: Area | null,
	commonEvents: Event[],
	uncommonEvents: Event[],
	rareEvents: Event[],
	epicEvents: Event[],

}

export let areas: Record<string, Area> = {
	"VerdantFields": VerdantFields,
	"HollowWoods": HollowWoods,
}

export type AreaNames = keyof typeof areas
