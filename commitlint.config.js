// R2 - Conventional Commits. The scope list lives in the tree so that "is this
// a valid scope" has an answer here rather than in someone's memory.
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['site', 'theme', 'home', 'docs', 'download', 'content', 'ci', 'deps', 'config'],
    ],
    'subject-case': [2, 'always', 'lower-case'],
  },
};
