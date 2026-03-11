export type Person = {
  firstName: string;
  lastName?: string;
  relationship: "me" | "family" | "friend" | "colleague" | "other";
  key: string;
};
