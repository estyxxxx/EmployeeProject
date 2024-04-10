using Employees.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Repositories
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetAllAsync();
        Task<Role> GetByIdAsync(int id);
        Task<Role> AddAsync(Role role);
        Task<Role> UpdateAsync(int id, Role role);
        Task DeleteAsync(int id);
    }
}
