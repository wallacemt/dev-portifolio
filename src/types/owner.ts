export interface OwnerResponse {
  id: string;
  name: string;
  email: string;
  avatar: string;
  about: string;
  occupation: string;
  birthDate: Date;
  cvLinkPT: string;
  cvLinkEN: string;
  welcomeMessage: string;
  buttons: {
    project: string;
    curriculo: string;
  };
}
export interface OwnerDataRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  about: string;
  occupation: string;
  birthDate: Date;
  cvLinkPT?: string;
  cvLinkEN?: string;
}

export type OwnerDataOptionalRequest = Partial<OwnerDataRequest>;
