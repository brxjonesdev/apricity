export type SeriesDTO = {
  id: string;
  title: string;
  description: string;
};

export type CreateSeriesDTO = {
  title: string;
};

export type UpdateSeriesDTO = {
  title?: string;
  description?: string;
};
