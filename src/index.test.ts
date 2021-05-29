import {
  BuiltInWowUrlConverterType,
  WowUrlConverter,
  WowUrlConverterConfig,
} from "@wowlink/wow-interface";
import { WowUrlConverterFactory } from ".";

describe("Top level factory tests", () => {
  test("Create basic converter", () => {
    const config: WowUrlConverterConfig = {
      fetcherResponse: {
        wowMapping: {},
      },
    };
    const converter: WowUrlConverter = WowUrlConverterFactory(
      BuiltInWowUrlConverterType.Basic,
      config
    );
    expect(converter).toBeDefined();
  });
});
