export interface Badge {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  issuer: string;
  issueDate: string;
  badgeUrl?: string;
  ownerId: string;
  createdAt: string;
}

export interface BadgeResponse {
  texts: {
    title: string;
    description: string;
  };
  badges: Badge[];
}

export interface BadgeInput {
  title: string;
  description: string;
  imageUrl: string;
  issuer: string;
  issueDate: string;
  badgeUrl?: string;
}

export interface Certification {
  id: string;
  title: string;
  description: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl: string;
  certificateFile?: string;
  ownerId: string;
  createdAt: string;
}

export interface CertificationInput {
  title: string;
  description: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl: string;
  certificateFile?: string;
}

export interface UploadResult {
  url: string;
  publicId: string;
  format: string;
  resourceType: string;
  bytes: number;
}

export interface UploadOptions {
  folder?: string;
  filename?: string;
  resourceType?: "image" | "raw" | "video" | "auto";
  allowedFormats?: string[];
}
