using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.Models
{
    public class Role
    {
        public int Id {  get; set; }
        public int RoleTypeId { get; set; }
        public RoleType RoleType { get; set; }
        public DateOnly EntryDate { get; set; }
        public bool IsManager { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}
