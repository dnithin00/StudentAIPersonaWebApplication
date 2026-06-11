using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StudentQuizzes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    StudentName = table.Column<string>(type: "TEXT", nullable: false),
                    KnowledgeScore = table.Column<int>(type: "INTEGER", nullable: false),
                    UtilityScore = table.Column<int>(type: "INTEGER", nullable: false),
                    JobFearScore = table.Column<int>(type: "INTEGER", nullable: false),
                    EthicsScore = table.Column<int>(type: "INTEGER", nullable: false),
                    OpportunityScore = table.Column<int>(type: "INTEGER", nullable: false),
                    ConcreteExamplesScore = table.Column<int>(type: "INTEGER", nullable: false),
                    AssignedPersona = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentQuizzes", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentQuizzes");
        }
    }
}
