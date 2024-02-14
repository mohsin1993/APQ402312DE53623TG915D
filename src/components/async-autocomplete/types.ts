import { AutocompleteProps } from "@mui/material";

export type AsyncAutocompleteProps<OptionType> = {
  isLoading: boolean;
  placeholder: string;
  updateSearchTerm: (searchTerm: string) => void;
  debounceTimeout?: number;
} & Omit<
  AutocompleteProps<OptionType, undefined, undefined, undefined>,
  "renderInput" | "freeSolo" | "multiple" | "disableClearable"
>;
