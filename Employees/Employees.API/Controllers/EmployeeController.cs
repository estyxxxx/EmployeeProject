using AutoMapper;
using Employees.API.Models;
using Employees.Core.DTOs;
using Employees.Core.Models;
using Employees.Core.Repositories;
using Employees.Core.Services;
using Employees.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Employees.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var employees = _employeeService.GetAllAsync().Result;
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            Employee employee = _employeeService.GetByIdAsync(id).Result;
            if (employee == null) 
                return NotFound($"Employee number {id} does not exist");
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            Employee employeeToAdd = _mapper.Map<Employee>(employee);
            if (!_employeeService.isValidRole(employeeToAdd))
                throw new ArgumentException("Validation error");
            await _employeeService.AddAsync(employeeToAdd);
            return Ok(_mapper.Map<EmployeeDto>(employeeToAdd));
        }
        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            Employee employeeToUpdate = _employeeService.GetByIdAsync(id).Result;
            if (employeeToUpdate is null)
                return NotFound($"Employee number {id} does not exist");
            _mapper.Map(employee, employeeToUpdate);
            if (!_employeeService.isValidRole(employeeToUpdate))
                throw new ArgumentException("Validation error");
            await _employeeService.UpdateAsync(id, employeeToUpdate);
            return Ok(_mapper.Map<EmployeeDto>(employeeToUpdate));
        }

        [HttpPut("{id}/isActive")]
        public async Task<ActionResult> Put(int id, bool isActive)
        {
            Employee employeeToUpdate = _employeeService.GetByIdAsync(id).Result;
            if (employeeToUpdate is null)
                return NotFound($"Employee number {id} does not exist");
            employeeToUpdate.IsActive = isActive;
            await _employeeService.UpdateAsync(id, employeeToUpdate);
            return Ok(_mapper.Map<EmployeeDto>(employeeToUpdate));
        }
        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            Employee employeeToDelete = _employeeService.GetByIdAsync(id).Result;
            if (employeeToDelete is null)
                return NotFound($"Employee number {id} does not exist");
            await _employeeService.DeleteAsync(id);
            return Ok($"Role type number {id} deleted successfully");
        }
        
    }
}
