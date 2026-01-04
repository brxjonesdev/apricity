export type Project = {
  userId: string;
  id: string;
  name: string;
  blurb?: string;
  createdAt: Date;
  updatedAt: Date;
};
export type CreateProjectDTO = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProjectDTO = Partial<
  Omit<Project, 'id' | 'userId' | 'createdAt'>
>;
