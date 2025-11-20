//This is a simple function that will help in accessing tailwind configurations in JS

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";

const { theme } = resolveConfig(tailwindConfig);

export default theme;
