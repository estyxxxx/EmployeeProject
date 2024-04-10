using Employees.Core.Models;
using Employees.Core.Repositories;
using Employees.Core.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }
        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _employeeRepository.GetByIdAsync(id);
        }
        public async Task<Employee> AddAsync(Employee employee)
        {
            return await _employeeRepository.AddAsync(employee);
        }
        public async Task<Employee> UpdateAsync(int id, Employee employee)
        {
            return await _employeeRepository.UpdateAsync(id, employee);
        }
        public async Task DeleteAsync(int id)
        {
            await _employeeRepository.DeleteAsync(id);
        }
        public async Task<Role> GetRoleByTypeAndEmployeeIdAsync(int roleTypeId, int employeeId)
        {
            return await _employeeRepository.GetRoleByTypeAndEmployeeIdAsync(roleTypeId, employeeId);
        }
        public bool isValidRole(Employee employee)
        {
            var roleTypeIds = new HashSet<int>();
            foreach (var role in employee.Roles)
            {
                if (!roleTypeIds.Add(role.RoleTypeId))
                    return false;
                if (role.EntryDate < employee.StartDate)
                    return false;
            }
            return true;
        }
    }
}
