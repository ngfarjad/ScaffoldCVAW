using System.Web.Mvc;
using ScaffoldCVAW.Models;

namespace ScaffoldCVAW.Controllers
{   
    public class EmployeesController : Controller
    {
		//
        // GET: /Employees/
		#region Index
        public ActionResult Index()
        {
              return View();
        }
		#endregion

        public ActionResult Create()
        {
            return View();
        }
        public ActionResult Edit(int id)
        {
            ViewBag.Id = id;
            return View();
        }
    }
}