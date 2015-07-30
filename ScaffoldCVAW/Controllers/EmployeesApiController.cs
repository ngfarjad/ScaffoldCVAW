using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using ScaffoldCVAW.Models;

namespace ScaffoldCVAW.Controllers
{
	[Route("api/EmployeesApi/{id?}", Name = "api_EmployeesApi")]
	public class EmployeesApiController : ApiController 
	{
		private readonly DbC _db = new DbC();
		
		public List<Employee> GetAll()
		{
			return _db.Employees.ToList();
		}

		public IHttpActionResult GetEmployee(int id)
		{
			Employee employee = _db.Employees.Include(m=>m.EmployeeSalaries).Single(m=>m.Id == id);
			if (employee == null)
			{
				return NotFound();
			}

			return Ok(employee);
		}

		public IHttpActionResult PostEmployee(Employee employee)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			_db.Employees.Add(employee);
			_db.SaveChanges();

			return CreatedAtRoute("api_EmployeesApi", new { id = employee.Id }, employee);
		}

		public IHttpActionResult PutEmployee(int id, Employee employee)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			if (id != employee.Id)
			{
				return BadRequest();
			}

			_db.Entry(employee).State = EntityState.Modified;

			try
			{
				_db.SaveChanges();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!EmployeeExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return StatusCode(HttpStatusCode.NoContent);
		}

		public IHttpActionResult DeleteEmployee(int id)
		{
			Employee employee = _db.Employees.Find(id);
			if (employee == null)
			{
				return NotFound();
			}

			_db.Employees.Remove(employee);
			_db.SaveChanges();

			return Ok(employee);
		}

		private bool EmployeeExists(int id)
		{
			return _db.Employees.Count(m => m.Id == id) > 0;
		}
	}
}