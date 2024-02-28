export type EnumType<T extends Record<string, Record<string, string>>> = {
    [K in keyof T]: any
  };