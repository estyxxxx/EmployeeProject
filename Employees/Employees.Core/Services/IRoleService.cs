using Employees.Core.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Services
{
    public interface IRoleService
    {
        Task<IEnumerable<Role>> GetAllAsync();
        Task<Role> GetByIdAsync(int id);
        Task<Role> AddAsync(Role role);
        Task<Role> UpdateAsync(int id, Role role);
        Task DeleteAsync(int id);
    }
}
