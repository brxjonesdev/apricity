export type EntityConfig<DB, DTO, Form = never> = {
  dbToDTO: (db: DB) => DTO;
  dtoToForm: (dto: DTO) => Form;
  formToDTO: (form: Form) => Omit<DTO, "id">;
};

export function defineEntity<DB, DTO, Form = never>(
  config: EntityConfig<DB, DTO, Form>,
) {
  return {
    ...config,

    mapDbToDTO(db: DB) {
      return config.dbToDTO(db);
    },

    mapDtoToForm(dto: DTO) {
      return config.dtoToForm?.(dto);
    },

    mapFormToDTO(form: Form) {
      return config.formToDTO?.(form);
    },
  };
}
