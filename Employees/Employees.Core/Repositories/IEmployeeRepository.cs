using Employees.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee> GetByIdAsync(int id);
        Task<Employee> AddAsync(Employee employee);
        Task<Employee> UpdateAsync(int id, Employee employee);
        Task DeleteAsync(int id);
        Task<Role> GetRoleByTypeAndEmployeeIdAsync(int roleTypeId, int employeeId);
    }
}
