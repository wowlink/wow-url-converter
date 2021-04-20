import {
    WowUrlConverter,
    WowUrlConverterConfig,
    BuiltInWowUrlConverterType
} from "@wowlink/wow-interface";
import { BasicWowLinkConverter } from "./builtin_converters/basic_converter";

const WowUrlConverterFactory = (type: BuiltInWowUrlConverterType, config: WowUrlConverterConfig): WowUrlConverter => {
    if (type == BuiltInWowUrlConverterType.Basic) {
        return new BasicWowLinkConverter(config);
    } else {
        throw new Error(`Unknown converter type ${type}.`);
    }
};

export { WowUrlConverterFactory };