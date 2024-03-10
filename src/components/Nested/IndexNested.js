const companyData = require('../data/companies.json');
const departmentData = require('../data/departments.json');
const employeeData = require('../data/employees.json');

export const companies = companyData;
export const departments = departmentData.map(({ companyId, ...rest }) => ({
    ...rest,
    company: companies.find(({ id }) => id === companyId),
}));
export const employees = employeeData.map(({ departmentId, ...rest }) => ({
    ...rest,
    department: departments.find(({ id }) => id === departmentId),
}));