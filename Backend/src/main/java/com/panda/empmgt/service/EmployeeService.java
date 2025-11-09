package com.panda.empmgt.service;

import com.panda.empmgt.entity.Employee;

import java.util.List;

public interface EmployeeService {
    Employee addEmployee(Employee employee);

    List<Employee> getAllEmployee();

    Employee getEmployeeById(Long id);

    Employee updateEmployeeById(Long id, Employee newEmployee);

    void deleteEmployeeById(Long id);
}
