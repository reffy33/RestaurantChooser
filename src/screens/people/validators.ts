export function validateFirstName(name: string) {
  if (!name) {
    return "First name is required";
  }
  return validateName(name);
}

export function validateName(name: string) {
  if (/\s/.test(name)) {
    return "Name cannot contain spaces";
  }

  return null;
}
