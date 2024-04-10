using Employees.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee> GetByIdAsync(int id);
        Task<Employee> AddAsync(Employee employee);
        Task<Employee> UpdateAsync(int id, Employee employee);
        Task DeleteAsync(int id);
        Task<Role> GetRoleByTypeAndEmployeeIdAsync(int roleTypeId, int employeeId);
        bool isValidRole(Employee employee);
    }
}
