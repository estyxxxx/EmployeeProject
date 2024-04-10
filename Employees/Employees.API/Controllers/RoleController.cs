using AutoMapper;
using Employees.API.Models;
using Employees.Core.DTOs;
using Employees.Core.Models;
using Employees.Core.Services;
using Employees.Service;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Employees.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RoleController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }
        // GET: api/<RoleController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var roles = _roleService.GetAllAsync().Result;
            return Ok(_mapper.Map<IEnumerable<RoleDto>>(roles));
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            Role role = _roleService.GetByIdAsync(id).Result;
            if (role == null)
                return NotFound($"Role number {id} does not exist");
            return Ok(role);
        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RolePostModel role)
        {
            Role roleToAdd = _mapper.Map<Role>(role);
            await _roleService.AddAsync(roleToAdd);
            return Ok(_mapper.Map<RoleDto>(role));
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] RolePostModel role)
        {
            Role roleToUpdate = _roleService.GetByIdAsync(id).Result;
            if (roleToUpdate is null)
                return NotFound($"Role number {id} does not exist");
            _mapper.Map(role, roleToUpdate);
            await _roleService.UpdateAsync(id, roleToUpdate);
            return Ok(_mapper.Map<RoleDto>(roleToUpdate));
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            Role roleToDelete = _roleService.GetByIdAsync(id).Result;
            if (roleToDelete is null)
                return NotFound($"Role number {id} does not exist");
            await _roleService.DeleteAsync(id);
            return Ok($"Role number {id} deleted successfully");
        }
    }
}
