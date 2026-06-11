import { useForm, Controller } from "react-hook-form";
import { CreateStoryFormSchema } from "./create-form-schema";
import { StoryForm } from "./story-form-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateStory } from "@/features/library/hooks/useCreateStory";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/shared/components/shadcn/field";
import { Input } from "@/shared/components/shadcn/input";

export default function CreateStoryForm() {
  const form = useForm<StoryForm>({
    resolver: zodResolver(CreateStoryFormSchema),
    defaultValues: {
      title: "",
      synopsis: "",
      coverUrl: "",
      genre: [],
    },
  });
  const { mutateAsync, isPending } = useCreateStory();

  async function onSubmit(data: StoryForm) {
    return null;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Story Title</FieldLabel>
              <Input
                {...field}
                id="form-title"
                aria-invalid={fieldState.invalid}
                placeholder="The Greatest Story Ever Written."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
