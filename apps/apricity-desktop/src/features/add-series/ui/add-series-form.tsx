import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { useCreateSeriesMutation } from "@/entities/series";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/shared/components/shadcn/field";
import { Input } from "@/shared/components/shadcn/input";
import { Button } from "@/shared/components/shadcn/button";

const createSeriesSchema = z.object({
  title: z
    .string()
    .min(2, "Series title must be at least 2 characters.")
    .max(64, "Series title must be at most 64 characters."),
});

type CreateSeriesFormValues = z.infer<typeof createSeriesSchema>;

type AddSeriesFormProps = {
  onSuccess?: () => void;
};

export function AddSeriesForm({
  onSuccess,
}: AddSeriesFormProps) {
  const form = useForm<CreateSeriesFormValues>({
    resolver: zodResolver(createSeriesSchema),
    defaultValues: {
      title: "",
    },
  });

  const createSeries = useCreateSeriesMutation();

  function onSubmit(values: CreateSeriesFormValues) {
    createSeries.mutate(values, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Series Title
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="e.g. The Chronicles of Eldoria"
              autoComplete="off"
            />

            <FieldDescription>
              Give your series a name. You can add stories to it later.
            </FieldDescription>

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={createSeries.isPending}
        className="w-full"
      >
        {createSeries.isPending ? "Creating..." : "Create Series"}
      </Button>
    </form>
  );
}