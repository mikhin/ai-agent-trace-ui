import { TreeView } from "ai-agent-trace-ui-core";
import { type ReactElement } from "react";

import { SandboxItem } from "../components/SandboxItem";
import { SandboxSection } from "../components/SandboxSection";
import { sampleTreeViewData } from "../data/sample-tree-view-data.ts";

export const TreeViewPage = (): ReactElement => {
  return (
    <div className="p-8">
      <SandboxSection
        title="Tree View Component"
        description="A hierarchical tree view for displaying span data with selection functionality and span count."
      >
        <SandboxItem title="Basic Tree View" pattern="dots">
          <TreeView
            expandButton="inside"
            spans={sampleTreeViewData}
            onSelectionChange={(id) => console.log(`Selected span: ${id}`)}
          />
        </SandboxItem>

        <SandboxItem title="Tree View with Initial Selection" pattern="grid">
          <TreeView
            expandButton="inside"
            spans={sampleTreeViewData}
            initialSelectedId="2"
            onSelectionChange={(id) =>
              console.log(`Selection changed to: ${id}`)
            }
          />
        </SandboxItem>
      </SandboxSection>
    </div>
  );
};
