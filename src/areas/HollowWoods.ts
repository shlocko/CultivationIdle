import { sendModal } from "../state/modalMessages";
import { Area } from "./area";

export const HollowWoods: Area = {
	name: "Hollow Woods",
	type: "normal",
	unlockThresholds: {
		"peaksPass": 200,
	},
	travelTo: 10,
	subArea: false,
	subAreaTo: null,
	endExploration: () => { },
	commonEvents: [{
		name: "test in the woods",
		isUnlocked: () => true,
		activation: () => {
			sendModal("Test in the woods")
		}
	}],
	uncommonEvents: [],
	rareEvents: [],
	epicEvents: [],
}
