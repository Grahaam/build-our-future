import React, { useState } from "react";
import { motion } from "framer-motion";

const items = [
	{ id: "knight", label: "⚔️ Knight Helmet", order: 1 },
	{ id: "worker", label: "👷 Worker Helmet", order: 2 },
	{ id: "wand", label: "🪄 Hermione Wand", order: 3 },
	{ id: "opener", label: "🍾 Cat Opener", order: 4 },
];

const FoyerPuzzle = ({ onComplete }) => {
	const [placed, setPlaced] = useState([]);
	const [speaker, setSpeaker] = useState("Cat");
	const [dialogue, setDialogue] = useState(
		"This house is a mess. How are we supposed to live here if you can't even find the keys?"
	);

	const handleDragEnd = (event, info, itemId) => {
		// If dropped in the 'Success Zone' (right side of screen)
		if (info.point.x > 600) {
			if (!placed.includes(itemId)) {
				const newPlaced = [...placed, itemId];
				setPlaced(newPlaced);

				if (itemId === "opener") {
					setSpeaker("Cat");
					setDialogue("My favorite tool. For... orange juice. Obviously.");
				} else if (itemId === "wand") {
					setSpeaker("Bunny");
					setDialogue("Ooh, magic! Can you make carrots appear?");
				} else {
					setSpeaker("Bunny");
					setDialogue("You're doing great! Keep organizing!");
				}

				if (newPlaced.length === items.length) {
					setSpeaker("Bunny");
					setDialogue(
						"Perfect! You found everything! Here is a piece of the plan."
					);
					setTimeout(onComplete, 2500);
				}
			}
		}
	};

	return (
		<div className="w-full max-w-4xl p-8 bg-[#FAF3E0] rounded-3xl border-b-8 border-r-8 border-[#D4A373]/20 shadow-xl">
			{/* Dialogue Box */}
			<div className="flex items-center gap-6 mb-10 p-6 bg-white rounded-2xl shadow-sm border-2 border-orange-50">
				<img
					src={speaker === "Cat" ? "/assets/cat.png" : "/assets/bunny.png"}
					className="w-20 h-20 object-contain animate-bounce"
					alt="Character"
				/>
				<div>
					<p className="font-bold text-orange-800">{speaker}:</p>
					<p className="italic text-gray-700 text-lg">"{dialogue}"</p>
				</div>
			</div>

			<div className="flex justify-between items-start h-80">
				{/* Unorganized Area */}
				<div className="flex flex-wrap gap-6 w-1/2">
					{items
						.filter((i) => !placed.includes(i.id))
						.map((item) => (
							<motion.div
								key={item.id}
								drag
								dragSnapToOrigin
								onDragEnd={(e, info) => handleDragEnd(e, info, item.id)}
								className="p-6 bg-white rounded-xl shadow-lg cursor-grab active:cursor-grabbing border-2 border-gray-100 flex items-center justify-center text-2xl"
								whileHover={{ scale: 1.1, rotate: -2 }}
								whileTap={{ scale: 0.9 }}
							>
								{item.label}
							</motion.div>
						))}
				</div>

				{/* The Target Area */}
				<div className="w-1/3 h-full border-4 border-dashed border-[#D4A373]/40 rounded-3xl flex flex-col items-center p-4 bg-[#F5E6D3]/30">
					<p className="text-[#D4A373] font-bold uppercase tracking-widest text-sm mb-6">
						The Wall Hooks
					</p>
					<div className="flex flex-col gap-4 w-full">
						{placed.map((id) => (
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								key={id}
								className="bg-white/80 p-3 rounded-lg text-center font-medium text-green-700 border border-green-200"
							>
								✨ {items.find((i) => i.id === id).label}
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FoyerPuzzle;
