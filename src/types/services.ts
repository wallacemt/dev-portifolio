export interface ServicesResponse {
  services: Services[];
  connections: Connection[];
  texts: {
    title: string;
    description: string;
    cta: string;
    ctaBtn: string;
  };
}

export interface Services {
  id: string;
  sId: string;
  title: string;
  description: string;
  category: "frontend" | "backend" | "fullstack" | "devops" | "mobile";
  complexity: "intermediario" | "avancado" | "basico";
  complexityTier:number;
  deliveryTime: string;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  technologies: Technology[];
}

export interface Technology {
  title: string;
  id: string;
}

export interface Connection {
  id: string;
  fromId: string;
  toId: string;
  type: "data-flow" | "dependency" | "integration";
}
