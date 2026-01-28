
import {createSupabaseChapterRepo} from './chapter.repo';
import {createSupabaseImageRepo} from './image.repo';
import {createSupabaseManuscriptRepo} from './manuscript.repo';
import {createSupabaseSceneRepo} from './scene.repo';
import { createSupabaseProjectRepo } from './projects.repo';

export default function createSupabaseRepositories() {
  return {
    chapterRepo: createSupabaseChapterRepo(),
    imageRepo: createSupabaseImageRepo(),
    manuscriptRepo: createSupabaseManuscriptRepo(),
    sceneRepo: createSupabaseSceneRepo(),
    projectRepo: createSupabaseProjectRepo(),
  };
}
