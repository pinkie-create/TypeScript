export interface User {
  userName: string;
  URL: string;
}

export function isUser(object: unknown): object is User {
  if (object != null && typeof object === "object") {
    return "username" in object && "avatarUrl" in object;
  }
  return false;
}
