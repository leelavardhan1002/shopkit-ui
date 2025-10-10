import { config } from "@shopkit/eslint-config/storybook";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    files: ["scripts/**/*.js"],
    rules: {
      "no-console": "off"
    }
  }
];
