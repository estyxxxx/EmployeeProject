using Employees.Core.DTOs;
using Employees.Core.Models;

namespace Employees.API.Models
{
    public class EmployeePostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int IdentityNumber { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public bool IsFemale { get; set; }
        public List<RolePostModel> Roles { get; set; }
    }
}
