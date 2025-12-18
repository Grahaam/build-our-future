import React from "react";

const FragmentDisplay = ({ unlockedCount, masterPlanImg }) => {
	return (
		<div className="relative w-48 h-72 border-4 border-dashed border-[#D4A373]/30 rounded-xl overflow-hidden bg-white/50">
			<div className="grid grid-cols-2 grid-rows-3 w-full h-full">
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className="border-[0.5px] border-white/20 overflow-hidden relative"
					>
						{i < unlockedCount ? (
							<img
								src={masterPlanImg}
								className="absolute"
								style={{
									width: "200%",
									height: "300%",
									left: `-${(i % 2) * 100}%`,
									top: `-${Math.floor(i / 2) * 100}%`,
									objectFit: "cover",
								}}
								alt="Plan Fragment"
							/>
						) : (
							<div className="w-full h-full bg-[#EFEBE9] flex items-center justify-center text-[#BCAAA4] text-xl">
								?
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default FragmentDisplay;
