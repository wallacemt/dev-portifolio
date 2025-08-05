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
}

export interface FormationResponse {
  formations: Formation[];
  texts: {
    title: string;
    description: string;
  };
}
