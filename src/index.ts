import {
  WowUrlConverter,
  WowUrlConverterConfig,
  BuiltInWowUrlConverterType,
} from "@wowlink/wow-interface";
import { BasicWowLinkConverter } from "./builtin_converters/exact/converter";

const WowUrlConverterFactory = (
  type: BuiltInWowUrlConverterType,
  config: WowUrlConverterConfig
): WowUrlConverter => {
  // TODO(@tianhaoz95): rename this to EXACT instead of BASIC to be more informative.
  if (type == BuiltInWowUrlConverterType.Basic) {
    return new BasicWowLinkConverter(config);
  } else {
    throw new Error(`Unknown converter type ${type}.`);
  }
};

export { WowUrlConverterFactory };
