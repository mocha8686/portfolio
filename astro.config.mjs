import svelte from '@astrojs/svelte';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [svelte(), icon()],
});
