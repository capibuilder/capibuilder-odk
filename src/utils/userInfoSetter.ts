export interface User {
  email?: string;
  id?: number;
  type?: string;
  displayName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
}

export function UserSetter(data: User) {
  const Name: string[] = data.displayName?.split("::") as string[];
  if (Name[1]) {
    localStorage.setItem("projectId", Name[1]);
  }
  localStorage.setItem("user-details", JSON.stringify(data));
  localStorage.setItem("displayName", Name[0]);
}
