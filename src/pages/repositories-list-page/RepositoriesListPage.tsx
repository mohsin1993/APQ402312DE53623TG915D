import { Alert, Box, Button, Typography } from "@mui/material";
import { RepositoryFilters } from "./RepositoryFilters";
import { AsyncAutocomplete } from "../../components/async-autocomplete/AsyncAutocomplete";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { FormSchema } from "./types";
import { Organization } from "../../types";
import { getRepositoriesQueryKey, useRepositories } from "../../api/useRepositories";
import { RepositoryTable } from "./RepositoryTable";
import { getOrganizationsQueryKey, useOrganizations } from "../../api/useOrganizations";

export const ListPage = () => {
  const [searchOrganizations, setSearchOrganizations] = useState("");
  const { isLoading, data, error } = useOrganizations(searchOrganizations);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [currentRepositoryFilters, setCurrentRepositoryFilters] = useState<FormSchema>({
    searchRepository: "",
  });

  const [reposPaginationModel, setReposPaginationModel] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 0, pageSize: 10 });

  const resetPaginationModel = useCallback(
    () => setReposPaginationModel((prev) => ({ ...prev, page: 0 })),
    []
  );

  const queryClient = useQueryClient();

  const {
    data: repositories,
    isFetching: isReposLoading,
    error: repositoriesError,
  } = useRepositories(organization?.login, currentRepositoryFilters, reposPaginationModel);

  const onRepositoryFiltersChange = useCallback(
    (filterVals: FormSchema) => {
      resetPaginationModel();
      setCurrentRepositoryFilters(filterVals);
    },
    [resetPaginationModel]
  );

  return (
    <Box>
      <Box>
        <AsyncAutocomplete
          isLoading={isLoading}
          placeholder="Organization"
          sx={{ width: "100%" }}
          options={data?.items ?? []}
          getOptionLabel={(option) => option.login}
          value={organization}
          updateSearchTerm={useCallback((val: string) => {
            setSearchOrganizations(val);
          }, [])}
          onChange={(_e, value) => {
            setOrganization(value);
            resetPaginationModel();
          }}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0, alignItems: "flex-start" } }}
              {...props}
            >
              <img loading="lazy" width="25" src={option.avatar_url} alt="organization avatar" />
              <Box>
                <Typography>{option.login}</Typography>
                {option.description && (
                  <Typography component="p" variant="caption" color="GrayText">
                    {option.description}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        />
        {!isLoading && error && (
          <Alert
            sx={{ mt: 1 }}
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  queryClient.refetchQueries({
                    queryKey: getOrganizationsQueryKey(searchOrganizations),
                  });
                }}
              >
                RETRY
              </Button>
            }
          >
            {error.message}
          </Alert>
        )}
      </Box>
      {organization && (
        <>
          <Box m={2} />
          <RepositoryFilters
            defaultFilters={currentRepositoryFilters}
            onFiltersChange={onRepositoryFiltersChange}
          />
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ mb: 2 }} variant="h5">
              Repositories
            </Typography>
            {!isReposLoading && repositoriesError && (
              <Alert
                sx={{ mb: 1 }}
                severity="warning"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => {
                      queryClient.refetchQueries({
                        queryKey: getRepositoriesQueryKey(
                          organization?.login,
                          currentRepositoryFilters,
                          reposPaginationModel
                        ),
                      });
                    }}
                  >
                    RETRY
                  </Button>
                }
              >
                Data in the table might be stale. {repositoriesError.message}
              </Alert>
            )}
            <RepositoryTable
              repositories={repositories}
              isLoading={isReposLoading}
              paginationModel={reposPaginationModel}
              onPaginationModelChange={setReposPaginationModel}
            />
          </Box>
        </>
      )}
    </Box>
  );
};
