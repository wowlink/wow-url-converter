import { WowUrlConverter, WowUrlConverterConfig, WowUrlRankingItem } from "@wowlink/wow-interface";
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

    test("convert fuzzy match", () => {
        const config: WowUrlConverterConfig = {
            fetcherResponse: {
                wowMapping: {
                    "gh": "https://github.com",
                    "random": "https://some/random/url.com",
                }
            }
        };
        const converter: WowUrlConverter = new BasicWowLinkConverter(config);
        const conversionRes = converter.convert({ wowUrl: "github" });
        expect(conversionRes.searchRanking.length).toBeGreaterThan(0);
        const matchItem: WowUrlRankingItem = conversionRes.searchRanking[0];
        expect(matchItem.fullUrl).toMatch("https://github.com");
        expect(matchItem.wowUrl).toMatch("gh");
        expect(matchItem.score).toBeGreaterThan(0);
    });
});