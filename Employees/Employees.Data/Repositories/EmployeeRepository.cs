using Employees.Core.Models;
using Employees.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _context.Employees.Include(e => e.Roles).ToListAsync();
        }
        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _context.Employees.Include(e => e.Roles).FirstAsync(e => e.Id == id);
        }
        public async Task<Employee> AddAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
        public async Task<Employee> UpdateAsync(int id, Employee employee)
        {
            Employee employeeToUpdate = GetByIdAsync(id).Result;
            employeeToUpdate.FirstName = employee.FirstName;
            employeeToUpdate.LastName = employee.LastName;
            employeeToUpdate.IdentityNumber = employee.IdentityNumber;
            employeeToUpdate.StartDate = employee.StartDate;
            employeeToUpdate.DateOfBirth = employee.DateOfBirth;
            employeeToUpdate.IsFemale = employee.IsFemale;
            employeeToUpdate.Roles = employee.Roles;
            employeeToUpdate.IsActive = employee.IsActive;
            await _context.SaveChangesAsync();
            return employeeToUpdate;
        }
        public async Task DeleteAsync(int id)
        {
            _context.Employees.Remove(GetByIdAsync(id).Result);
            await _context.SaveChangesAsync();
        }
        public async Task<Role> GetRoleByTypeAndEmployeeIdAsync(int roleTypeId, int employeeId)
        {
            return await _context.Roles.Where(r => r.RoleTypeId == roleTypeId && r.EmployeeId == employeeId).FirstOrDefaultAsync();
        }
    }
}
