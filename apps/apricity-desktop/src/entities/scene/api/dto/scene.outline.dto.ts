export type SceneOutlineDTO = {
  scene_id: string;
  chapter_id: string;
  story_id: string;
  title: string | null;
  order: number;
  // no content, no synopsis — never sent by Rust in the first place
};