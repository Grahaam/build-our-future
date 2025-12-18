import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FragmentDisplay from "./components/FragmentDisplay";
import FoyerPuzzle from "./components/puzzles/FoyerPuzzle";
import FinalReveal from "./components/puzzles/FinalReveal";

const App = () => {
	const [currentLevel, setCurrentLevel] = useState(1);
	const [unlockedCount, setUnlockedCount] = useState(0);
	const masterImg = "/src/assets/images/master-plan.png";

	const handleLevelComplete = () => {
		setUnlockedCount((prev) => prev + 1);
		setCurrentLevel((prev) => prev + 1);
	};

	return (
		<div className="game-container">
			<div className="inventory-panel">
				<h4 className="text-center text-xs uppercase tracking-widest mb-4">
					Master Plan
				</h4>
				<FragmentDisplay
					unlockedCount={unlockedCount}
					masterPlanImg={masterImg}
				/>
			</div>

			<header className="text-center mb-12">
				<h1 className="text-5xl font-serif italic mb-2">Building Our Future</h1>
				<p className="text-stone-400">Level {currentLevel}: The Foyer</p>
			</header>

			<main className="w-full flex justify-center">
				<AnimatePresence mode="wait">
					{currentLevel === 1 && (
						<motion.div
							key="l1"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<FoyerPuzzle onComplete={handleLevelComplete} />
						</motion.div>
					)}

					{currentLevel > 1 && (
						<motion.div
							key="final"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<FinalReveal masterPlanImg={masterImg} />
						</motion.div>
					)}
				</AnimatePresence>
			</main>
		</div>
	);
};

export default App;
