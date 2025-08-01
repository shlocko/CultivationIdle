import { sendModal } from "../state/modalMessages";
import { Area } from "./area";

export const HollowWoods: Area = {
	unlockThresholds: {
		"peaksPass": 200,
	},
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
