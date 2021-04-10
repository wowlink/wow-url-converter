import { WowConvertRequest, WowConvertResponse, WowMappingsFetchResponse } from "wow-interface";

class WowUrlConverter {
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

export { WowUrlConverter };