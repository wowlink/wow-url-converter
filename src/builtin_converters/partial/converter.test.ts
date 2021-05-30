import {
  WowUrlConverterConfig,
  WowUrlConvertRequest,
  WowUrlConvertResponse,
} from "@wowlink/wow-interface";
import { PartialWowUrlConverter } from "./converter";

const config: WowUrlConverterConfig = {
  fetcherResponse: {
    wowMapping: {
      "gh/{{s}}": "https://github.com/{{s}}",
    },
  },
};

describe("Partial URL converter tests", () => {
  test("Partial match", () => {
    const converter: PartialWowUrlConverter = new PartialWowUrlConverter(
      config
    );
    const req: WowUrlConvertRequest = {
      wowUrl: "gh/me",
    };
    const res: WowUrlConvertResponse = converter.convert(req);
    expect(res.isMatch).toBeTruthy();
    expect(res.fullUrl).toMatch("https://github.com/me");
  });
});
