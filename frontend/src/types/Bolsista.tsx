import { HorarioBolsista } from "./HorarioBolsista";

export type Bolsista = {
  id: number;
  nome: string;
  email: string;
  matricula: string;
  curso: string;
  periodo: string;
  horarios?: HorarioBolsista[]; 
}
