export interface PrefixUrlMatcherRequest {
  targetUrl: string;
}

export interface PrefixUrlMatcherResult {
  shortUrl: string;
  fullUrl: string;
  postfix: string;
}

export interface PrefixUrlMatcherResponse {
  matches: PrefixUrlMatcherResult[];
}
