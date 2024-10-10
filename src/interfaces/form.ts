export type FormResponse = {
  projectId: number;
  xmlFormId: string;
  state: "open" | "closed" | "closing";
  enketoId: string;
  enketoOnceId: string;
  createdAt: string;
  updatedAt: string;
  keyId: any;
  version: string;
  hash: string;
  sha: string;
  sha256: string;
  draftToken: null | string;
  publishedAt: string;
  name: string;
};
