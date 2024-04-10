using Employees.Core.Models;

namespace Employees.API.Models
{
    public class RolePostModel
    {
        public int RoleTypeId { get; set; }
        public DateOnly EntryDate { get; set; }
        public bool IsManager { get; set; }
        public int EmployeeId { get; set; }
    }
}
