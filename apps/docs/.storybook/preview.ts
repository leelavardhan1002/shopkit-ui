import type { Preview } from '@storybook/react-vite'
import theme from './shopkit-ui-sb-theme'

const preview: Preview = {
  parameters: {
    docs: {
      theme,
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
