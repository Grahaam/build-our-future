import React, { useState } from "react";
import { motion } from "framer-motion";

const BedroomPuzzle = ({ onComplete }) => {
	const [matches, setMatches] = useState({
		pink: false,
		blue: false,
		yellow: false,
	});

	const handleDragEnd = (info, color) => {
		// Simplified 'target' logic: check if dropped in a certain X/Y range
		if (info.point.x > 400 && info.point.x < 800) {
			setMatches((prev) => {
				const next = { ...prev, [color]: true };
				if (Object.values(next).every((v) => v === true))
					setTimeout(onComplete, 1500);
				return next;
			});
		}
	};

	return (
		<div className="bg-rose-50 p-10 rounded-3xl text-center">
			<h2 className="text-rose-800 font-serif mb-6 italic">
				Fluff the Pillows
			</h2>
			<div className="relative w-[500px] h-40 bg-white/40 rounded-t-[100px] mx-auto border-b-8 border-rose-200">
				<div className="flex justify-center gap-4 pt-10">
					{["pink", "blue", "yellow"].map((c) => (
						<div
							key={c}
							className={`w-20 h-16 rounded-2xl border-2 border-dashed border-rose-300 ${
								matches[c] ? `bg-${c}-400` : ""
							}`}
						>
							{matches[c] && "☁️"}
						</div>
					))}
				</div>
			</div>
			<div className="flex gap-4 mt-10 justify-center">
				{Object.entries(matches).map(
					([color, isMatched]) =>
						!isMatched && (
							<motion.div
								key={color}
								drag
								dragSnapToOrigin
								onDragEnd={(e, info) => handleDragEnd(info, color)}
								style={{ backgroundColor: color }}
								className="w-20 h-16 rounded-2xl cursor-grab shadow-md"
							/>
						)
				)}
			</div>
		</div>
	);
};

export default BedroomPuzzle;
