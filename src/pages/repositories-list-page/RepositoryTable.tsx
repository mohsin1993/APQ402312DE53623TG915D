import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Repositories } from "../../types";
import { FC } from "react";
import { Box } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    minWidth: 200,
  },
  {
    field: "open_issues",
    headerName: "Open Issues",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    minWidth: 200,
  },
  {
    field: "watchers",
    headerName: "Stars",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
];

export const RepositoryTable: FC<{
  repositories: Repositories | undefined;
  isLoading: boolean;
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (newModel: { page: number; pageSize: number }) => void;
}> = ({ repositories, isLoading, paginationModel, onPaginationModelChange }) => {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rowSelection={false}
        loading={isLoading}
        slots={{
          noRowsOverlay: () => (
            <Box height="100%" display="grid" alignItems="center" justifyContent="center">
              No results found.
            </Box>
          ),
        }}
        pagination
        rowCount={repositories?.total_count ?? 0}
        rows={repositories?.items ?? []}
        paginationMode="server"
        columns={columns}
        paginationModel={paginationModel}
        pageSizeOptions={[5, 10, 20]}
        onPaginationModelChange={(model) => {
          onPaginationModelChange(model);
        }}
      />
    </Box>
  );
};
