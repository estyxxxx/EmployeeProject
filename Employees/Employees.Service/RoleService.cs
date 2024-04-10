using Employees.Core.Models;
using Employees.Core.Repositories;
using Employees.Core.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Service
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }
        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _roleRepository.GetAllAsync();
        }
        public async Task<Role> GetByIdAsync(int id)
        {
            return await _roleRepository.GetByIdAsync(id);
        }
        public async Task<Role> AddAsync(Role role)
        {
            return await _roleRepository.AddAsync(role);
        }
        public async Task<Role> UpdateAsync(int id, Role role)
        {
            return await _roleRepository.UpdateAsync(id, role);
        }
        public async Task DeleteAsync(int id)
        {
            await _roleRepository.DeleteAsync(id);
        }
    }
}
