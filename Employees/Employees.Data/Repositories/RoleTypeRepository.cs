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
    public class RoleTypeRepository : IRoleTypeRepository
    {
        private readonly DataContext _context;
        public RoleTypeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<RoleType>> GetAllAsync()
        {
            return await _context.RoleTypes.ToListAsync();
        }
        public async Task<RoleType> GetByIdAsync(int id)
        {
            return await _context.RoleTypes.FirstAsync(t => t.Id == id);
        }
        public async Task<RoleType> AddAsync(RoleType roleType)
        {
            _context.RoleTypes.Add(roleType);
            await _context.SaveChangesAsync();
            return roleType;
        }
        public async Task<RoleType> UpdateAsync(int id, RoleType roleType)
        {
            RoleType roleTypeToUpdate = GetByIdAsync(id).Result;
            roleTypeToUpdate.Type = roleType.Type;
            await _context.SaveChangesAsync();
            return roleTypeToUpdate;
        }
        public async Task DeleteAsync(int id)
        {
            _context.RoleTypes.Remove(GetByIdAsync(id).Result);
            await _context.SaveChangesAsync();
        }
    }
}
