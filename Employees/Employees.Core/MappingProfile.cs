using AutoMapper;
using Employees.Core.DTOs;
using Employees.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<EmployeeDto, Employee>().ReverseMap();
            CreateMap<RoleDto, Role>().ReverseMap();
        }
    }
}