import { WowUrlConverter, WowUrlConverterConfig } from "@wowlink/wow-interface";
import { BasicWowLinkConverter } from "./basic_converter";

describe("Basic converter tests", () => {
    test("initialize basic converter", () => {
        const config: WowUrlConverterConfig = {
            fetcherResponse: {
                wowMapping: {}
            }
        };
        const converter: WowUrlConverter = new BasicWowLinkConverter(config);
        expect(converter).toBeDefined();
    });

    test("convert exact match", () => {
        const config: WowUrlConverterConfig = {
            fetcherResponse: {
                wowMapping: {
                    "gh": "https://github.com"
                }
            }
        };
        const converter: WowUrlConverter = new BasicWowLinkConverter(config);
        expect(converter.convert({
            wowUrl: "gh"
        }).fullUrl).toMatch("https://github.com");
    });
});