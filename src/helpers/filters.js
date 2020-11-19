/**
 * Simple filters for Employees.
 */
export const filterEmployees = (filter, employees) => {
  let filteredList = [...employees];
  // Filter By Role
  if (filter.role !== "all") {
    filteredList = filteredList.filter(
      employee => employee.role === filter.role
    );
  }

  // Filter By is Archive
  if (filter.isArchive !== false) {
    filteredList = filteredList.filter(employee => employee.isArchive === true);
  }
  return filteredList;
};
