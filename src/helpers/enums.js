/**
 * Simple enum for EmployeeRoles.
 */
export const employeeRoles = (role = null, value = null) => {
  const roles = {
    driver: { name: "Водитель" },
    cook: { name: "Повар" },
    waiter: { name: "Официант" }
  };

  if (role !== null && value !== null) {
    return roles[role][value];
  } else {
    return roles;
  }
};
