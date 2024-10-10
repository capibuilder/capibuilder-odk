export interface Roles {
  id: number;
  name:
    | "Password Reset Token"
    | "Project Viewer"
    | "Administrator"
    | "Project Manager"
    | "App User"
    | "Form Viewer (system internal)"
    | "Data Collector"
    | "Public Link";
  system:
    | "pwreset"
    | "viewer"
    | "admin"
    | "manager"
    | "app-user"
    | "formview"
    | "formfill"
    | "pub-link";
  createdAt?: string | null;
  updatedAt: any;
}
