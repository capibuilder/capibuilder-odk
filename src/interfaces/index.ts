export interface SurveyInterface {
  title?: string;
  date?: string;
  status?: string;
  enketoId?: string;
  projectId?: number;
  xmlFormId: string;
  draftToken?: null | string;
  isPublished?: boolean;
}

export interface ProjectInterface {
  id: number;
  name: string;
  description: any;
  archived: any;
  keyId: any;
  createdAt: string;
  updatedAt: any;
  deletedAt: any;
  verbs: string[];
  formList?: FormInterface[];
}

export interface FormInterface {
  projectId: number;
  xmlFormId: string;
  state: string;
  enketoId: string;
  enketoOnceId: string;
  createdAt: string;
  updatedAt: string;
  keyId: any;
  version: string;
  hash: string;
  sha: string;
  sha256: string;
  draftToken: any;
  publishedAt: string;
  name: string;
  submissions: number;
  entityRelated: boolean;
  reviewStates: ReviewStates;
  lastSubmission: string;
  excelContentType: any;
  createdBy: CreatedBy;
}

export interface ReviewStates {
  received: number;
  hasIssues: number;
  edited: number;
}

export interface CreatedBy {
  id: number;
  type: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
