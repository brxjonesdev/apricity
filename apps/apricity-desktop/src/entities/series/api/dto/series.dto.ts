export type SeriesDTO = {
  id: string;
  title: string;
};

export type CreateSeriesDTO = {
  title: string;
};

export type UpdateSeriesDTO = {
  title?: string;
};
