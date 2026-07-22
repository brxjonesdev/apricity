import { ActDTO } from "./dto/act.dto";

export const mockActs: ActDTO[] = [
  {
    id: "act_1",
    story_id: "story_1",
    order: 1,
    title: "Act One - Introduction",
    last_modified_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "act_2",
    story_id: "story_1",
    order: 2,
    title: "Act Two - Rising Action",
    last_modified_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "act_3",
    story_id: "story_1",
    order: 3,
    title: "Act Three - Climax",
    last_modified_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "act_4",
    story_id: "story_1",
    order: 4,
    title: "Act Four - Falling Action",
    last_modified_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "act_5",
    story_id: "story_1",
    order: 5,
    title: "Act Five - Conclusion",
    last_modified_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "act_6",
    story_id: "story_1",
    order: 6,
    title: "Act Six - Epilogue",
    last_modified_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "act_7",
    story_id: "story_1",
    order: 7,
    title: "Act Seven - Postlude",
    last_modified_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "act_8",
    story_id: "story_1",
    order: 8,
    title: "Act Eight - Denouement",
    last_modified_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "act_9",
    story_id: "story_1",
    order: 9,
    title: "Act Nine - Resolution",
    last_modified_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "act_10",
    story_id: "story_1",
    order: 10,
    title: "Act Ten - Wrap Up",
    last_modified_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
  }
];
