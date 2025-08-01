import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// import devtools from 'solid-devtools/vite';
import viteImagemin from "@vheemstra/vite-plugin-imagemin";
import imageminPngquant from "imagemin-pngquant";

export default defineConfig({
	plugins: [
		/*
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
		// devtools(),
		solidPlugin(),
		viteImagemin({
			plugins: {
				png: imageminPngquant(),
			},
		}),
	],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
	base: "/CultivationIdle",
});
