"use client";

import React from "react";
import Marquee from "react-fast-marquee";

type CarouselProps = {
	children: React.ReactNode;
	interval?: number;
	visibleCount?: number;
};

export default function Carousel({
	children,
	interval = 700,
	visibleCount = 3,
}: CarouselProps) {
	const items = React.Children.toArray(children);
	const loopItems = [...items, ...items];

	const cardWidthClass =
		visibleCount >= 3
			? "w-[280px] sm:w-[300px] lg:w-[320px]"
			: visibleCount === 2
				? "w-[300px] sm:w-[340px]"
				: "w-[320px]";

	const speed = Math.max(20, Math.min(60, Math.round(2800 / interval) * 10));

	return (
		<div className="w-full overflow-hidden">
			<Marquee gradient={false} gradientWidth={50} gradientColor="#ea841f" speed={speed} pauseOnHover>
				{loopItems.map((child, index) => (
					<div key={index} className={`mx-3 shrink-0 ${cardWidthClass}`}>
						<div className="h-full">{child}</div>
					</div>
				))}
			</Marquee>
		</div>
	);
}
