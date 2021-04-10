import {
    WowConvertRequest,
    WowConvertResponse,
    WowMappingsFetchResponse,
    WowLinkConverter
} from "wow-interface";

class BasicWowLinkConverter implements WowLinkConverter {
    wowMappingsFetchResponse_: WowMappingsFetchResponse

    constructor(wowMappingsFetchResponse: WowMappingsFetchResponse) {
        this.wowMappingsFetchResponse_ = wowMappingsFetchResponse;
    }

    convert(req: WowConvertRequest): WowConvertResponse {
        const res: WowConvertResponse = {
            fullLink: "na",
        }
        return res;
    }
}

export { BasicWowLinkConverter };