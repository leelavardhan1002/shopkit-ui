module.exports = function (plop) {
    plop.setHelper('pascalCase', (text) =>
        text
            .replace(/(^\w|-\w)/g, (clear) => clear.replace('-', '').toUpperCase())
            .replace(/\s+/g, '')
    );

    plop.setHelper('camelCase', (text) => {
        const pascal = text
            .replace(/(^\w|-\w)/g, (clear) => clear.replace('-', '').toUpperCase())
            .replace(/\s+/g, '');
        return pascal.charAt(0).toLowerCase() + pascal.slice(1);
    });

    plop.setGenerator('create', {
        description: 'Generate UI components or Storybook files',
        prompts: [
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to create?',
                choices: ['UI Component', 'Storybook'],
            },
            {
                type: 'input',
                name: 'componentName',
                message: 'Enter component name:',
                when: (answers) =>
                    answers.action === 'UI Component' || answers.action === 'Storybook',
            }
        ],
        actions: (answers) => {
            const actions = [];

            if (answers?.action === 'UI Component') {
                actions.push(
                    {
                        type: 'add',
                        path: '../ui-core/src/{{pascalCase componentName}}/{{pascalCase componentName}}.tsx',
                        templateFile: 'plop-templates/component/Component.tsx.hbs',
                    },
                    {
                        type: 'add',
                        path: '../ui-core/src/{{pascalCase componentName}}/{{pascalCase componentName}}.style.ts',
                        templateFile: 'plop-templates/component/Component.style.ts.hbs',
                    },
                    {
                        type: 'add',
                        path: '../ui-core/src/{{pascalCase componentName}}/types.ts',
                        templateFile: 'plop-templates/component/types.ts.hbs',
                    },
                    {
                        type: 'add',
                        path: '../ui-core/src/{{pascalCase componentName}}/index.ts',
                        templateFile: 'plop-templates/component/index.ts.hbs',
                    },
                    {
                        type: 'add',
                        path: '../ui-core/src/{{pascalCase componentName}}/{{pascalCase componentName}}.test.tsx',
                        templateFile: 'plop-templates/component/Component.test.tsx.hbs',
                    },
                    {
                        type: 'append',
                        path: '../ui-core/src/index.ts',
                        template: "export * from './{{pascalCase componentName}}';\n",
                    }
                );
            }

            if (answers?.action === 'Storybook') {
                actions.push({
                    type: 'add',
                    path: '../../apps/docs/src/stories/{{pascalCase componentName}}.stories.tsx',
                    templateFile: 'plop-templates/storybook/Component.stories.tsx.hbs',
                });
            }

            return actions;
        },
    });
};
