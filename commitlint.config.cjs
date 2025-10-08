module.exports = {
  rules: {
    // Type rules
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],

    // Scope rules
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],

    // Subject rules ( description )
    'subject-case': [2, 'always', 'lower-case'],
    'subject-full-stop': [2, 'never', '.'],

    // Optional: prevent commits like "feat(auth): Add feature."
    'header-full-stop': [2, 'never', '.'],
  },
};
