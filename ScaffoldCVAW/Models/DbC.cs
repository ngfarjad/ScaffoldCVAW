using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AngularJSControllerScaffolding.Models
{
    public class DbC : DbContext
    {
        public DbC()
            : base("DbC")
        {

        }
        public DbSet<Employee> Employees { get; set; }
    }
}