type SchemaField<T> = {
  name: keyof T;
  label: string;
  type: "string" | "number" | "boolean" | "object";
  displayFields?: { key: string; label: string }[];
};

export default SchemaField;