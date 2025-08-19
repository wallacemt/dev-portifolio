export const FormationTypeValues = {
  Tecnologo: "technologist" as const,
  Tecnico: "technical" as const,
  Bootcamp: "bootcamp" as const,
  Curso: "course" as const,
  Certificado: "certificate" as const,
  PosGraduacao: "posGraduation" as const,
  Outro: "other" as const,
} as const;

export type FormationType = (typeof FormationTypeValues)[keyof typeof FormationTypeValues];

export interface Formation {
  id: string;
  title: string;
  institution: string;
  image: string;
  workload: number;
  initialDate: string;
  endDate: string;
  description: string;
  type: string;
  certificationUrl: string;
  concluded: boolean;
}

export interface FormationResponse {
  formations: Formation[];
  texts: {
    title: string;
    description: string;
    certificationText: string;
    stats: {
      formations: string;
      studyHours: string;
      institution: string;
      certificaos: string;
    };
  };
}
