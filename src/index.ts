import {
    WowUrlConvertRequest,
    WowUrlConvertResponse,
    WowUrlConverter,
    WowUrlConverterConfig
} from "wow-interface";

class BasicWowLinkConverter implements WowUrlConverter {
    config_: WowUrlConverterConfig;

    constructor(config: WowUrlConverterConfig) {
        this.config_ = config;
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
        return res;
    }
}

export { BasicWowLinkConverter };