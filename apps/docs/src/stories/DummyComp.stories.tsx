import type { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { DummyComp, type DummyCompProps } from '@shopkit/ui-core';

const argTypes: ArgTypes<DummyCompProps> = {
    // Add your argTypes here
};

const meta: Meta<typeof DummyComp> = {
    title: 'UI/DummyComp',
    component: DummyComp,
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