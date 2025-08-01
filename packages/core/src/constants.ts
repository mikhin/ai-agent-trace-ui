export const badgeThemeClasses = {
  purple:
    "bg-purple-100 text-purple-500 dark:bg-purple-950/60 dark:text-purple-300",
  indigo:
    "bg-indigo-100 text-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-300",
  orange:
    "bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-300",
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-950/60 dark:text-teal-300",
  cyan: "bg-cyan-100 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-300",
  sky: "bg-sky-100 text-sky-600 dark:bg-sky-950/60 dark:text-sky-300",
  yellow:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-300",
  emerald:
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300",
  red: "bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-300",
  gray: "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300",
} as const;

export const LLM_ATTRIBUTES = {
  MODEL: "gen_ai.request.model",
  TOKENS_INPUT: "gen_ai.usage.input_tokens",
  TOKENS_OUTPUT: "gen_ai.usage.output_tokens",
  TOKENS_TOTAL: "gen_ai.usage.total_tokens",
  COST: "gen_ai.usage.cost",
  TEMPERATURE: "gen_ai.request.temperature",
  PROMPT: "gen_ai.request.prompt",
  RESPONSE: "gen_ai.response.text",
} as const;

export const VECTOR_DB_ATTRIBUTES = {
  OPERATION: "db.operation.name",
  COLLECTION: "db.collection.name",
  QUERY: "db.query.text",
} as const;
