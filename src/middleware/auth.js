export function checkAdmin() {
  if (typeof window === "undefined") return false;

  const admin = localStorage.getItem("admin");

  return admin === "true";
}