export const useUserRole = () => {
  const role = localStorage.getItem("userRole");
  return role;
};

export const hasRole = (requiredRoles) => {
  const role = localStorage.getItem("userRole");
  if (Array.isArray(requiredRoles)) {
    return requiredRoles.includes(role);
  }
  return role === requiredRoles;
};
