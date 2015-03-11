using System.Web.Mvc;
using AngularJSControllerScaffolding.Models;

namespace AngularJSControllerScaffolding.Controllers
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
       
    }
}