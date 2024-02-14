import { Box, Grid, TextField, debounce } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema } from "./types";
import { FC, useEffect } from "react";
import { stringToNumber } from "../../utils/stringToNumber";

export const RepositoryFilters: FC<{
  defaultFilters: FormSchema;
  onFiltersChange: (newFilters: FormSchema) => void;
  debounceTimeout?: number;
}> = ({ defaultFilters, onFiltersChange, debounceTimeout = 1000 }) => {
  const {
    register,
    trigger,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultFilters,
  });

  const maximumField = register("maximumStars", {
    setValueAs: stringToNumber,
  });
  const minimumField = register("minimumStars", { setValueAs: stringToNumber });

  useEffect(() => {
    const debouncedCb = debounce(() => {
      // update the filter values in parent if local values are valid
      if (isValid) {
        const newVals = getValues();
        onFiltersChange(newVals);
      }
    }, debounceTimeout);

    // call debounced callback on every value change
    const subscription = watch(debouncedCb);

    return () => {
      subscription.unsubscribe();
      debouncedCb.clear();
    };
  }, [watch, onFiltersChange, getValues, debounceTimeout, isValid]);

  return (
    <Box>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Search Repository"
              type="string"
              {...register("searchRepository")}
              fullWidth
              error={!!errors.searchRepository}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Minimum Stars"
              type="number"
              {...minimumField}
              fullWidth
              helperText={errors.minimumStars?.message}
              error={!!errors.minimumStars}
              size="small"
              onChange={(e) => {
                minimumField.onChange(e);
                // trigger the validation of maximumStars as well to revalidate range
                trigger(["maximumStars"]);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Maximum Stars"
              type="number"
              size="small"
              {...maximumField}
              error={!!errors.maximumStars}
              fullWidth
              helperText={errors.maximumStars?.message}
              onChange={(e) => {
                maximumField.onChange(e);
                // trigger the validation of minimumStars as well to revalidate range
                trigger(["minimumStars"]);
              }}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
