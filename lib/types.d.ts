export interface UserType {
  email: string;
  id: string;
  links: LinkType[];
  plan: "Free" | "Premium";
}

export interface LinkType {
  backhalf: string;
  title: string;
  destination: string;
}
