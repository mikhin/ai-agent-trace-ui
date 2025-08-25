import type { Preview } from "@storybook/react-vite";

import "ai-agent-trace-ui-core/styles.css";

const preview: Preview = {
  parameters: {
    docs: {
      codePanel: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
