import { Story } from '@/entities/story';

export const StoryCard = ({ story }: { story: Story }) => {
  const { title, synopsis, coverImage, lastUpdated } = story;
  return (
    <div>
      {coverImage && <img src={coverImage} alt='Cover Image' />}
      <h2>{title}</h2>
      <p>Last Updated: {lastUpdated.toLocaleString()}</p>
      <p>Synopsis:</p>
      <p>{synopsis}</p>
    </div>
  );
};
