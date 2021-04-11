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
        const res: WowUrlConvertResponse = {
            fullUrl: "na",
        };
        return res;
    }
}

export { BasicWowLinkConverter };