export type EnumType<T extends Record<string, Record<string, any>>> = {
    [K in keyof T]: any
  };