package com.panda.empmgt.service.impl;

import com.panda.empmgt.entity.Employee;
import com.panda.empmgt.repository.EmployeeRepository;
import com.panda.empmgt.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Override
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Not Found"));
    }

    @Override
    public Employee updateEmployeeById(Long id, Employee newEmployee) {
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Not Found"));
        emp.setEmpAge(newEmployee.getEmpAge());
        emp.setEmpName(newEmployee.getEmpName());
        return employeeRepository.save(emp);
    }

    @Override
    public void deleteEmployeeById(Long id) {
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Not Found"));
        employeeRepository.delete(emp);
    }
}
