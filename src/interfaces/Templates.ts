export interface Templates {
  templateId: string;
  templateTitle: string;
  surveyCategoryId?: string;
  accessType: string;
  formType: string;
  projectId?: string;
  templateFile?: string;
  numberOfQuestion?: number;
  description?: string;
  author?: string;
  createdAt: string;
  updatedAt: string;
  surveyCategory?: Categories;
}

export interface Categories {
  categoryId: string;
  categoryName: string;
}
