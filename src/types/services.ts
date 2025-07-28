export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  category: "frontend" | "backend" | "fullstack" | "devops" | "mobile";
  complexity: "basic" | "intermediate" | "advanced";
  deliveryTime: string;
  price?: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface ServiceConnection {
  from: string;
  to: string;
  type: "data-flow" | "dependency" | "integration";
}

export interface ServicesApiResponse {
  services: Service[];
  connections: ServiceConnection[];
}
