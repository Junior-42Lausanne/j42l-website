const PARTICLES = [
	{ x: 18, y: 82, r: 1.2, o: 0.42 },
	{ x: 24, y: 74, r: 0.8, o: 0.34 },
	{ x: 31, y: 88, r: 1.5, o: 0.36 },
	{ x: 36, y: 69, r: 0.9, o: 0.28 },
	{ x: 43, y: 79, r: 1.1, o: 0.38 },
	{ x: 48, y: 92, r: 0.7, o: 0.26 },
	{ x: 55, y: 70, r: 1.4, o: 0.34 },
	{ x: 62, y: 84, r: 0.9, o: 0.3 },
	{ x: 68, y: 76, r: 1.2, o: 0.36 },
	{ x: 75, y: 90, r: 0.8, o: 0.24 },
	{ x: 82, y: 72, r: 1.5, o: 0.32 },
	{ x: 88, y: 86, r: 0.9, o: 0.26 },

	{ x: 20, y: 58, r: 0.8, o: 0.25 },
	{ x: 27, y: 50, r: 1.1, o: 0.28 },
	{ x: 34, y: 62, r: 0.7, o: 0.22 },
	{ x: 41, y: 47, r: 1.4, o: 0.3 },
	{ x: 49, y: 55, r: 0.9, o: 0.25 },
	{ x: 57, y: 42, r: 1.2, o: 0.28 },
	{ x: 64, y: 60, r: 0.8, o: 0.22 },
	{ x: 71, y: 49, r: 1.3, o: 0.26 },
	{ x: 79, y: 57, r: 0.7, o: 0.2 },
	{ x: 86, y: 44, r: 1.1, o: 0.24 },

	{ x: 22, y: 35, r: 0.7, o: 0.18 },
	{ x: 30, y: 28, r: 1.1, o: 0.22 },
	{ x: 39, y: 38, r: 0.8, o: 0.2 },
	{ x: 47, y: 24, r: 1.3, o: 0.24 },
	{ x: 56, y: 33, r: 0.7, o: 0.18 },
	{ x: 66, y: 22, r: 1, o: 0.2 },
	{ x: 75, y: 31, r: 0.8, o: 0.18 },
	{ x: 84, y: 19, r: 1.2, o: 0.2 },
] as const;

export default function HeroRisingParticles() {
	return (
		<div className="j42l-hero-particles" aria-hidden="true">
			<ParticleLayer className="j42l-hero-particle-layer-a" />
			<ParticleLayer className="j42l-hero-particle-layer-b" offset={9} />
			<ParticleLayer className="j42l-hero-particle-layer-c" offset={17} />
		</div>
	);
}

function ParticleLayer({
	className,
	offset = 0,
}: {
	className: string;
	offset?: number;
}) {
	return (
		<svg
			className={["j42l-hero-particle-svg", className].join(" ")}
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
		>
			{PARTICLES.map((particle, index) => {
				const shiftedX = (particle.x + offset) % 100;
				const shiftedY = (particle.y + offset * 1.7) % 100;

				return (
					<circle
						key={`${className}-${index}`}
						cx={shiftedX}
						cy={shiftedY}
						r={particle.r}
						fill="currentColor"
						opacity={particle.o}
					/>
				);
			})}
		</svg>
	);
}