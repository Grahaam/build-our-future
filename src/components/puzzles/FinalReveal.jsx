import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const FinalReveal = ({ masterPlanImg }) => {
	useEffect(() => {
		// Celebrate!
		const duration = 5 * 1000;
		const animationEnd = Date.now() + duration;
		const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

		const interval = setInterval(function () {
			const timeLeft = animationEnd - Date.now();
			if (timeLeft <= 0) return clearInterval(interval);
			const particleCount = 50 * (timeLeft / duration);
			confetti({
				...defaults,
				particleCount,
				origin: { x: Math.random(), y: Math.random() - 0.2 },
			});
		}, 250);
	}, []);

	return (
		<motion.div
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			className="text-center p-10 bg-white rounded-[3rem] shadow-2xl border-8 border-yellow-100 max-w-2xl"
		>
			<h2 className="text-4xl font-serif text-amber-900 mb-6 italic">
				Our Future Home is Ready!
			</h2>

			<div className="relative mb-8 rounded-2xl overflow-hidden border-4 border-amber-50 shadow-inner">
				<img
					src={masterPlanImg}
					alt="Final Home Plan"
					className="w-full h-auto"
				/>
			</div>

			<div className="bg-amber-50 p-8 rounded-2xl border-2 border-dashed border-amber-200">
				<h3 className="text-2xl font-bold text-amber-800 mb-2">
					🎁 SPECIAL VOUCHER 🎁
				</h3>
				<p className="text-xl text-amber-700 italic">
					"This voucher is good for one [INSERT YOUR GIFT HERE]! I love you and
					I can't wait to build this future with you."
				</p>
			</div>

			<p className="mt-6 text-sm text-amber-400">
				The Bunny and Cat are very proud of you.
			</p>
		</motion.div>
	);
};

export default FinalReveal;
