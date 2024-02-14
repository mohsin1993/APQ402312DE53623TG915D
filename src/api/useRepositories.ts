import { useQuery } from "@tanstack/react-query";
import { Repositories } from "../types";
import { getGithubRangeQuery, getGithubSearchQuery } from "./githubUtils";
import { getRequest } from "./getRequest";
import { getError } from "./getError";

export const RepositoriesKey = "repositories";

export const getRepositoriesQueryKey = (
  org: string | undefined,
  params: Params,
  paginationModel: PaginationModel
) => [RepositoriesKey, org, params, paginationModel];

type Params = {
  searchRepository?: string;
  maximumStars?: number;
  minimumStars?: number;
};

type PaginationModel = { page: number; pageSize: number };

export const useRepositories = (
  org: string | undefined,
  params: Params,
  paginationModel: PaginationModel
) => {
  return useQuery({
    queryKey: [RepositoriesKey, org, params, paginationModel],
    queryFn: async () => {
      const githubQuery = getGithubSearchQuery(params.searchRepository, {
        org,
        archived: "false",
        stars: getGithubRangeQuery({ min: params.minimumStars, max: params.maximumStars }),
      });

      return getRequest(
        `https://api.github.com/search/repositories?q=${githubQuery}&page=${
          paginationModel.page + 1
        }&per_page=${paginationModel.pageSize}`
      )
        .then(Repositories.parse)
        .catch(getError);
    },
    placeholderData: (previousData) => previousData,
    enabled: !!org,
  });
};
