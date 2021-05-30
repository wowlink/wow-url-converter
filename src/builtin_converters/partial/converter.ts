import {
  WowUrlConverter,
  WowUrlConverterConfig,
  WowUrlConvertRequest,
  WowUrlConvertResponse,
} from "@wowlink/wow-interface";

/**
 * Utility interface for outputing intermedia result
 * from the prefix mather internal method.
 */
interface MatchPrefixResult {
  /**
   * If the prefix matches.
   */
  isMatch: boolean;
  /**
   * If the prefix matches, the rest of the wowlink.
   */
  postfix: string;
}

class PartialWowUrlConverter implements WowUrlConverter {
  config_: WowUrlConverterConfig;

  constructor(config: WowUrlConverterConfig) {
    this.config_ = config;
  }

  /**
   * Checks if there is a partial prefix match.
   *
   * @param targetWowlink The short link that the user types
   * @param wowlink The short link from the config
   * @returns A boolean indicating if the [wowlink] matches
   * the beginning of the [targetWowlink]. For example, if
   * the user input is gh/me, then it should be gh should
   * there be one in the config.
   */
  _matchPrefix(targetWowlink: string, wowlink: string): MatchPrefixResult {
    const res: MatchPrefixResult = {
      isMatch: false,
      postfix: "",
    };
    if (this._isPartialMatchReady(targetWowlink)) {
      return res;
    }
    const patternMatcher = new RegExp(`^${wowlink.replace("{{s}}", "")}/`);
    res.isMatch = patternMatcher.test(targetWowlink);
    if (res.isMatch) {
      res.postfix = targetWowlink.replace(patternMatcher, "");
    }
    return res;
  }

  /**
   * Checks if it is okay to partial match so that it will not
   * mess up other matchers. For example, if both gh/me and gh/{{s}}
   * exist, we need to make sure that gh/me will not match gh/{{s}}.
   *
   * @param link The link that should consist the partial matching
   * indicator. For example, {{s}} for now.
   * @returns A boolean indicating if it is okay to set up
   * this link for partial matching.
   */
  _isPartialMatchReady(link: string): boolean {
    const patternMatcher = new RegExp("{{s}}");
    return patternMatcher.test(link);
  }

  convert(req: WowUrlConvertRequest): WowUrlConvertResponse {
    const res: WowUrlConvertResponse = {
      isMatch: false,
      fullUrl: "",
    };
    const targetWowlink: string = req.wowUrl;
    if (!this._isPartialMatchReady(targetWowlink)) {
      return res;
    }
    let baseLink: string = "";
    let finalRes: MatchPrefixResult = {
      isMatch: false,
      postfix: "",
    };
    for (const wowlink in this.config_.fetcherResponse.wowMapping) {
      const res = this._matchPrefix(targetWowlink, wowlink);
      const fullLink = this.config_.fetcherResponse.wowMapping[wowlink];
      if (res.isMatch && res.postfix.length > finalRes.postfix.length) {
        finalRes = res;
        baseLink = fullLink;
      }
    }
    if (finalRes.isMatch) {
      res.isMatch = true;
      res.fullUrl = baseLink.replace("{{s}}", finalRes.postfix);
    }
    return res;
  }
}

export { PartialWowUrlConverter };
