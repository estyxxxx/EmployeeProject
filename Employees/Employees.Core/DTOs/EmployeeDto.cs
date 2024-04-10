using Employees.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int IdentityNumber { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public bool IsFemale { get; set; }
        public List<RoleDto> Roles { get; set; }
        public bool IsActive { get; set; }
    }
}
