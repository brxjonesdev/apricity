import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/shared/components/shadcn/field";
import { Input } from "@/shared/components/shadcn/input";
import { Textarea } from "@/shared/components/shadcn/textarea";
import { Button } from "@/shared/components/shadcn/button";
import { useUpdateSeriesMutation } from "@/entities/series";

const updateSeriesSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),

  desc: z
    .string()
    .trim()
    .max(500, "Description must be 500 characters or less"),
});

type FormValues = z.infer<typeof updateSeriesSchema>;

type Props = {
  title: string;
  desc: string;
  id: string;
  onSuccess: () => void
};

export default function UpdateSeriesDetails({ title, desc, id, onSuccess }: Props) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(updateSeriesSchema),
    defaultValues: {
      title,
      desc,
    },
  });

  const updateSeries = useUpdateSeriesMutation();
  const onSubmit = (values: FormValues) => {
    console.log(values)
    updateSeries.mutate({
      updates: {
        title: values.title,
        description: values.desc,
      },
      seriesId: id
    })
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-5">
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Title</FieldLabel>

              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Series title"
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="desc"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Description</FieldLabel>

              <Textarea
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Describe this series..."
                className="min-h-24 resize-y"
              />

              <FieldDescription>
                A short description of what this series is about.
              </FieldDescription>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </div>

      <div className="flex justify-end border-t pt-4">
        <Button type="submit" disabled={isSubmitting}>
          Save changes
        </Button>
      </div>
    </form>
  );
}