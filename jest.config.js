import { createDefaultEsmPreset } from "ts-jest";

const presetConfig = createDefaultEsmPreset();

/** @type {import("jest".Config)} */
export default {
  ...presetConfig,
  testEnvironment: "node",
  testPathIgnorePatterns: ["/build/"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  }
};
