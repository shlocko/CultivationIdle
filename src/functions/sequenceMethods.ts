import { sendModal } from "../state/modalMessages";

export const intro = () => {
	sendModal(
		"You are embarking down a new path, one of magic and danger. You must train yourself and advance to prepare for what lies ahead!",
	);
	sendModal("test");
	sendModal("test2");
};
