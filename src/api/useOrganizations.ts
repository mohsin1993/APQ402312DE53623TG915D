import { useQuery } from "@tanstack/react-query";
import { Organizations } from "../types";
import { getGithubSearchQuery } from "./githubUtils";
import { getRequest } from "./getRequest";
import { getError } from "./getError";

export const OrganizationsKey = "organizations";

export const getOrganizationsQueryKey = (searchTerm: string) => [OrganizationsKey, searchTerm];

export const useOrganizations = (searchTerm: string) => {
  const githubQuery = getGithubSearchQuery(searchTerm, { type: "org" });

  return useQuery({
    queryKey: getOrganizationsQueryKey(searchTerm),
    queryFn: async () =>
      getRequest(`https://api.github.com/search/users?q=${githubQuery}`)
        .then(Organizations.parse)
        .catch(getError),
  });
};
