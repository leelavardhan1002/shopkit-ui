module.exports = {
  // Prompt setup
  prompter: async (cz, commit) => {
    const { type } = await cz.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Select the type of change you are committing:',
        choices: [
          { name: 'feat:     A new feature', value: 'feat' },
          { name: 'fix:      A bug fix', value: 'fix' },
          { name: 'docs:     Documentation only changes', value: 'docs' },
          {
            name: 'style:    Code style changes (e.g., formatting)',
            value: 'style',
          },
          {
            name: 'refactor: Code change that neither fixes a bug nor adds a feature',
            value: 'refactor',
          },
          { name: 'perf:     Performance improvements', value: 'perf' },
          { name: 'test:     Adding or correcting tests', value: 'test' },
          {
            name: 'chore:    Changes to the build process or auxiliary tools',
            value: 'chore',
          },
          { name: 'revert:   Revert to a previous commit', value: 'revert' },
        ],
        validate: (input) => (input ? true : 'Type is required!'), // Ensure type is selected
      },
    ]);

    const { scope } = await cz.prompt([
      {
        type: 'input',
        name: 'scope',
        message: 'Enter the scope (e.g., component, feature, etc.) [required]',
        validate: (input) => (input ? true : 'Scope is required!'), // Ensure scope is provided
      },
    ]);

    const { description } = await cz.prompt([
      {
        type: 'input',
        name: 'description',
        message:
          'Write a short description of your changes (imperative, e.g., "fix bug") [required]',
        validate: (input) => {
          // Check for required input
          if (!input) return 'Description is required!';
          // Check if description exceeds 50 characters
          if (input.length > 50) return 'Description cannot exceed 50 characters!';
          // Check if description starts with uppercase letter
          if (input.charAt(0) === input.charAt(0).toUpperCase()) {
            return 'Description should not start with an uppercase letter!';
          }
          // Check if description ends with a dot
          if (input.charAt(input.length - 1) === '.') {
            return 'Description should not end with a dot!';
          }
          return true;
        }, // Ensure description is valid
      },
    ]);

    const { body } = await cz.prompt([
      {
        type: 'input',
        name: 'body',
        message: 'Enter additional information for the commit message (optional)',
      },
    ]);

    const { footer } = await cz.prompt([
      {
        type: 'input',
        name: 'footer',
        message: 'Enter footer meta information (optional)',
      },
    ]);

    const { prId } = await cz.prompt([
      {
        type: 'input',
        name: 'prId',
        message: 'Enter PR ID (e.g., PR-1234) for the reference (optional)',
      },
    ]);

    const { clickupLabel } = await cz.prompt([
      {
        type: 'list',
        name: 'clickupLabel',
        message: 'Select the ClickUp task label for this commit:',
        choices: [
          { name: 'fixes: Final commit that closes the task', value: 'fixes' },
          {
            name: 'adds-to: Used for commits that continue working on the task',
            value: 'adds-to',
          },
          { name: 'none: No ClickUp label', value: '' },
        ],
      },
    ]);

    const { clickupTicketId } = await cz.prompt([
      {
        type: 'input',
        name: 'clickupTicketId',
        message: 'Enter ClickUp ticket id (optional)',
      },
    ]);

    // Combine all responses to form the commit message
    let commitMessage = `${type}(${scope}): ${description}\n`; // Add a newline after the type and description
    if (body) commitMessage += `\n${body}\n`; // Add body in the commit message body with a newline

    // Create the footer with PR reference and ClickUp task info
    let footerMessage = '';
    if (footer) footerMessage += `${footer}\n`; // Footer message if provided
    if (prId) footerMessage += `Refer #${prId}\n`; // PR ID in the footer
    if (clickupTicketId) {
      footerMessage += `${clickupLabel} ${clickupTicketId}\n`; // ClickUp label and ID
    }

    // Append footer if available
    if (footerMessage) commitMessage += `\n${footerMessage}`; // Add footer to the commit message with a newline

    // Pass the generated commit message to the commit function
    commit(commitMessage);
  },
};
