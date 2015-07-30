using System.Data.Entity;

namespace ScaffoldCVAW.Models
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