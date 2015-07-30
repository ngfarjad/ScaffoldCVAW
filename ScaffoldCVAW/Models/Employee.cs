using System.Collections.Generic;

namespace ScaffoldCVAW.Models
{
    public class Employee
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public virtual ICollection<EmployeeSalary> EmployeeSalaries { get; set; }
    }

    public class EmployeeSalary
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }

        public int Amount { get; set; }

        public virtual Employee Employee { get; set; }
    }
}