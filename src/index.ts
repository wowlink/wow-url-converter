import {
    WowConvertRequest,
    WowConvertResponse,
    WowLookupFetchResponse,
    WowLinkConverter
} from "wow-interface";

class BasicWowLinkConverter implements WowLinkConverter {
    wowLookupFetchResponse_: WowLookupFetchResponse

    constructor(WowLookupFetchResponse: WowLookupFetchResponse) {
        this.wowLookupFetchResponse_ = WowLookupFetchResponse;
    }

    convert(req: WowConvertRequest): WowConvertResponse {
        const res: WowConvertResponse = {
            fullLink: "na",
        }
        return res;
    }
}

export { BasicWowLinkConverter };