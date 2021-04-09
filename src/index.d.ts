interface WowContext {
    mappingSource: "github" | "gist" | "local" | "custom";
    wowMapping: Record<string, string>;
}