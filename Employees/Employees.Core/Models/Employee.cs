using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int IdentityNumber { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public bool IsFemale { get; set; }
        public List<Role> Roles { get; set; }
        public bool IsActive { get; set; }
        public Employee()
        {
            //StartDate = DateOnly.FromDateTime(DateTime.Today);
            IsActive = true;
        }
    }
}
