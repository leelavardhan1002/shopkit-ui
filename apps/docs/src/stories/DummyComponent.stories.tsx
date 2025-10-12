import type { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { DummyComponent, type DummyComponentProps } from '@shopkit/ui-core';

const argTypes: ArgTypes<DummyComponentProps> = {
    // Add your argTypes here
};

const meta: Meta<typeof DummyComponent> = {
    title: 'UI/DummyComponent',
    component: DummyComponent,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'A reusable UI component from the @shopkit/ui-core library.',
            },
        },
    },
    argTypes,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        // Add your default args here
    },
};