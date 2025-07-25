import type { ReactElement } from "react";

import { Badge } from "ai-agent-trace-ui-core";

import { SandboxItem } from "../components/SandboxItem.tsx";
import { SandboxSection } from "../components/SandboxSection";

export const BadgePage = (): ReactElement => {
  return (
    <div className="space-y-8">
      <SandboxSection
        title="Badge Variants"
        description="Different visual styles for badges"
      >
        <SandboxItem title="Primary" pattern="grid">
          <Badge variant="primary">Primary</Badge>
        </SandboxItem>
        <SandboxItem title="Success">
          <Badge variant="success">Success</Badge>
        </SandboxItem>
        <SandboxItem title="Warning" pattern="dots">
          <Badge variant="warning">Warning</Badge>
        </SandboxItem>
        <SandboxItem title="Danger">
          <Badge variant="danger">Danger</Badge>
        </SandboxItem>
        <SandboxItem title="Neutral">
          <Badge variant="neutral">Neutral</Badge>
        </SandboxItem>
      </SandboxSection>

      <SandboxSection
        title="Badge Sizes"
        description="Different size options for badges"
      >
        <SandboxItem title="Small">
          <Badge size="sm">Small</Badge>
        </SandboxItem>
        <SandboxItem title="Medium">
          <Badge size="md">Medium</Badge>
        </SandboxItem>
      </SandboxSection>
    </div>
  );
};
