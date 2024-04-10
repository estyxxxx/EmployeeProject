using AutoMapper;
using Employees.API.Models;
using Employees.Core.DTOs;
using Employees.Core.Models;

namespace Employees.API
{
    public class PostMappingProfile : Profile
    {
        public PostMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>();
            CreateMap<RolePostModel, Role>();
            CreateMap<RolePostModel, RoleDto>();
            CreateMap<RoleTypePostModel, RoleType>();
        }
    }
}
