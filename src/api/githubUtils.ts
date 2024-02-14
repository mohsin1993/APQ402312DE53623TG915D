/*
Utilities for github search api
https://docs.github.com/en/search-github/getting-started-with-searching-on-github/about-searching-on-github
 */

export const getGithubSearchQuery = (
  searchTerm: string | undefined,
  subfilters: Record<string, string | undefined> = {}
) => {
  const query = Object.keys(subfilters)
    .reduce(
      (result, item) =>
        typeof subfilters[item] === "undefined" ? result : `${result} ${item}:${subfilters[item]}`,
      `${searchTerm ?? ""}`
    )
    .trim();

  return encodeURIComponent(query);
};

/* Returns range query according to following github documentation
https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax
*/
export const getGithubRangeQuery = ({ min, max }: { min?: number; max?: number }) =>
  typeof min !== "undefined" || typeof max !== "undefined"
    ? `${min ?? "*"}..${max ?? "*"}`
    : undefined;
