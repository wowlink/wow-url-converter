import {
    WowUrlConvertRequest,
    WowUrlConvertResponse,
    WowUrlConverter,
    WowUrlConverterConfig,
    WowUrlRankingItem,
} from "@wowlink/wow-interface";
import Fuse from 'fuse.js'

class BasicWowLinkConverter implements WowUrlConverter {
    config_: WowUrlConverterConfig;

    constructor(config: WowUrlConverterConfig) {
        this.config_ = config;
    }

    _populateSuggestions(req: WowUrlConvertRequest): WowUrlRankingItem[] {
        const searchOpt: Fuse.IFuseOptions<WowUrlRankingItem> = {
            includeScore: true,
            findAllMatches: true,
            threshold: 0.2,
            keys: ['fullUrl']
        };
        const searchList: WowUrlRankingItem[] = [];
        for (const wowUrl in this.config_.fetcherResponse.wowMapping) {
            const fullUrl: string = this.config_.fetcherResponse.wowMapping[wowUrl];
            searchList.push({fullUrl, wowUrl, score: 0});
        }
        const fuse = new Fuse<WowUrlRankingItem>(searchList, searchOpt);
        const searchRes: WowUrlRankingItem[] = [];
        fuse.search(req.wowUrl).forEach((res: Fuse.FuseResult<WowUrlRankingItem>) => {
            searchRes.push({
                wowUrl: res.item.wowUrl,
                fullUrl: res.item.fullUrl,
                score:res.score,
            });
        });
        return searchRes;
    }

    convert(req: WowUrlConvertRequest): WowUrlConvertResponse {
        const lookup: Record<string, string> = this.config_.fetcherResponse.wowMapping;
        const wowlink: string = req.wowUrl;
        const res: WowUrlConvertResponse = {
            fullUrl: "/",
        };
        if (wowlink in lookup) {
            res.fullUrl = lookup[wowlink];
        }
        res.searchRanking = this._populateSuggestions(req);
        return res;
    }
}

export { BasicWowLinkConverter };