import type { Span } from "ai-agent-trace-ui-core";

export const sampleTreeViewData: Span[] = [
  {
    id: "1",
    title: "LLM Request Processing",
    startTime: new Date("2023-01-01T00:00:00Z"),
    duration: 200,
    cost: 50,
    children: [
      {
        id: "1-1",
        title: "User Input Processing",
        startTime: new Date("2023-01-01T00:01:00Z"),
        duration: 50,
        cost: 10,
        children: [
          {
            id: "1-1-1",
            title: "Prompt Normalization",
            startTime: new Date("2023-01-01T00:01:30Z"),
            duration: 20,
            cost: 5,
            children: [
              {
                id: "1-1-1-1",
                title: "Text Sanitization",
                startTime: new Date("2023-01-01T00:01:40Z"),
                duration: 10,
                cost: 2,
                children: [
                  {
                    id: "1-1-1-1-1",
                    title: "Special Character Handling",
                    startTime: new Date("2023-01-01T00:01:45Z"),
                    duration: 5,
                    cost: 1,
                  },
                  {
                    id: "1-1-1-1-2",
                    title: "Encoding Verification",
                    startTime: new Date("2023-01-01T00:01:50Z"),
                    duration: 5,
                    cost: 1,
                  },
                ],
              },
              {
                id: "1-1-1-2",
                title: "Language Detection",
                startTime: new Date("2023-01-01T00:02:00Z"),
                duration: 10,
                cost: 3,
                children: [
                  {
                    id: "1-1-1-2-1",
                    title: "Language Confidence Score",
                    startTime: new Date("2023-01-01T00:02:05Z"),
                    duration: 5,
                    cost: 1,
                  },
                  {
                    id: "1-1-1-2-2",
                    title: "Multilingual Handling",
                    startTime: new Date("2023-01-01T00:02:10Z"),
                    duration: 5,
                    cost: 1,
                  },
                ],
              },
            ],
          },
          {
            id: "1-1-2",
            title: "Context Assembly",
            startTime: new Date("2023-01-01T00:03:00Z"),
            duration: 30,
            cost: 8,
            children: [
              {
                id: "1-1-2-1",
                title: "Retrieval Augmentation",
                startTime: new Date("2023-01-01T00:03:10Z"),
                duration: 15,
                cost: 4,
                children: [
                  {
                    id: "1-1-2-1-1",
                    title: "Vector Search Operation",
                    startTime: new Date("2023-01-01T00:03:20Z"),
                    duration: 5,
                    cost: 2,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1-2",
        title: "Model Inference",
        startTime: new Date("2023-01-01T00:04:00Z"),
        duration: 100,
        cost: 30,
        children: [
          {
            id: "1-2-1",
            title: "Token Generation",
            startTime: new Date("2023-01-01T00:04:10Z"),
            duration: 40,
            cost: 15,
            children: [
              {
                id: "1-2-1-1",
                title: "Sampling Operation",
                startTime: new Date("2023-01-01T00:04:20Z"),
                duration: 20,
                cost: 7,
                children: [
                  {
                    id: "1-2-1-1-1",
                    title: "Temperature Application",
                    startTime: new Date("2023-01-01T00:04:25Z"),
                    duration: 10,
                    cost: 3,
                  },
                ],
              },
            ],
          },
          {
            id: "1-2-2",
            title: "Model Performance Metrics",
            startTime: new Date("2023-01-01T00:05:00Z"),
            duration: 50,
            cost: 15,
            children: [
              {
                id: "1-2-2-1",
                title: "Latency Measurements",
                startTime: new Date("2023-01-01T00:05:10Z"),
                duration: 20,
                cost: 7,
                children: [
                  {
                    id: "1-2-2-1-1",
                    title: "Token-wise Timing",
                    startTime: new Date("2023-01-01T00:05:15Z"),
                    duration: 10,
                    cost: 3,
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
    id: "2",
    title: "Function Calling Execution",
    startTime: new Date("2023-01-01T00:06:00Z"),
    duration: 150,
    cost: 40,
    children: [
      {
        id: "2-1",
        title: "Tool Selection",
        startTime: new Date("2023-01-01T00:06:30Z"),
        duration: 50,
        cost: 10,
        children: [
          {
            id: "2-1-1",
            title: "Function Matching",
            startTime: new Date("2023-01-01T00:06:40Z"),
            duration: 20,
            cost: 5,
            children: [
              {
                id: "2-1-1-1",
                title: "Parameter Extraction",
                startTime: new Date("2023-01-01T00:06:50Z"),
                duration: 10,
                cost: 3,
                children: [
                  {
                    id: "2-1-1-1-1",
                    title: "Type Validation",
                    startTime: new Date("2023-01-01T00:06:55Z"),
                    duration: 5,
                    cost: 1,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "2-2",
        title: "External API Call",
        startTime: new Date("2023-01-01T00:07:00Z"),
        duration: 100,
        cost: 30,
        children: [
          {
            id: "2-2-1",
            title: "HTTP Request",
            startTime: new Date("2023-01-01T00:07:10Z"),
            duration: 50,
            cost: 15,
            children: [
              {
                id: "2-2-1-1",
                title: "Response Processing",
                startTime: new Date("2023-01-01T00:07:20Z"),
                duration: 30,
                cost: 10,
                children: [
                  {
                    id: "2-2-1-1-1",
                    title: "Error Handling",
                    startTime: new Date("2023-01-01T00:07:25Z"),
                    duration: 10,
                    cost: 3,
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
    id: "3",
    title: "Response Post-processing",
    startTime: new Date("2023-01-01T00:08:00Z"),
    duration: 120,
    cost: 30,
    children: [
      {
        id: "3-1",
        title: "Content Filtering",
        startTime: new Date("2023-01-01T00:08:30Z"),
        duration: 60,
        cost: 20,
        children: [
          {
            id: "3-1-1",
            title: "Policy Evaluation",
            startTime: new Date("2023-01-01T00:08:40Z"),
            duration: 30,
            cost: 10,
            children: [
              {
                id: "3-1-1-1",
                title: "Toxicity Detection",
                startTime: new Date("2023-01-01T00:08:50Z"),
                duration: 15,
                cost: 5,
                children: [
                  {
                    id: "3-1-1-1-1",
                    title: "Category Classification",
                    startTime: new Date("2023-01-01T00:08:55Z"),
                    duration: 5,
                    cost: 2,
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
