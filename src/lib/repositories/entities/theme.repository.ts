import { Theme } from "@/lib/types";
import { EntityRepository } from "./entity.repository.index";

export interface ThemeRepository extends EntityRepository<Theme> {
  searchByKeyword(keyword: string): Promise<Theme[]>;
  getBySignificance(level: string): Promise<Theme[]>; // e.g. "primary" vs "secondary"
  getThemesForPlotThread(plotThreadId: string): Promise<Theme[]>;
}
