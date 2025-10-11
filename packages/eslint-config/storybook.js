import storybook from "eslint-plugin-storybook";
import { config as reactConfig } from "./react-internal.js";

/**
 * A custom ESLint configuration for Storybook apps.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = [
  ...reactConfig,
  ...storybook.configs["flat/recommended"],
  {
    ignores: ["storybook-static/**"],
  },
];
