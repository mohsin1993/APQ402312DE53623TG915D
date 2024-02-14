import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { AsyncAutocompleteProps } from "./types";

/**
 * Modifies MUI Autocomplete for remote data searching
 */
export const AsyncAutocomplete = <T extends { id: string | number }>({
  isLoading,
  placeholder,
  options,
  updateSearchTerm,
  debounceTimeout = 500,
  ...rest
}: AsyncAutocompleteProps<T>) => {
  const [open, setOpen] = React.useState(false);

  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("here", e.target.value);
    setInputValue(e.target.value);
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateSearchTerm(inputValue);
    }, debounceTimeout);

    return () => clearTimeout(timeoutId);
  }, [inputValue, updateSearchTerm, debounceTimeout]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={options ?? []}
      loading={isLoading}
      {...rest}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};
