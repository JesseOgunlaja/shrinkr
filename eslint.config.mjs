import { FlatCompat } from "@eslint/eslintrc";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintrcPath = path.resolve(__dirname, ".eslintrc.json");
const eslintrcJson = JSON.parse(fs.readFileSync(eslintrcPath, "utf-8"));

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...eslintrcJson,
  },
];

export default eslintConfig;
