using Employees.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.DTOs
{
    public class RoleDto
    {
        public int Id { get; set; }
        public int RoleTypeId { get; set; }
        public DateOnly EntryDate { get; set; }
        public bool IsManager { get; set; }
        public int EmployeeId { get; set; }
    }
}
