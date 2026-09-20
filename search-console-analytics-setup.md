# QuickLaunch Search Submission and Measurement

Updated September 19, 2026.

## Published Assets

- Canonical site: https://quicklaunchconsulting.com/
- Sitemap: https://quicklaunchconsulting.com/sitemap.xml
- Robots: https://quicklaunchconsulting.com/robots.txt
- Sitemap lists 19 canonical URLs. `diagnostic.html` intentionally canonicalizes to the homepage and is not listed.
- GA4 ID `G-NPCCGNX5FQ` is already configured in `assets/js/site-config.js`. Confirm the account receives data and that this is the correct property. Clarity is optional and is not configured.

## Google Search Console

1. Add a Domain property for `quicklaunchconsulting.com` at https://search.google.com/search-console/ and verify by DNS TXT record with the domain owner's account. Do not invent a verification token.
2. Submit `https://quicklaunchconsulting.com/sitemap.xml` under Sitemaps.
3. Inspect the homepage, `founder-bottleneck.html`, `fractional-coo-consultant.html`, `ai-implementation-consultant.html`, `ai-systems.html`, `the-path.html`, and `apply.html`. Request indexing where available after confirming deployment.
4. Review canonical selection, crawl errors, and indexing over time. Submission does not guarantee ranking or indexing.

## Bing Webmaster Tools

1. Sign in at https://www.bing.com/webmasters/ with the owner's account.
2. Import the verified Google property or verify ownership directly.
3. Submit the same sitemap URL and inspect priority pages.

## Baseline and Follow-Up

Record indexed pages, non-brand query impressions and clicks, organic landing-page visits, and lead submissions. Review at 30 and 60 days. Check `generate_lead`, `book_fit_call_click`, `apply_path_click`, `diagnostic_access_click`, and `view_path_click` in GA4 and mark actual lead submissions as key events. Do not submit test leads to the live forms without coordination.

Google's AI Search guidance says no special GEO markup is required. Useful crawlable content and accurate structured data are more important than `llms.txt`, which is informational rather than a ranking lever.

Official guidance: https://developers.google.com/search/docs/appearance/ai-features and https://www4.bing.com/webmasters/help/sitemaps-3b5cf6ed .
