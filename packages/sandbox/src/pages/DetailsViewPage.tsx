import { DetailsView, type TraceSpan } from "ai-agent-trace-ui-core";
import { type ReactElement } from "react";

import { SandboxItem } from "../components/SandboxItem";
import { SandboxSection } from "../components/SandboxSection";

export const DetailsViewPage = (): ReactElement => {
  const testData: TraceSpan = {
    id: "test-span",
    title: "ChatCompletion",
    raw: JSON.stringify(
      {
        id: "test-span",
        title: "ChatCompletion",
        attributes: {
          Input: "gpt-4",
          prompt_tokens: 1000,
          completion_tokens: 500,
          total_tokens: 1500,
          user_id: "user123",
        },
        startTimeUnixNano: "1704067200000000000",
        endTimeUnixNano: "1704067500000000000",
        tokensCount: 500,
        type: "llm_call",
        duration: 300,
        status: "success",
        cost: 10,
      },
      null,
      2,
    ),
    attributes: [
      { key: "TextInput", value: { stringValue: "gpt-4" } },
      { key: "prompt_tokens", value: { intValue: "1000" } },
      { key: "completion_tokens", value: { intValue: "500" } },
      { key: "total_tokens", value: { intValue: "1500" } },
      { key: "user_id", value: { stringValue: "user123" } },
    ],
    startTime: new Date("2023-01-01T00:00:00Z"),
    endTime: new Date("2023-01-01T00:05:00Z"),
    tokensCount: 500,
    type: "llm_call",
    duration: 300,
    status: "success",
    cost: 10,
  };

  return (
    <div className="p-8">
      <SandboxSection
        title="Details View Component"
        description="A detailed view for displaying span information, including attributes, events, and links."
      >
        <SandboxItem title="Basic Details View" pattern="dots">
          <DetailsView
            data={testData}
            copyButton={{
              isEnabled: true,
            }}
            avatar={{
              letter: "A",
              bgColor: "purple",
              size: "sm",
            }}
          />
        </SandboxItem>
      </SandboxSection>
    </div>
  );
};
