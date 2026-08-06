type Particle = {
	x: number;
	y: number;
	radius: number;
	opacity: number;
};

type ParticleFieldOptions = {
	seed: number;
	count: number;
	minRadius: number;
	maxRadius: number;
	minOpacity: number;
	maxOpacity: number;
};

function createRandom(seed: number) {
	let state = seed >>> 0;

	return () => {
		state = (state * 1664525 + 1013904223) >>> 0;
		return state / 4294967296;
	};
}

function createParticleField({
	seed,
	count,
	minRadius,
	maxRadius,
	minOpacity,
	maxOpacity,
}: ParticleFieldOptions): Particle[] {
	const random = createRandom(seed);

	return Array.from({ length: count }, () => {
		const y = random() * 1000;

		/*
		 * Le centre du courant se décale vers la droite en descendant :
		 * haut-centre -> bas-droite.
		 */
		const streamCenterX = 360 + y * 0.5;
		const horizontalSpread = (random() - 0.5) * 340;

		const x = Math.min(
			985,
			Math.max(70, streamCenterX + horizontalSpread),
		);

		return {
			x: Number(x.toFixed(2)),
			y: Number(y.toFixed(2)),
			radius: Number(
				(minRadius + random() * (maxRadius - minRadius)).toFixed(2),
			),
			opacity: Number(
				(minOpacity + random() * (maxOpacity - minOpacity)).toFixed(2),
			),
		};
	});
}

const FOREGROUND_PARTICLES = createParticleField({
	seed: 42,
	count: 82,
	minRadius: 1.05,
	maxRadius: 2.35,
	minOpacity: 0.42,
	maxOpacity: 0.92,
});

const MIDDLE_PARTICLES = createParticleField({
	seed: 84,
	count: 68,
	minRadius: 0.75,
	maxRadius: 1.7,
	minOpacity: 0.28,
	maxOpacity: 0.7,
});

const BACKGROUND_PARTICLES = createParticleField({
	seed: 126,
	count: 54,
	minRadius: 0.5,
	maxRadius: 1.2,
	minOpacity: 0.18,
	maxOpacity: 0.5,
});

export default function HeroRisingParticles() {
	return (
		<div className="j42l-hero-particles" aria-hidden="true">
			<ParticleLayer
				className="j42l-hero-particle-layer-a"
				particles={FOREGROUND_PARTICLES}
			/>

			<ParticleLayer
				className="j42l-hero-particle-layer-b"
				particles={MIDDLE_PARTICLES}
			/>

			<ParticleLayer
				className="j42l-hero-particle-layer-c"
				particles={BACKGROUND_PARTICLES}
			/>
		</div>
	);
}

function ParticleLayer({
	className,
	particles,
}: {
	className: string;
	particles: Particle[];
}) {
	return (
		<svg
			className={`j42l-hero-particle-svg ${className}`}
			viewBox="0 0 1000 1000"
			preserveAspectRatio="xMidYMid slice"
			focusable="false"
		>
			{particles.map((particle, index) => (
				<circle
					key={`${className}-${index}`}
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