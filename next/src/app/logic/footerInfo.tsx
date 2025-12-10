export default interface FooterInfo {
	data: {
		footer: {
			copyright: string;
			designer: string;
			navItems: Array<{ id: number; url: string; text: string }>;
			services: Array<{ id: number; url: string; text: string }>;
			socialLinks: Array<{ id: number; url: string; text: string }>;
			gameJam: { id: number; url: string; text: string };
			contactDetails: { id: number; email: string; street: string; city: string; country: string; number: string };
			altLogo: { id: number; url: string; alternativeText: string; width: number; height: number };
			halfLogo: { id: number; url: string; alternativeText: string; width: number; height: number };
			text: string;
		};
	};
};