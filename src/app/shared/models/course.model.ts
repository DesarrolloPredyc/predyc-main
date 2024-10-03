import { Enterprise } from "./enterprise.model";
import { Modulo } from "./module.model";
import { Skill } from './skill.model';
import { DocumentReference } from "@angular/fire/compat/firestore"


export class Curso {


  public static collection = 'course'

  descripcion: string = ""
  metaDescripcion: string = ""
  resumen: string = ""
  nuevo: boolean = false
  proximamente: boolean = false;
  idioma: string = "Español"
  imagen: string = ""
  contenido: string = ""
  instructor: string = ""
  imagen_instructor: string = ""
  resumen_instructor: string = ""
  foto: string = ""
  id: string = ""
  //instructorFoto: string = ""
  instructorRef: DocumentReference = null
  instructorNombre: string = ""
  //instructorResumen: string = ""
  //modulos: Modulo[] = []
  skillsRef: DocumentReference<Skill>[] = []
  nivel: string = ""
  titulo: string = ""
  instructorDescripcion: string = ""
  vimeoFolderId: string = ""
  enterpriseRef: DocumentReference<Enterprise> = null
  idOld: string = ""
  duracion: number = 0
  customUrl: string = ""
  objetivos: ObjetivoCurso[] = []
  KeyWords:string = ""
  updatedAt: any = null
  isFree: boolean = false
}

export interface ObjetivoCurso {
  titulo: string
  descripcion: string
}
