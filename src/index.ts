import { WowMappingsFetchResponse } from "wow-interface";

class WowUrlConverter {
    wowMappingsFetchResponse_: WowMappingsFetchResponse

    constructor(wowMappingsFetchResponse: WowMappingsFetchResponse) {
        this.wowMappingsFetchResponse_ = wowMappingsFetchResponse;
    }
}

export { WowUrlConverter };