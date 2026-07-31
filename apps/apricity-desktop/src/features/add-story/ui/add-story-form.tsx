import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import type { CreateStoryDTO } from "@/entities/story/api/dto/create-story.dto";
import { useCreateStoryMutation } from "@/entities/story";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/shared/components/shadcn/field";
import { Input } from "@/shared/components/shadcn/input";
import { Textarea } from "@/shared/components/shadcn/textarea";
import { Button } from "@/shared/components/shadcn/button";
import { useSeriesQuery } from "@/entities/series";
import { useActiveStory } from "@/app/layouts/contexts/active-story.context";

const createStorySchema = z.object({
  seriesId: z.string().optional(),

  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(32, "Title must be at most 32 characters."),

  synopsis: z
    .string()
    .max(500, "Synopsis must be at most 500 characters.")
    .optional(),

  coverImage: z
    .string()
    .url("Invalid cover image URL.")
    .optional()
    .or(z.literal("")),

  genre: z.array(z.string()),
});

type CreateStoryFormValues = z.infer<typeof createStorySchema>;
type AddStoryFormProps = {
  onSuccess?: () => void;
};


export function AddStoryForm({
  onSuccess,
}: AddStoryFormProps) {
  const { data: series = [] } = useSeriesQuery();
  const form = useForm<CreateStoryFormValues>({
    resolver: zodResolver(createStorySchema),

    defaultValues: {
      title: "aaaaaaaaaaaaaaa",
      synopsis: "",
      coverImage: "",
      genre: [],
      seriesId: ""
    },
  });

  const createStory = useCreateStoryMutation();

  function onSubmit(values: CreateStoryFormValues) {
      const payload: CreateStoryDTO = {
        ...values,
      };
  
      createStory.mutate(payload, {
        onSuccess: () => {
          console.log("biggie iggy")
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
      {/* Title */}
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Story Title
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter story title"
              autoComplete="off"
            />

            <FieldDescription>
              Provide a short title for your story.
            </FieldDescription>

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Synopsis */}
      <Controller
        name="synopsis"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Synopsis
            </FieldLabel>

            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Describe your story..."
              rows={5}
            />

            <FieldDescription>
              Add a brief description of the story.
            </FieldDescription>

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Cover Image */}
      <Controller
        name="coverImage"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Cover Image URL
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="https://example.com/image.jpg"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Genre */}
      <Controller
        name="genre"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="genre">
              Genres
            </FieldLabel>

            <Input
              id="genre"
              value={field.value.join(", ")}
              onChange={(event) => {
                field.onChange(
                  event.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                );
              }}
              placeholder="Fantasy, Adventure"
            />

            <FieldDescription>
              Separate genres with commas.
            </FieldDescription>

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <Controller
        name="seriesId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="seriesId">
              Series
            </FieldLabel>
      
            <select
              {...field}
              id="seriesId"
              aria-invalid={fieldState.invalid}
              className="border rounded-md p-2"
            >
              <option value="">
                No Series
              </option>
      
              {series.map((series) => (
                <option
                  key={series.seriesId}
                  value={series.seriesId}
                >
                  {series.title}
                </option>
              ))}
            </select>
      
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Button
              type="submit"
              disabled={createStory.isPending}
            >
              {createStory.isPending
                ? "Creating..."
                : "Create Story"}
            </Button>
    </form>
  );
}