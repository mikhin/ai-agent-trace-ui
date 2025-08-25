import type { TraceSpan } from "ai-agent-trace-ui-core";

export const sampleTreeViewDataDeepNesting: TraceSpan[] = [
  {
    id: "1",
    title: "main",
    startTime: new Date("2023-01-01T00:00:00Z"),
    endTime: new Date("2023-01-01T00:06:12Z"),
    duration: 37220,
    cost: 1234,
    type: "chain_operation",
    raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
    attributes: [
      {
        key: "llm.prompt_template.template",
        value: { stringValue: "Create a summary based on: {summary}" },
      },
      {
        key: "llm.prompt_template.variables",
        value: { stringValue: "summary,style,length" },
      },
      { key: "template.tokens", value: { intValue: "25" } },
      { key: "output.format", value: { stringValue: "markdown" } },
      { key: "quality.check", value: { boolValue: true } },
    ],
    tokensCount: 1000,
    status: "success",
    children: [
      {
        id: "1-1",
        title: "ChatCompletions",
        startTime: new Date("2023-01-01T00:00:10Z"),
        endTime: new Date("2023-01-01T00:05:00Z"),
        duration: 4910,
        tokensCount: 500,
        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
        attributes: [
          {
            key: "llm.prompt_template.template",
            value: { stringValue: "Create a summary based on: {summary}" },
          },
          {
            key: "llm.prompt_template.variables",
            value: { stringValue: "summary,style,length" },
          },
          { key: "template.tokens", value: { intValue: "25" } },
          { key: "output.format", value: { stringValue: "markdown" } },
          { key: "quality.check", value: { boolValue: true } },
        ],
        cost: 150,
        type: "llm_call",
        status: "success",
        children: [
          {
            id: "1-1-1",
            title: "ChatCompletion",
            startTime: new Date("2023-01-01T00:00:15Z"),
            endTime: new Date("2023-01-01T00:00:45Z"),
            duration: 1940,
            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
            attributes: [
              {
                key: "llm.prompt_template.template",
                value: { stringValue: "Create a summary based on: {summary}" },
              },
              {
                key: "llm.prompt_template.variables",
                value: { stringValue: "summary,style,length" },
              },
              { key: "template.tokens", value: { intValue: "25" } },
              { key: "output.format", value: { stringValue: "markdown" } },
              { key: "quality.check", value: { boolValue: true } },
            ],
            tokensCount: 250,
            cost: 75,
            status: "pending",
            type: "llm_call",
            children: [
              {
                id: "1-1-1-1",
                title: "ChatCompletion",
                startTime: new Date("2023-01-01T00:00:16Z"),
                endTime: new Date("2023-01-01T00:00:30Z"),
                duration: 14000,
                tokensCount: 125,
                raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                attributes: [
                  {
                    key: "llm.prompt_template.template",
                    value: {
                      stringValue: "Create a summary based on: {summary}",
                    },
                  },
                  {
                    key: "llm.prompt_template.variables",
                    value: { stringValue: "summary,style,length" },
                  },
                  { key: "template.tokens", value: { intValue: "25" } },
                  { key: "output.format", value: { stringValue: "markdown" } },
                  { key: "quality.check", value: { boolValue: true } },
                ],
                cost: 37,
                status: "success",
                type: "llm_call",
                children: [
                  {
                    id: "1-1-1-1-1",
                    title: "ChatCompletion",
                    startTime: new Date("2023-01-01T00:00:17Z"),
                    endTime: new Date("2023-01-01T00:00:25Z"),
                    duration: 8000,
                    tokensCount: 62,
                    raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                    attributes: [
                      {
                        key: "llm.prompt_template.template",
                        value: {
                          stringValue: "Create a summary based on: {summary}",
                        },
                      },
                      {
                        key: "llm.prompt_template.variables",
                        value: { stringValue: "summary,style,length" },
                      },
                      { key: "template.tokens", value: { intValue: "25" } },
                      {
                        key: "output.format",
                        value: { stringValue: "markdown" },
                      },
                      { key: "quality.check", value: { boolValue: true } },
                    ],
                    cost: 18,
                    status: "success",
                    type: "llm_call",
                    children: [
                      {
                        id: "1-1-1-1-1-1",
                        title: "ChatCompletion",
                        startTime: new Date("2023-01-01T00:00:18Z"),
                        endTime: new Date("2023-01-01T00:00:22Z"),
                        duration: 4000,
                        tokensCount: 31,
                        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                        attributes: [
                          {
                            key: "llm.prompt_template.template",
                            value: {
                              stringValue:
                                "Create a summary based on: {summary}",
                            },
                          },
                          {
                            key: "llm.prompt_template.variables",
                            value: { stringValue: "summary,style,length" },
                          },
                          { key: "template.tokens", value: { intValue: "25" } },
                          {
                            key: "output.format",
                            value: { stringValue: "markdown" },
                          },
                          { key: "quality.check", value: { boolValue: true } },
                        ],
                        cost: 9,
                        status: "success",
                        type: "llm_call",
                        children: [
                          {
                            id: "1-1-1-1-1-1-1",
                            title: "ChatCompletion",
                            startTime: new Date("2023-01-01T00:00:19Z"),
                            endTime: new Date("2023-01-01T00:00:21Z"),
                            duration: 2000,
                            tokensCount: 15,
                            cost: 4,
                            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                            attributes: [
                              {
                                key: "llm.prompt_template.template",
                                value: {
                                  stringValue:
                                    "Create a summary based on: {summary}",
                                },
                              },
                              {
                                key: "llm.prompt_template.variables",
                                value: { stringValue: "summary,style,length" },
                              },
                              {
                                key: "template.tokens",
                                value: { intValue: "25" },
                              },
                              {
                                key: "output.format",
                                value: { stringValue: "markdown" },
                              },
                              {
                                key: "quality.check",
                                value: { boolValue: true },
                              },
                            ],
                            status: "success",
                            type: "llm_call",
                            children: [
                              {
                                id: "1-1-1-1-1-1-1-1",
                                title: "ChatCompletion",
                                startTime: new Date("2023-01-01T00:00:19Z"),
                                endTime: new Date("2023-01-01T00:00:21Z"),
                                duration: 2000,
                                tokensCount: 15,
                                raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                                attributes: [
                                  {
                                    key: "llm.prompt_template.template",
                                    value: {
                                      stringValue:
                                        "Create a summary based on: {summary}",
                                    },
                                  },
                                  {
                                    key: "llm.prompt_template.variables",
                                    value: {
                                      stringValue: "summary,style,length",
                                    },
                                  },
                                  {
                                    key: "template.tokens",
                                    value: { intValue: "25" },
                                  },
                                  {
                                    key: "output.format",
                                    value: { stringValue: "markdown" },
                                  },
                                  {
                                    key: "quality.check",
                                    value: { boolValue: true },
                                  },
                                ],
                                cost: 4,
                                status: "success",
                                type: "llm_call",
                                children: [
                                  {
                                    id: "1-1-1-1-1-1-1-1-1",
                                    title: "ChatCompletion",
                                    startTime: new Date("2023-01-01T00:00:19Z"),
                                    endTime: new Date("2023-01-01T00:00:21Z"),
                                    duration: 2000,
                                    raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                                    attributes: [
                                      {
                                        key: "llm.prompt_template.template",
                                        value: {
                                          stringValue:
                                            "Create a summary based on: {summary}",
                                        },
                                      },
                                      {
                                        key: "llm.prompt_template.variables",
                                        value: {
                                          stringValue: "summary,style,length",
                                        },
                                      },
                                      {
                                        key: "template.tokens",
                                        value: { intValue: "25" },
                                      },
                                      {
                                        key: "output.format",
                                        value: { stringValue: "markdown" },
                                      },
                                      {
                                        key: "quality.check",
                                        value: { boolValue: true },
                                      },
                                    ],
                                    tokensCount: 15,
                                    cost: 4,
                                    status: "success",
                                    type: "llm_call",
                                    children: [
                                      {
                                        id: "1-1-1-1-1-1-1-1-1-1",
                                        title: "ChatCompletion",
                                        startTime: new Date(
                                          "2023-01-01T00:00:19Z",
                                        ),
                                        endTime: new Date(
                                          "2023-01-01T00:00:21Z",
                                        ),
                                        duration: 2000,
                                        tokensCount: 15,
                                        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                                        attributes: [
                                          {
                                            key: "llm.prompt_template.template",
                                            value: {
                                              stringValue:
                                                "Create a summary based on: {summary}",
                                            },
                                          },
                                          {
                                            key: "llm.prompt_template.variables",
                                            value: {
                                              stringValue:
                                                "summary,style,length",
                                            },
                                          },
                                          {
                                            key: "template.tokens",
                                            value: { intValue: "25" },
                                          },
                                          {
                                            key: "output.format",
                                            value: { stringValue: "markdown" },
                                          },
                                          {
                                            key: "quality.check",
                                            value: { boolValue: true },
                                          },
                                        ],
                                        cost: 4,
                                        status: "success",
                                        type: "llm_call",
                                        children: [
                                          {
                                            id: "1-1-1-1-1-1-1-1-1-1-1",
                                            title: "ChatCompletion",
                                            startTime: new Date(
                                              "2023-01-01T00:00:19Z",
                                            ),
                                            endTime: new Date(
                                              "2023-01-01T00:00:21Z",
                                            ),
                                            duration: 2000,
                                            tokensCount: 15,
                                            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                                            attributes: [
                                              {
                                                key: "llm.prompt_template.template",
                                                value: {
                                                  stringValue:
                                                    "Create a summary based on: {summary}",
                                                },
                                              },
                                              {
                                                key: "llm.prompt_template.variables",
                                                value: {
                                                  stringValue:
                                                    "summary,style,length",
                                                },
                                              },
                                              {
                                                key: "template.tokens",
                                                value: { intValue: "25" },
                                              },
                                              {
                                                key: "output.format",
                                                value: {
                                                  stringValue: "markdown",
                                                },
                                              },
                                              {
                                                key: "quality.check",
                                                value: { boolValue: true },
                                              },
                                            ],
                                            cost: 4,
                                            status: "success",
                                            type: "llm_call",
                                            children: [
                                              {
                                                id: "1-1-1-1-1-1-1-1-1-1-1-1",
                                                title: "ChatCompletion",
                                                startTime: new Date(
                                                  "2023-01-01T00:00:19Z",
                                                ),
                                                endTime: new Date(
                                                  "2023-01-01T00:00:21Z",
                                                ),
                                                duration: 2000,
                                                tokensCount: 15,
                                                raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                                                attributes: [
                                                  {
                                                    key: "llm.prompt_template.template",
                                                    value: {
                                                      stringValue:
                                                        "Create a summary based on: {summary}",
                                                    },
                                                  },
                                                  {
                                                    key: "llm.prompt_template.variables",
                                                    value: {
                                                      stringValue:
                                                        "summary,style,length",
                                                    },
                                                  },
                                                  {
                                                    key: "template.tokens",
                                                    value: { intValue: "25" },
                                                  },
                                                  {
                                                    key: "output.format",
                                                    value: {
                                                      stringValue: "markdown",
                                                    },
                                                  },
                                                  {
                                                    key: "quality.check",
                                                    value: { boolValue: true },
                                                  },
                                                ],
                                                cost: 4,
                                                status: "success",
                                                type: "llm_call",
                                                children: [
                                                  {
                                                    id: "1-1-1-1-1-1-1-1-1-1-1-1-1",
                                                    title: "ChatCompletion",
                                                    startTime: new Date(
                                                      "2023-01-01T00:00:19Z",
                                                    ),
                                                    endTime: new Date(
                                                      "2023-01-01T00:00:21Z",
                                                    ),
                                                    duration: 2000,
                                                    tokensCount: 15,
                                                    cost: 4,
                                                    raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                                                    attributes: [
                                                      {
                                                        key: "llm.prompt_template.template",
                                                        value: {
                                                          stringValue:
                                                            "Create a summary based on: {summary}",
                                                        },
                                                      },
                                                      {
                                                        key: "llm.prompt_template.variables",
                                                        value: {
                                                          stringValue:
                                                            "summary,style,length",
                                                        },
                                                      },
                                                      {
                                                        key: "template.tokens",
                                                        value: {
                                                          intValue: "25",
                                                        },
                                                      },
                                                      {
                                                        key: "output.format",
                                                        value: {
                                                          stringValue:
                                                            "markdown",
                                                        },
                                                      },
                                                      {
                                                        key: "quality.check",
                                                        value: {
                                                          boolValue: true,
                                                        },
                                                      },
                                                    ],
                                                    status: "success",
                                                    type: "llm_call",
                                                    children: [
                                                      {
                                                        id: "1-1-1-1-1-1-1-1-1-1-1-1-1-1",
                                                        title: "ChatCompletion",
                                                        startTime: new Date(
                                                          "2023-01-01T00:00:19Z",
                                                        ),
                                                        endTime: new Date(
                                                          "2023-01-01T00:00:21Z",
                                                        ),
                                                        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                                                        attributes: [
                                                          {
                                                            key: "llm.prompt_template.template",
                                                            value: {
                                                              stringValue:
                                                                "Create a summary based on: {summary}",
                                                            },
                                                          },
                                                          {
                                                            key: "llm.prompt_template.variables",
                                                            value: {
                                                              stringValue:
                                                                "summary,style,length",
                                                            },
                                                          },
                                                          {
                                                            key: "template.tokens",
                                                            value: {
                                                              intValue: "25",
                                                            },
                                                          },
                                                          {
                                                            key: "output.format",
                                                            value: {
                                                              stringValue:
                                                                "markdown",
                                                            },
                                                          },
                                                          {
                                                            key: "quality.check",
                                                            value: {
                                                              boolValue: true,
                                                            },
                                                          },
                                                        ],
                                                        duration: 2000,
                                                        tokensCount: 15,
                                                        cost: 4,
                                                        status: "success",
                                                        type: "llm_call",
                                                        children: [
                                                          {
                                                            id: "1-1-1-1-1-1-1-1-1-1-1-1-1-1-1",
                                                            title:
                                                              "ChatCompletion",
                                                            startTime: new Date(
                                                              "2023-01-01T00:00:19Z",
                                                            ),
                                                            endTime: new Date(
                                                              "2023-01-01T00:00:21Z",
                                                            ),
                                                            duration: 2000,
                                                            tokensCount: 15,
                                                            cost: 4,
                                                            status: "success",
                                                            type: "llm_call",
                                                            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                                                            attributes: [
                                                              {
                                                                key: "llm.prompt_template.template",
                                                                value: {
                                                                  stringValue:
                                                                    "Create a summary based on: {summary}",
                                                                },
                                                              },
                                                              {
                                                                key: "llm.prompt_template.variables",
                                                                value: {
                                                                  stringValue:
                                                                    "summary,style,length",
                                                                },
                                                              },
                                                              {
                                                                key: "template.tokens",
                                                                value: {
                                                                  intValue:
                                                                    "25",
                                                                },
                                                              },
                                                              {
                                                                key: "output.format",
                                                                value: {
                                                                  stringValue:
                                                                    "markdown",
                                                                },
                                                              },
                                                              {
                                                                key: "quality.check",
                                                                value: {
                                                                  boolValue: true,
                                                                },
                                                              },
                                                            ],
                                                            children: [
                                                              {
                                                                id: "1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1",
                                                                title:
                                                                  "ChatCompletion",
                                                                startTime:
                                                                  new Date(
                                                                    "2023-01-01T00:00:19Z",
                                                                  ),
                                                                endTime:
                                                                  new Date(
                                                                    "2023-01-01T00:00:21Z",
                                                                  ),
                                                                duration: 2000,
                                                                tokensCount: 15,
                                                                cost: 4,
                                                                status:
                                                                  "success",
                                                                type: "llm_call",
                                                                children: [],
                                                                raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                                                                attributes: [
                                                                  {
                                                                    key: "llm.prompt_template.template",
                                                                    value: {
                                                                      stringValue:
                                                                        "Create a summary based on: {summary}",
                                                                    },
                                                                  },
                                                                  {
                                                                    key: "llm.prompt_template.variables",
                                                                    value: {
                                                                      stringValue:
                                                                        "summary,style,length",
                                                                    },
                                                                  },
                                                                  {
                                                                    key: "template.tokens",
                                                                    value: {
                                                                      intValue:
                                                                        "25",
                                                                    },
                                                                  },
                                                                  {
                                                                    key: "output.format",
                                                                    value: {
                                                                      stringValue:
                                                                        "markdown",
                                                                    },
                                                                  },
                                                                  {
                                                                    key: "quality.check",
                                                                    value: {
                                                                      boolValue: true,
                                                                    },
                                                                  },
                                                                ],
                                                              },
                                                            ],
                                                          },
                                                        ],
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "1-1-2",
            title: "ChatCompletion",
            startTime: new Date("2023-01-01T00:00:45Z"),
            endTime: new Date("2023-01-01T00:01:30Z"),
            duration: 2970,
            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
            attributes: [
              {
                key: "llm.prompt_template.template",
                value: { stringValue: "Create a summary based on: {summary}" },
              },
              {
                key: "llm.prompt_template.variables",
                value: { stringValue: "summary,style,length" },
              },
              { key: "template.tokens", value: { intValue: "25" } },
              { key: "output.format", value: { stringValue: "markdown" } },
              { key: "quality.check", value: { boolValue: true } },
            ],
            cost: 75,
            tokensCount: 250,
            status: "error",
            type: "llm_call",
            children: [
              {
                id: "1-1-2-1",
                title: "ChatCompletion",
                startTime: new Date("2023-01-01T00:00:46Z"),
                endTime: new Date("2023-01-01T00:01:00Z"),
                duration: 14000,
                raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                attributes: [
                  {
                    key: "llm.prompt_template.template",
                    value: {
                      stringValue: "Create a summary based on: {summary}",
                    },
                  },
                  {
                    key: "llm.prompt_template.variables",
                    value: { stringValue: "summary,style,length" },
                  },
                  { key: "template.tokens", value: { intValue: "25" } },
                  { key: "output.format", value: { stringValue: "markdown" } },
                  { key: "quality.check", value: { boolValue: true } },
                ],
                tokensCount: 125,
                cost: 37,
                status: "error",
                type: "llm_call",
                children: [
                  {
                    id: "1-1-2-1-1",
                    title: "ChatCompletion",
                    startTime: new Date("2023-01-01T00:00:47Z"),
                    endTime: new Date("2023-01-01T00:00:55Z"),
                    duration: 8000,
                    raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                    attributes: [
                      {
                        key: "llm.prompt_template.template",
                        value: {
                          stringValue: "Create a summary based on: {summary}",
                        },
                      },
                      {
                        key: "llm.prompt_template.variables",
                        value: { stringValue: "summary,style,length" },
                      },
                      { key: "template.tokens", value: { intValue: "25" } },
                      {
                        key: "output.format",
                        value: { stringValue: "markdown" },
                      },
                      { key: "quality.check", value: { boolValue: true } },
                    ],
                    tokensCount: 62,
                    cost: 18,
                    status: "error",
                    type: "llm_call",
                    children: [
                      {
                        id: "1-1-2-1-1-1",
                        title: "ChatCompletion",
                        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                        attributes: [
                          {
                            key: "llm.prompt_template.template",
                            value: {
                              stringValue:
                                "Create a summary based on: {summary}",
                            },
                          },
                          {
                            key: "llm.prompt_template.variables",
                            value: { stringValue: "summary,style,length" },
                          },
                          { key: "template.tokens", value: { intValue: "25" } },
                          {
                            key: "output.format",
                            value: { stringValue: "markdown" },
                          },
                          { key: "quality.check", value: { boolValue: true } },
                        ],
                        startTime: new Date("2023-01-01T00:00:48Z"),
                        endTime: new Date("2023-01-01T00:00:52Z"),
                        duration: 4000,
                        tokensCount: 31,
                        cost: 9,
                        status: "error",
                        type: "llm_call",
                        children: [
                          {
                            id: "1-1-2-1-1-1-1",
                            title: "ChatCompletion",
                            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                            attributes: [
                              {
                                key: "llm.prompt_template.template",
                                value: {
                                  stringValue:
                                    "Create a summary based on: {summary}",
                                },
                              },
                              {
                                key: "llm.prompt_template.variables",
                                value: { stringValue: "summary,style,length" },
                              },
                              {
                                key: "template.tokens",
                                value: { intValue: "25" },
                              },
                              {
                                key: "output.format",
                                value: { stringValue: "markdown" },
                              },
                              {
                                key: "quality.check",
                                value: { boolValue: true },
                              },
                            ],
                            startTime: new Date("2023-01-01T00:00:49Z"),
                            endTime: new Date("2023-01-01T00:00:51Z"),
                            duration: 2000,
                            tokensCount: 15,
                            cost: 4,
                            status: "error",
                            type: "llm_call",
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1-2",
        title: "RunnableSequence",
        startTime: new Date("2023-01-01T00:01:00Z"),
        endTime: new Date("2023-01-01T00:05:00Z"),
        duration: 1950,
        cost: 80,
        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
        attributes: [
          {
            key: "llm.prompt_template.template",
            value: { stringValue: "Create a summary based on: {summary}" },
          },
          {
            key: "llm.prompt_template.variables",
            value: { stringValue: "summary,style,length" },
          },
          { key: "template.tokens", value: { intValue: "25" } },
          { key: "output.format", value: { stringValue: "markdown" } },
          { key: "quality.check", value: { boolValue: true } },
        ],
        tokensCount: 200,
        status: "success",
        type: "chain_operation",
        children: [
          {
            id: "1-2-1",
            title: "RunnableSequence",
            startTime: new Date("2023-01-01T00:01:05Z"),
            endTime: new Date("2023-01-01T00:03:00Z"),
            duration: 115000,
            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
            attributes: [
              {
                key: "llm.prompt_template.template",
                value: { stringValue: "Create a summary based on: {summary}" },
              },
              {
                key: "llm.prompt_template.variables",
                value: { stringValue: "summary,style,length" },
              },
              { key: "template.tokens", value: { intValue: "25" } },
              { key: "output.format", value: { stringValue: "markdown" } },
              { key: "quality.check", value: { boolValue: true } },
            ],
            cost: 40,
            tokensCount: 100,
            status: "success",
            type: "chain_operation",
            children: [
              {
                id: "1-2-1-1",
                title: "RunnableSequence",
                startTime: new Date("2023-01-01T00:01:10Z"),
                endTime: new Date("2023-01-01T00:02:00Z"),
                duration: 50000,
                raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                attributes: [
                  {
                    key: "llm.prompt_template.template",
                    value: {
                      stringValue: "Create a summary based on: {summary}",
                    },
                  },
                  {
                    key: "llm.prompt_template.variables",
                    value: { stringValue: "summary,style,length" },
                  },
                  { key: "template.tokens", value: { intValue: "25" } },
                  { key: "output.format", value: { stringValue: "markdown" } },
                  { key: "quality.check", value: { boolValue: true } },
                ],
                cost: 20,
                tokensCount: 50,
                status: "success",
                type: "chain_operation",
                children: [
                  {
                    id: "1-2-1-1-1",
                    title: "RunnableSequence",
                    startTime: new Date("2023-01-01T00:01:15Z"),
                    endTime: new Date("2023-01-01T00:01:45Z"),
                    duration: 30000,
                    cost: 10,
                    tokensCount: 25,
                    raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                    attributes: [
                      {
                        key: "llm.prompt_template.template",
                        value: {
                          stringValue: "Create a summary based on: {summary}",
                        },
                      },
                      {
                        key: "llm.prompt_template.variables",
                        value: { stringValue: "summary,style,length" },
                      },
                      { key: "template.tokens", value: { intValue: "25" } },
                      {
                        key: "output.format",
                        value: { stringValue: "markdown" },
                      },
                      { key: "quality.check", value: { boolValue: true } },
                    ],
                    status: "success",
                    type: "chain_operation",
                    children: [
                      {
                        id: "1-2-1-1-1-1",
                        title: "RunnableSequence",
                        startTime: new Date("2023-01-01T00:01:20Z"),
                        endTime: new Date("2023-01-01T00:01:35Z"),
                        duration: 15000,
                        cost: 5,
                        tokensCount: 12,
                        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                        attributes: [
                          {
                            key: "llm.prompt_template.template",
                            value: {
                              stringValue:
                                "Create a summary based on: {summary}",
                            },
                          },
                          {
                            key: "llm.prompt_template.variables",
                            value: { stringValue: "summary,style,length" },
                          },
                          { key: "template.tokens", value: { intValue: "25" } },
                          {
                            key: "output.format",
                            value: { stringValue: "markdown" },
                          },
                          { key: "quality.check", value: { boolValue: true } },
                        ],
                        status: "success",
                        type: "chain_operation",
                        children: [
                          {
                            id: "1-2-1-1-1-1-1",
                            title: "RunnableSequence",
                            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                            attributes: [
                              {
                                key: "llm.prompt_template.template",
                                value: {
                                  stringValue:
                                    "Create a summary based on: {summary}",
                                },
                              },
                              {
                                key: "llm.prompt_template.variables",
                                value: { stringValue: "summary,style,length" },
                              },
                              {
                                key: "template.tokens",
                                value: { intValue: "25" },
                              },
                              {
                                key: "output.format",
                                value: { stringValue: "markdown" },
                              },
                              {
                                key: "quality.check",
                                value: { boolValue: true },
                              },
                            ],
                            startTime: new Date("2023-01-01T00:01:25Z"),
                            endTime: new Date("2023-01-01T00:01:30Z"),
                            duration: 5000,
                            cost: 2,
                            tokensCount: 6,
                            status: "success",
                            type: "chain_operation",
                            children: [],
                          },
                        ],
                      },
                      {
                        id: "1-2-1-1-1-2",
                        title: "RunnableSequence",
                        startTime: new Date("2023-01-01T00:01:20Z"),
                        endTime: new Date("2023-01-01T00:01:35Z"),
                        duration: 15000,
                        cost: 5,
                        tokensCount: 12,
                        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                        attributes: [
                          {
                            key: "llm.prompt_template.template",
                            value: {
                              stringValue:
                                "Create a summary based on: {summary}",
                            },
                          },
                          {
                            key: "llm.prompt_template.variables",
                            value: { stringValue: "summary,style,length" },
                          },
                          { key: "template.tokens", value: { intValue: "25" } },
                          {
                            key: "output.format",
                            value: { stringValue: "markdown" },
                          },
                          { key: "quality.check", value: { boolValue: true } },
                        ],
                        status: "success",
                        type: "chain_operation",
                        children: [
                          {
                            id: "1-2-1-1-1-2-1",
                            title: "RunnableSequence",
                            startTime: new Date("2023-01-01T00:01:25Z"),
                            endTime: new Date("2023-01-01T00:01:30Z"),
                            duration: 5000,
                            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                            attributes: [
                              {
                                key: "llm.prompt_template.template",
                                value: {
                                  stringValue:
                                    "Create a summary based on: {summary}",
                                },
                              },
                              {
                                key: "llm.prompt_template.variables",
                                value: { stringValue: "summary,style,length" },
                              },
                              {
                                key: "template.tokens",
                                value: { intValue: "25" },
                              },
                              {
                                key: "output.format",
                                value: { stringValue: "markdown" },
                              },
                              {
                                key: "quality.check",
                                value: { boolValue: true },
                              },
                            ],
                            cost: 2,
                            tokensCount: 6,
                            status: "success",
                            type: "chain_operation",
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "1-2-2",
            title: "RunnableSequence",
            startTime: new Date("2023-01-01T00:01:05Z"),
            endTime: new Date("2023-01-01T00:03:00Z"),
            duration: 115000,
            cost: 40,
            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
            attributes: [
              {
                key: "llm.prompt_template.template",
                value: { stringValue: "Create a summary based on: {summary}" },
              },
              {
                key: "llm.prompt_template.variables",
                value: { stringValue: "summary,style,length" },
              },
              { key: "template.tokens", value: { intValue: "25" } },
              { key: "output.format", value: { stringValue: "markdown" } },
              { key: "quality.check", value: { boolValue: true } },
            ],
            tokensCount: 100,
            status: "success",
            type: "chain_operation",
          },
        ],
      },
      {
        id: "1-3",
        title: "tavily_search",
        startTime: new Date("2023-01-01T00:01:30Z"),
        endTime: new Date("2023-01-01T00:02:00Z"),
        duration: 1880,
        cost: 25,
        status: "success",
        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
        attributes: [
          {
            key: "llm.prompt_template.template",
            value: { stringValue: "Create a summary based on: {summary}" },
          },
          {
            key: "llm.prompt_template.variables",
            value: { stringValue: "summary,style,length" },
          },
          { key: "template.tokens", value: { intValue: "25" } },
          { key: "output.format", value: { stringValue: "markdown" } },
          { key: "quality.check", value: { boolValue: true } },
        ],
        tokensCount: 100,
        type: "tool_execution",
        children: [
          {
            id: "1-3-1",
            title: "tavily_search",
            startTime: new Date("2023-01-01T00:01:31Z"),
            endTime: new Date("2023-01-01T00:01:45Z"),
            duration: 14000,
            cost: 12,
            status: "success",
            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
            attributes: [
              {
                key: "llm.prompt_template.template",
                value: { stringValue: "Create a summary based on: {summary}" },
              },
              {
                key: "llm.prompt_template.variables",
                value: { stringValue: "summary,style,length" },
              },
              { key: "template.tokens", value: { intValue: "25" } },
              { key: "output.format", value: { stringValue: "markdown" } },
              { key: "quality.check", value: { boolValue: true } },
            ],
            tokensCount: 50,
            type: "tool_execution",
            children: [
              {
                id: "1-3-1-1",
                title: "tavily_search",
                startTime: new Date("2023-01-01T00:01:32Z"),
                endTime: new Date("2023-01-01T00:01:40Z"),
                duration: 8000,
                cost: 6,
                raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                attributes: [
                  {
                    key: "llm.prompt_template.template",
                    value: {
                      stringValue: "Create a summary based on: {summary}",
                    },
                  },
                  {
                    key: "llm.prompt_template.variables",
                    value: { stringValue: "summary,style,length" },
                  },
                  { key: "template.tokens", value: { intValue: "25" } },
                  { key: "output.format", value: { stringValue: "markdown" } },
                  { key: "quality.check", value: { boolValue: true } },
                ],
                status: "success",
                tokensCount: 25,
                type: "tool_execution",
                children: [
                  {
                    id: "1-3-1-1-1",
                    title: "tavily_search",
                    startTime: new Date("2023-01-01T00:01:33Z"),
                    endTime: new Date("2023-01-01T00:01:37Z"),
                    duration: 4000,
                    raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                    attributes: [
                      {
                        key: "llm.prompt_template.template",
                        value: {
                          stringValue: "Create a summary based on: {summary}",
                        },
                      },
                      {
                        key: "llm.prompt_template.variables",
                        value: { stringValue: "summary,style,length" },
                      },
                      { key: "template.tokens", value: { intValue: "25" } },
                      {
                        key: "output.format",
                        value: { stringValue: "markdown" },
                      },
                      { key: "quality.check", value: { boolValue: true } },
                    ],
                    cost: 3,
                    status: "success",
                    tokensCount: 12,
                    type: "tool_execution",
                    children: [
                      {
                        id: "1-3-1-1-1-1",
                        title: "tavily_search",
                        startTime: new Date("2023-01-01T00:01:34Z"),
                        endTime: new Date("2023-01-01T00:01:36Z"),
                        duration: 2000,
                        cost: 1,
                        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                        attributes: [
                          {
                            key: "llm.prompt_template.template",
                            value: {
                              stringValue:
                                "Create a summary based on: {summary}",
                            },
                          },
                          {
                            key: "llm.prompt_template.variables",
                            value: { stringValue: "summary,style,length" },
                          },
                          { key: "template.tokens", value: { intValue: "25" } },
                          {
                            key: "output.format",
                            value: { stringValue: "markdown" },
                          },
                          { key: "quality.check", value: { boolValue: true } },
                        ],
                        status: "success",
                        tokensCount: 6,
                        type: "tool_execution",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1-4",
        title: "RunnableSequence",
        startTime: new Date("2023-01-01T00:02:00Z"),
        endTime: new Date("2023-01-01T00:05:00Z"),
        duration: 2990,
        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
        attributes: [
          {
            key: "llm.prompt_template.template",
            value: { stringValue: "Create a summary based on: {summary}" },
          },
          {
            key: "llm.prompt_template.variables",
            value: { stringValue: "summary,style,length" },
          },
          { key: "template.tokens", value: { intValue: "25" } },
          { key: "output.format", value: { stringValue: "markdown" } },
          { key: "quality.check", value: { boolValue: true } },
        ],
        status: "pending",
        cost: 90,
        tokensCount: 300,
        type: "chain_operation",
        children: [
          {
            id: "1-4-1",
            title: "RunnableAssign",
            startTime: new Date("2023-01-01T00:02:05Z"),
            endTime: new Date("2023-01-01T00:02:10Z"),
            duration: 5270,
            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
            attributes: [
              {
                key: "llm.prompt_template.template",
                value: { stringValue: "Create a summary based on: {summary}" },
              },
              {
                key: "llm.prompt_template.variables",
                value: { stringValue: "summary,style,length" },
              },
              { key: "template.tokens", value: { intValue: "25" } },
              { key: "output.format", value: { stringValue: "markdown" } },
              { key: "quality.check", value: { boolValue: true } },
            ],
            cost: 15,
            tokensCount: 50,
            status: "error",
            type: "chain_operation",
            children: [
              {
                id: "1-4-1-1",
                title: "RunnableAssign",
                startTime: new Date("2023-01-01T00:02:06Z"),
                endTime: new Date("2023-01-01T00:02:09Z"),
                duration: 3000,
                cost: 7,
                raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                attributes: [
                  {
                    key: "llm.prompt_template.template",
                    value: {
                      stringValue: "Create a summary based on: {summary}",
                    },
                  },
                  {
                    key: "llm.prompt_template.variables",
                    value: { stringValue: "summary,style,length" },
                  },
                  { key: "template.tokens", value: { intValue: "25" } },
                  { key: "output.format", value: { stringValue: "markdown" } },
                  { key: "quality.check", value: { boolValue: true } },
                ],
                tokensCount: 25,
                status: "error",
                type: "chain_operation",
                children: [
                  {
                    id: "1-4-1-1-1",
                    title: "RunnableAssign",
                    startTime: new Date("2023-01-01T00:02:07Z"),
                    endTime: new Date("2023-01-01T00:02:08Z"),
                    duration: 1000,
                    cost: 3,
                    tokensCount: 12,
                    status: "error",
                    raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                    attributes: [
                      {
                        key: "llm.prompt_template.template",
                        value: {
                          stringValue: "Create a summary based on: {summary}",
                        },
                      },
                      {
                        key: "llm.prompt_template.variables",
                        value: { stringValue: "summary,style,length" },
                      },
                      { key: "template.tokens", value: { intValue: "25" } },
                      {
                        key: "output.format",
                        value: { stringValue: "markdown" },
                      },
                      { key: "quality.check", value: { boolValue: true } },
                    ],
                    type: "chain_operation",
                    children: [
                      {
                        id: "1-4-1-1-1-1",
                        title: "RunnableAssign",
                        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                        attributes: [
                          {
                            key: "llm.prompt_template.template",
                            value: {
                              stringValue:
                                "Create a summary based on: {summary}",
                            },
                          },
                          {
                            key: "llm.prompt_template.variables",
                            value: { stringValue: "summary,style,length" },
                          },
                          { key: "template.tokens", value: { intValue: "25" } },
                          {
                            key: "output.format",
                            value: { stringValue: "markdown" },
                          },
                          { key: "quality.check", value: { boolValue: true } },
                        ],
                        startTime: new Date("2023-01-01T00:02:07Z"),
                        endTime: new Date("2023-01-01T00:02:08Z"),
                        duration: 500,
                        cost: 1,
                        tokensCount: 6,
                        status: "error",
                        type: "chain_operation",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "1-4-2",
            title: "ChatPromptTemplate",
            startTime: new Date("2023-01-01T00:02:10Z"),
            endTime: new Date("2023-01-01T00:02:15Z"),
            duration: 465900,
            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
            attributes: [
              {
                key: "llm.prompt_template.template",
                value: { stringValue: "Create a summary based on: {summary}" },
              },
              {
                key: "llm.prompt_template.variables",
                value: { stringValue: "summary,style,length" },
              },
              { key: "template.tokens", value: { intValue: "25" } },
              { key: "output.format", value: { stringValue: "markdown" } },
              { key: "quality.check", value: { boolValue: true } },
            ],
            tokensCount: 100,
            status: "error",
            cost: 5,
            type: "llm_call",
            children: [
              {
                id: "1-4-2-1",
                title: "ChatPromptTemplate",
                startTime: new Date("2023-01-01T00:02:11Z"),
                endTime: new Date("2023-01-01T00:02:14Z"),
                duration: 300000,
                tokensCount: 50,
                raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                attributes: [
                  {
                    key: "llm.prompt_template.template",
                    value: {
                      stringValue: "Create a summary based on: {summary}",
                    },
                  },
                  {
                    key: "llm.prompt_template.variables",
                    value: { stringValue: "summary,style,length" },
                  },
                  { key: "template.tokens", value: { intValue: "25" } },
                  { key: "output.format", value: { stringValue: "markdown" } },
                  { key: "quality.check", value: { boolValue: true } },
                ],
                status: "error",
                cost: 2,
                type: "llm_call",
                children: [
                  {
                    id: "1-4-2-1-1",
                    title: "ChatPromptTemplate",
                    startTime: new Date("2023-01-01T00:02:12Z"),
                    endTime: new Date("2023-01-01T00:02:13Z"),
                    duration: 100000,
                    tokensCount: 25,
                    raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                    attributes: [
                      {
                        key: "llm.prompt_template.template",
                        value: {
                          stringValue: "Create a summary based on: {summary}",
                        },
                      },
                      {
                        key: "llm.prompt_template.variables",
                        value: { stringValue: "summary,style,length" },
                      },
                      { key: "template.tokens", value: { intValue: "25" } },
                      {
                        key: "output.format",
                        value: { stringValue: "markdown" },
                      },
                      { key: "quality.check", value: { boolValue: true } },
                    ],
                    status: "error",
                    cost: 1,
                    type: "llm_call",
                    children: [
                      {
                        id: "1-4-2-1-1-1",
                        title: "ChatPromptTemplate",
                        startTime: new Date("2023-01-01T00:02:12Z"),
                        endTime: new Date("2023-01-01T00:02:13Z"),
                        duration: 50000,
                        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                        attributes: [
                          {
                            key: "llm.prompt_template.template",
                            value: {
                              stringValue:
                                "Create a summary based on: {summary}",
                            },
                          },
                          {
                            key: "llm.prompt_template.variables",
                            value: { stringValue: "summary,style,length" },
                          },
                          { key: "template.tokens", value: { intValue: "25" } },
                          {
                            key: "output.format",
                            value: { stringValue: "markdown" },
                          },
                          { key: "quality.check", value: { boolValue: true } },
                        ],
                        tokensCount: 12,
                        status: "error",
                        cost: 0,
                        type: "llm_call",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1-5",
        title: "tavily_extract",
        startTime: new Date("2023-01-01T00:02:15Z"),
        endTime: new Date("2023-01-01T00:02:20Z"),
        duration: 363900,
        status: "pending",
        tokensCount: 150,
        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
        attributes: [
          {
            key: "llm.prompt_template.template",
            value: { stringValue: "Create a summary based on: {summary}" },
          },
          {
            key: "llm.prompt_template.variables",
            value: { stringValue: "summary,style,length" },
          },
          { key: "template.tokens", value: { intValue: "25" } },
          { key: "output.format", value: { stringValue: "markdown" } },
          { key: "quality.check", value: { boolValue: true } },
        ],
        cost: 20,
        type: "tool_execution",
        children: [
          {
            id: "1-5-1",
            title: "tavily_extract",
            startTime: new Date("2023-01-01T00:02:16Z"),
            endTime: new Date("2023-01-01T00:02:19Z"),
            duration: 300000,
            status: "pending",
            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
            attributes: [
              {
                key: "llm.prompt_template.template",
                value: { stringValue: "Create a summary based on: {summary}" },
              },
              {
                key: "llm.prompt_template.variables",
                value: { stringValue: "summary,style,length" },
              },
              { key: "template.tokens", value: { intValue: "25" } },
              { key: "output.format", value: { stringValue: "markdown" } },
              { key: "quality.check", value: { boolValue: true } },
            ],
            tokensCount: 75,
            cost: 10,
            type: "tool_execution",
            children: [
              {
                id: "1-5-1-1",
                title: "tavily_extract",
                startTime: new Date("2023-01-01T00:02:17Z"),
                endTime: new Date("2023-01-01T00:02:18Z"),
                duration: 100000,
                status: "pending",
                tokensCount: 37,
                raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                attributes: [
                  {
                    key: "llm.prompt_template.template",
                    value: {
                      stringValue: "Create a summary based on: {summary}",
                    },
                  },
                  {
                    key: "llm.prompt_template.variables",
                    value: { stringValue: "summary,style,length" },
                  },
                  { key: "template.tokens", value: { intValue: "25" } },
                  { key: "output.format", value: { stringValue: "markdown" } },
                  { key: "quality.check", value: { boolValue: true } },
                ],
                cost: 5,
                type: "tool_execution",
                children: [
                  {
                    id: "1-5-1-1-1",
                    title: "tavily_extract",
                    startTime: new Date("2023-01-01T00:02:17Z"),
                    endTime: new Date("2023-01-01T00:02:18Z"),
                    duration: 50000,
                    status: "pending",
                    tokensCount: 18,
                    raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                    attributes: [
                      {
                        key: "llm.prompt_template.template",
                        value: {
                          stringValue: "Create a summary based on: {summary}",
                        },
                      },
                      {
                        key: "llm.prompt_template.variables",
                        value: { stringValue: "summary,style,length" },
                      },
                      { key: "template.tokens", value: { intValue: "25" } },
                      {
                        key: "output.format",
                        value: { stringValue: "markdown" },
                      },
                      { key: "quality.check", value: { boolValue: true } },
                    ],
                    cost: 2,
                    type: "tool_execution",
                    children: [
                      {
                        id: "1-5-1-1-1-1",
                        title: "tavily_extract",
                        startTime: new Date("2023-01-01T00:02:17Z"),
                        endTime: new Date("2023-01-01T00:02:18Z"),
                        duration: 25000,
                        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                        attributes: [
                          {
                            key: "llm.prompt_template.template",
                            value: {
                              stringValue:
                                "Create a summary based on: {summary}",
                            },
                          },
                          {
                            key: "llm.prompt_template.variables",
                            value: { stringValue: "summary,style,length" },
                          },
                          { key: "template.tokens", value: { intValue: "25" } },
                          {
                            key: "output.format",
                            value: { stringValue: "markdown" },
                          },
                          { key: "quality.check", value: { boolValue: true } },
                        ],
                        status: "pending",
                        tokensCount: 9,
                        cost: 1,
                        type: "tool_execution",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1-6",
        title: "RunnableAssign",
        startTime: new Date("2023-01-01T00:02:20Z"),
        endTime: new Date("2023-01-01T00:02:25Z"),
        tokensCount: 50,
        status: "success",
        duration: 7840,
        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
        attributes: [
          {
            key: "llm.prompt_template.template",
            value: { stringValue: "Create a summary based on: {summary}" },
          },
          {
            key: "llm.prompt_template.variables",
            value: { stringValue: "summary,style,length" },
          },
          { key: "template.tokens", value: { intValue: "25" } },
          { key: "output.format", value: { stringValue: "markdown" } },
          { key: "quality.check", value: { boolValue: true } },
        ],
        cost: 15,
        type: "chain_operation",
        children: [
          {
            id: "1-6-1",
            title: "RunnableAssign",
            startTime: new Date("2023-01-01T00:02:21Z"),
            endTime: new Date("2023-01-01T00:02:24Z"),
            tokensCount: 25,
            status: "success",
            duration: 3000,
            cost: 7,
            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
            attributes: [
              {
                key: "llm.prompt_template.template",
                value: { stringValue: "Create a summary based on: {summary}" },
              },
              {
                key: "llm.prompt_template.variables",
                value: { stringValue: "summary,style,length" },
              },
              { key: "template.tokens", value: { intValue: "25" } },
              { key: "output.format", value: { stringValue: "markdown" } },
              { key: "quality.check", value: { boolValue: true } },
            ],
            type: "chain_operation",
            children: [
              {
                id: "1-6-1-1",
                title: "RunnableAssign",
                startTime: new Date("2023-01-01T00:02:22Z"),
                endTime: new Date("2023-01-01T00:02:23Z"),
                tokensCount: 12,
                status: "success",
                duration: 1000,
                raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                attributes: [
                  {
                    key: "llm.prompt_template.template",
                    value: {
                      stringValue: "Create a summary based on: {summary}",
                    },
                  },
                  {
                    key: "llm.prompt_template.variables",
                    value: { stringValue: "summary,style,length" },
                  },
                  { key: "template.tokens", value: { intValue: "25" } },
                  { key: "output.format", value: { stringValue: "markdown" } },
                  { key: "quality.check", value: { boolValue: true } },
                ],
                cost: 3,
                type: "chain_operation",
                children: [
                  {
                    id: "1-6-1-1-1",
                    title: "RunnableAssign",
                    startTime: new Date("2023-01-01T00:02:22Z"),
                    endTime: new Date("2023-01-01T00:02:23Z"),
                    tokensCount: 6,
                    raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                    attributes: [
                      {
                        key: "llm.prompt_template.template",
                        value: {
                          stringValue: "Create a summary based on: {summary}",
                        },
                      },
                      {
                        key: "llm.prompt_template.variables",
                        value: { stringValue: "summary,style,length" },
                      },
                      { key: "template.tokens", value: { intValue: "25" } },
                      {
                        key: "output.format",
                        value: { stringValue: "markdown" },
                      },
                      { key: "quality.check", value: { boolValue: true } },
                    ],
                    status: "success",
                    duration: 500,
                    cost: 1,
                    type: "chain_operation",
                    children: [
                      {
                        id: "1-6-1-1-1-1",
                        title: "RunnableAssign",
                        startTime: new Date("2023-01-01T00:02:22Z"),
                        endTime: new Date("2023-01-01T00:02:23Z"),
                        tokensCount: 3,
                        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                        attributes: [
                          {
                            key: "llm.prompt_template.template",
                            value: {
                              stringValue:
                                "Create a summary based on: {summary}",
                            },
                          },
                          {
                            key: "llm.prompt_template.variables",
                            value: { stringValue: "summary,style,length" },
                          },
                          { key: "template.tokens", value: { intValue: "25" } },
                          {
                            key: "output.format",
                            value: { stringValue: "markdown" },
                          },
                          { key: "quality.check", value: { boolValue: true } },
                        ],
                        status: "success",
                        duration: 250,
                        cost: 0,
                        type: "chain_operation",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1-7",
        title: "ChatPromptTemplate",
        startTime: new Date("2023-01-01T00:02:25Z"),
        endTime: new Date("2023-01-01T00:02:30Z"),
        duration: 411900,
        tokensCount: 100,
        status: "success",
        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
        attributes: [
          {
            key: "llm.prompt_template.template",
            value: { stringValue: "Create a summary based on: {summary}" },
          },
          {
            key: "llm.prompt_template.variables",
            value: { stringValue: "summary,style,length" },
          },
          { key: "template.tokens", value: { intValue: "25" } },
          { key: "output.format", value: { stringValue: "markdown" } },
          { key: "quality.check", value: { boolValue: true } },
        ],
        cost: 5,
        type: "llm_call",
        children: [
          {
            id: "1-7-1",
            title: "ChatPromptTemplate",
            startTime: new Date("2023-01-01T00:02:26Z"),
            endTime: new Date("2023-01-01T00:02:29Z"),
            duration: 300000,
            tokensCount: 50,
            status: "success",
            cost: 2,
            raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
            attributes: [
              {
                key: "llm.prompt_template.template",
                value: { stringValue: "Create a summary based on: {summary}" },
              },
              {
                key: "llm.prompt_template.variables",
                value: { stringValue: "summary,style,length" },
              },
              { key: "template.tokens", value: { intValue: "25" } },
              { key: "output.format", value: { stringValue: "markdown" } },
              { key: "quality.check", value: { boolValue: true } },
            ],
            type: "llm_call",
            children: [
              {
                id: "1-7-1-1",
                title: "ChatPromptTemplate",
                startTime: new Date("2023-01-01T00:02:27Z"),
                endTime: new Date("2023-01-01T00:02:28Z"),
                duration: 100000,
                tokensCount: 25,
                raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                attributes: [
                  {
                    key: "llm.prompt_template.template",
                    value: {
                      stringValue: "Create a summary based on: {summary}",
                    },
                  },
                  {
                    key: "llm.prompt_template.variables",
                    value: { stringValue: "summary,style,length" },
                  },
                  { key: "template.tokens", value: { intValue: "25" } },
                  { key: "output.format", value: { stringValue: "markdown" } },
                  { key: "quality.check", value: { boolValue: true } },
                ],
                status: "success",
                cost: 1,
                type: "llm_call",
                children: [
                  {
                    id: "1-7-1-1-1",
                    title: "ChatPromptTemplate",
                    startTime: new Date("2023-01-01T00:02:27Z"),
                    endTime: new Date("2023-01-01T00:02:28Z"),
                    duration: 50000,
                    tokensCount: 12,
                    status: "success",
                    cost: 0,
                    raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                    attributes: [
                      {
                        key: "llm.prompt_template.template",
                        value: {
                          stringValue: "Create a summary based on: {summary}",
                        },
                      },
                      {
                        key: "llm.prompt_template.variables",
                        value: { stringValue: "summary,style,length" },
                      },
                      { key: "template.tokens", value: { intValue: "25" } },
                      {
                        key: "output.format",
                        value: { stringValue: "markdown" },
                      },
                      { key: "quality.check", value: { boolValue: true } },
                    ],
                    type: "llm_call",
                    children: [
                      {
                        id: "1-7-1-1-1-1",
                        title: "ChatPromptTemplate",
                        startTime: new Date("2023-01-01T00:02:27Z"),
                        endTime: new Date("2023-01-01T00:02:28Z"),
                        duration: 25000,
                        tokensCount: 6,
                        status: "success",
                        raw: `{"span_id": "template-002", "template": "summary_report", "format": "markdown"}`,
                        attributes: [
                          {
                            key: "llm.prompt_template.template",
                            value: {
                              stringValue:
                                "Create a summary based on: {summary}",
                            },
                          },
                          {
                            key: "llm.prompt_template.variables",
                            value: { stringValue: "summary,style,length" },
                          },
                          { key: "template.tokens", value: { intValue: "25" } },
                          {
                            key: "output.format",
                            value: { stringValue: "markdown" },
                          },
                          { key: "quality.check", value: { boolValue: true } },
                        ],
                        cost: 0,
                        type: "llm_call",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
