export interface SchemaField<T> {
  name: keyof T; 
  label: string; 
  type: "string" | "number" | "boolean"; 
}
