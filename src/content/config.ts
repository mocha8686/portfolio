import { defineCollection, reference, z } from 'astro:content';

const projectsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.date(),
		image: z.object({
			url: z.string(),
			alt: z.string(),
		}),
	}),
});

export const collecctions = {
	projects: projectsCollection,
};
