import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FragmentDisplay from "./components/FragmentDisplay";
import FoyerPuzzle from "./components/puzzles/FoyerPuzzle";

const App = () => {
	const [currentLevel, setCurrentLevel] = useState(1);
	const [unlockedCount, setUnlockedCount] = useState(0);

	const handleLevelComplete = () => {
		setUnlockedCount((prev) => prev + 1);
		setCurrentLevel((prev) => prev + 1);
	};

	return (
		<div className="game-container">
			<div className="inventory-panel">
				<h4 className="text-center font-serif mb-2 text-sm text-gray-500">
					Progress
				</h4>
				<FragmentDisplay
					unlockedCount={unlockedCount}
					masterPlanImg="/assets/master-plan.png"
				/>
			</div>

			<header className="mb-10 text-center">
				<h1 className="text-4xl font-serif text-[#5D4037] mb-2 italic">
					Building Our Future
				</h1>
				<p className="text-gray-400">Level {currentLevel}: The Foyer</p>
			</header>

			<main className="w-full flex justify-center">
				<AnimatePresence mode="wait">
					{currentLevel === 1 && (
						<motion.div
							key="l1"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
						>
							<FoyerPuzzle onComplete={handleLevelComplete} />
						</motion.div>
					)}

					{currentLevel > 1 && (
						<motion.div className="text-center">
							<h2 className="text-2xl italic">To be continued...</h2>
							<p>Room 2: The Kitchen is under construction!</p>
						</motion.div>
					)}
				</AnimatePresence>
			</main>
		</div>
	);
};

export default App;
