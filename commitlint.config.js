module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    "scope-enum": [2, "always", ["packages/*"]],
  },
};
