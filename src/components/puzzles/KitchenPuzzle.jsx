import React, { useState } from "react";
import { motion } from "framer-motion";

const KitchenPuzzle = ({ onComplete }) => {
	const [rotations, setRotations] = useState({
		salt: 90,
		pepper: 180,
		sugar: 45,
		tea: 270,
	});

	const handleRotate = (id) => {
		const newRot = (rotations[id] + 90) % 360;
		const newAllRotations = { ...rotations, [id]: newRot };
		setRotations(newAllRotations);

		if (Object.values(newAllRotations).every((r) => r === 0)) {
			setTimeout(onComplete, 1500);
		}
	};

	return (
		<div className="flex flex-col items-center bg-blue-50 p-10 rounded-3xl">
			<h2 className="text-blue-800 font-serif mb-8 italic text-2xl">
				Straighten the Spice Rack
			</h2>
			<div className="flex gap-8 items-end h-64">
				{Object.entries(rotations).map(([id, rot]) => (
					<div key={id} className="flex flex-col items-center">
						<motion.div
							animate={{ rotate: rot }}
							onClick={() => handleRotate(id)}
							className="w-12 rounded-t-xl cursor-pointer border-2 border-white/50 shadow-lg"
							style={{
								height: id === "salt" ? "120px" : "100px",
								backgroundColor:
									id === "pepper" ? "#444" : id === "salt" ? "#FFF" : "#D4A373",
							}}
						>
							<div className="bg-white/40 mt-4 text-[10px] text-center font-bold">
								{id.toUpperCase()}
							</div>
						</motion.div>
						<div className="w-16 h-2 bg-black/10 mt-2 rounded-full" />
					</div>
				))}
			</div>
			<p className="mt-8 text-blue-400 text-sm">
				Tap the jars to align the labels!
			</p>
		</div>
	);
};

export default KitchenPuzzle;
