import { zodResolver } from '@hookform/resolvers/zod';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/shared/components/shadcn/field';
import { Input } from '@/shared/components/shadcn/input';
import { Textarea } from '@/shared/components/shadcn/textarea';
import { Button } from '@/shared/components/shadcn/button';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { useUpdateStoryMutation } from '@/entities/story';

type Props = {
  storyId: string;
  title: string;
  synopsis: string;
  coverImage: string | null;
  closeModal: () => void;
};

const editFormSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters.')
    .max(32, 'Title must be at most 32 characters.'),

  synopsis: z
    .string()
    .max(500, 'Synopsis must be at most 500 characters.')
    .optional(),

  coverImage: z
    .string()
    .url('Invalid cover image URL.')
    .optional()
    .or(z.literal('')),
});

export function EditStoryDetailsForm({
  storyId,
  title,
  synopsis,
  coverImage,
  closeModal,
}: Props) {
  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title: title,
      synopsis: synopsis,
      coverImage: coverImage || '',
    },
  });
  const editStory = useUpdateStoryMutation();

  function onSubmit(data: z.infer<typeof editFormSchema>) {
    console.log(data);
    editStory.mutate(
      {
        update: {
          id: storyId,
          title: data.title,
          synopsis: data.synopsis,
          cover_image: data.coverImage,
        },
      },
      {
        onSuccess: () => {
          console.log('Add Toast');
          closeModal();
        },
      },
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Title */}
      <Controller
        name='title'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Story Title</FieldLabel>

            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder='Enter story title'
              autoComplete='off'
            />

            <FieldDescription>
              Provide a short title for your story.
            </FieldDescription>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Synopsis */}
      <Controller
        name='synopsis'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Synopsis</FieldLabel>

            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder='Describe your story...'
              rows={5}
            />

            <FieldDescription>
              Add a brief description of the story.
            </FieldDescription>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Cover Image */}
      <Controller
        name='coverImage'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Cover Image URL</FieldLabel>

            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder='https://example.com/image.jpg'
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type='submit' disabled={editStory.isPending}>
        {editStory.isPending ? 'Updating...' : 'Edit Story'}
      </Button>
    </form>
  );
}
