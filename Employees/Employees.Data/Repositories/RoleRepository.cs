using Employees.Core.Models;
using Employees.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _context.Roles.Include(r => r.RoleType).ToListAsync();
        }
        public async Task<Role> GetByIdAsync(int id)
        {
            return await _context.Roles.Include(r => r.RoleType).FirstAsync(r => r.Id == id);
        }
        public async Task<Role> AddAsync(Role role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            return role;
        }
        public async Task<Role> UpdateAsync(int id, Role role)
        {
            Role roleToUpdate = GetByIdAsync(id).Result;
            roleToUpdate.RoleTypeId = role.RoleTypeId;
            roleToUpdate.RoleType = role.RoleType;
            roleToUpdate.IsManager = role.IsManager;
            roleToUpdate.EntryDate = role.EntryDate;
            roleToUpdate.EmployeeId = role.EmployeeId;
            roleToUpdate.Employee = role.Employee;
            await _context.SaveChangesAsync();
            return roleToUpdate;
        }
        public async Task DeleteAsync(int id)
        {
            _context.Roles.Remove(GetByIdAsync(id).Result);
            await _context.SaveChangesAsync();
        }
    }
}
