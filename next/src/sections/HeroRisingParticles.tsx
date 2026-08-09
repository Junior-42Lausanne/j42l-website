type Particle = {
	x: number;
	y: number;
	radius: number;
	opacity: number;
};

type ParticleLayerProps = {
	className: string;
	count: number;
	seed: number;
	minRadius: number;
	maxRadius: number;
};

function createParticles({
	count,
	seed,
	minRadius,
	maxRadius,
}: Omit<ParticleLayerProps, "className">): Particle[] {
	let currentSeed = seed;

	function random() {
		currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
		return currentSeed / 4294967296;
	}

	return Array.from({ length: count }, () => {
		const depth = random();

		return {
			x: 40 + random() * 920,
			y: 30 + random() * 1340,
			radius: minRadius + depth * (maxRadius - minRadius),
			opacity: 0.18 + random() * 0.58,
		};
	});
}

export default function HeroRisingParticles() {
	return (
		<div className="j42l-hero-particles" aria-hidden="true">
			<ParticleLayer
				className="j42l-hero-particle-layer-a"
				count={58}
				seed={42}
				minRadius={1}
				maxRadius={2.3}
			/>

			<ParticleLayer
				className="j42l-hero-particle-layer-b"
				count={46}
				seed={84}
				minRadius={0.7}
				maxRadius={1.65}
			/>

			<ParticleLayer
				className="j42l-hero-particle-layer-c"
				count={34}
				seed={126}
				minRadius={0.45}
				maxRadius={1.15}
			/>
		</div>
	);
}

function ParticleLayer({
	className,
	count,
	seed,
	minRadius,
	maxRadius,
}: ParticleLayerProps) {
	const particles = createParticles({
		count,
		seed,
		minRadius,
		maxRadius,
	});

	return (
		<svg
			className={`j42l-hero-particle-svg ${className}`}
			viewBox="0 0 1000 1400"
			preserveAspectRatio="xMidYMid slice"
			focusable="false"
		>
			{particles.map((particle, index) => (
				<circle
					key={`${seed}-${index}`}
					cx={particle.x}
					cy={particle.y}
					r={particle.radius}
					fill="currentColor"
					opacity={particle.opacity}
				/>
			))}
		</svg>
	);
}