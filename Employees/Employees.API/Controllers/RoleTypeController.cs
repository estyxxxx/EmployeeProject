using AutoMapper;
using Employees.API.Models;
using Employees.Core.DTOs;
using Employees.Core.Models;
using Employees.Core.Services;
using Employees.Service;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Employees.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleTypeController : ControllerBase
    {
        private readonly IRoleTypeService _roleTypeService;
        private readonly IMapper _mapper;
        public RoleTypeController(IRoleTypeService roleTypeService, IMapper mapper)
        {
            _roleTypeService = roleTypeService;
            _mapper = mapper;
        }
        // GET: api/<RoleTypeController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var roleTypes = _roleTypeService.GetAllAsync().Result;
            return Ok(roleTypes);
        }

        // GET api/<RoleTypeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            RoleType roleType = _roleTypeService.GetByIdAsync(id).Result;
            if (roleType == null)
                return NotFound($"Role type number {id} does not exist");
            return Ok(roleType);
        }

        // POST api/<RoleTypeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RoleTypePostModel roleType)
        {
            RoleType roleTypeToAdd = _mapper.Map<RoleType>(roleType);
            await _roleTypeService.AddAsync(roleTypeToAdd);
            return Ok(roleTypeToAdd);
        }
        // PUT api/<RoleTypeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] RoleTypePostModel roleType)
        {
            RoleType roleTypeToUpdate = _roleTypeService.GetByIdAsync(id).Result;
            if (roleTypeToUpdate is null)
                return NotFound($"Role type number {id} does not exist");
            _mapper.Map(roleType, roleTypeToUpdate);
            await _roleTypeService.UpdateAsync(id, roleTypeToUpdate);
            return Ok(roleTypeToUpdate);
        }

        // DELETE api/<RoleTypeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            RoleType roleTypeToDelete = _roleTypeService.GetByIdAsync(id).Result;
            if (roleTypeToDelete is null)
                return NotFound($"Role type number {id} does not exist");
            await _roleTypeService.DeleteAsync(id);
            return Ok($"Role type number {id} deleted successfully");
        }
    }
}
