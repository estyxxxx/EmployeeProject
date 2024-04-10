using Employees.Core.Models;
using Employees.Core.Repositories;
using Employees.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Service
{
    public class RoleTypeService : IRoleTypeService
    {
        private readonly IRoleTypeRepository _roleTypeRepository;
        public RoleTypeService(IRoleTypeRepository roleTypeRepository)
        {
            _roleTypeRepository = roleTypeRepository;
        }
        public async Task<IEnumerable<RoleType>> GetAllAsync()
        {
            return await _roleTypeRepository.GetAllAsync();
        }
        public async Task<RoleType> GetByIdAsync(int id)
        {
            return await _roleTypeRepository.GetByIdAsync(id);
        }
        public async Task<RoleType> AddAsync(RoleType roleType)
        {
            return await _roleTypeRepository.AddAsync(roleType);
        }
        public async Task<RoleType> UpdateAsync(int id, RoleType roleType)
        {
            return await _roleTypeRepository.UpdateAsync(id, roleType);
        }
        public async Task DeleteAsync(int id)
        {
            await _roleTypeRepository.DeleteAsync(id);
        }
    }
}
