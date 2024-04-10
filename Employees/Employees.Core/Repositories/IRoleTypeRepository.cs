using Employees.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Repositories
{
    public interface IRoleTypeRepository
    {
        Task<IEnumerable<RoleType>> GetAllAsync();
        Task<RoleType> GetByIdAsync(int id);
        Task<RoleType> AddAsync(RoleType roleType);
        Task<RoleType> UpdateAsync(int id, RoleType roleType);
        Task DeleteAsync(int id);
    }
}
