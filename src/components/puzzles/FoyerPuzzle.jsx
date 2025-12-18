import React, { useState } from "react";
import { motion } from "framer-motion";

const FOYER_ITEMS = [
	{ id: "knight", label: "⚔️ Knight Helmet", type: "helmet" },
	{ id: "worker", label: "👷 Worker Helmet", type: "helmet" },
	{ id: "wand", label: "🪄 Hermione Wand", type: "magic" },
	{ id: "opener", label: "🍾 Cat Opener", type: "tool" },
];

const FoyerPuzzle = ({ onComplete }) => {
	const [placed, setPlaced] = useState([]);
	const [speaker, setSpeaker] = useState("Cat");
	const [dialogue, setDialogue] = useState(
		"This entryway is a mess! Fix it before I trip."
	);

	const handleDragEnd = (info, item) => {
		// Check if dropped on the right half of the screen
		if (info.point.x > window.innerWidth / 2) {
			if (!placed.find((p) => p.id === item.id)) {
				const newPlaced = [...placed, item];
				setPlaced(newPlaced);

				// Character Reactions
				if (item.type === "magic") {
					setSpeaker("Bunny");
					setDialogue("Woah! Magic! Can you make the snacks appear next?");
				} else if (item.id === "opener") {
					setSpeaker("Cat");
					setDialogue("Ah, the bottle opener. My favorite 'me' shaped tool.");
				}

				if (newPlaced.length === FOYER_ITEMS.length) {
					setSpeaker("Bunny");
					setDialogue("Perfectly organized! Here's a piece of the plan!");
					setTimeout(onComplete, 2000);
				}
			}
		}
	};

	return (
		<div className="flex flex-col items-center w-full max-w-4xl p-6">
			<div className="flex items-center gap-4 mb-8 p-4 bg-white rounded-2xl shadow-md w-full">
				<img
					src={
						speaker === "Cat"
							? "/src/assets/images/cat.png"
							: "/src/assets/images/bunny.png"
					}
					className="w-16 h-16 object-contain"
					alt="Speaker"
				/>
				<p className="italic font-medium text-gray-700">
					{speaker}: "{dialogue}"
				</p>
			</div>

			<div className="flex justify-between w-full h-64 bg-stone-100 rounded-3xl p-8 border-4 border-dashed border-stone-200 relative">
				<div className="w-1/2 flex flex-wrap gap-4">
					{FOYER_ITEMS.filter((i) => !placed.find((p) => p.id === i.id)).map(
						(item) => (
							<motion.div
								key={item.id}
								drag
								dragSnapToOrigin
								onDragEnd={(e, info) => handleDragEnd(info, item)}
								className="px-4 py-3 bg-white rounded-lg shadow-sm cursor-grab active:cursor-grabbing border-b-4 border-stone-300"
								whileHover={{ scale: 1.1 }}
							>
								{item.label}
							</motion.div>
						)
					)}
				</div>
				<div className="w-1/3 h-full border-l-4 border-stone-200 flex flex-col items-center justify-center italic text-stone-400">
					Drop Items Here to Organize
					<div className="mt-4 flex flex-col gap-2">
						{placed.map((p) => (
							<div key={p.id} className="text-green-600 font-bold">
								✅ {p.label}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FoyerPuzzle;
