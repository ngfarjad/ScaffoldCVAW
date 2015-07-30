namespace ScaffoldCVAW.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EmployeeSalary : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.Employees");
            CreateTable(
                "dbo.Employees",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.EmployeeSalaries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EmployeeId = c.Int(nullable: false),
                        Amount = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Employees", t => t.EmployeeId, cascadeDelete: true)
                .Index(t => t.EmployeeId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EmployeeSalaries", "EmployeeId", "dbo.Employees");
            DropIndex("dbo.EmployeeSalaries", new[] { "EmployeeId" });
            DropTable("dbo.EmployeeSalaries");
            DropTable("dbo.Employees");
        }
    }
}
