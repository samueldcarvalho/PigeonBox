using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PigeonBox.Infrastructure.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "latin1");

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(type: "varchar(100)", nullable: true),
                    email = table.Column<string>(type: "varchar(100)", nullable: true),
                    username = table.Column<string>(type: "varchar(100)", nullable: true),
                    password = table.Column<string>(type: "varchar(100)", nullable: true),
                    altered_at = table.Column<DateTime>(type: "datetime(0)", precision: 0, nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime(0)", precision: 0, nullable: false),
                    removed = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "id", "altered_at", "created_at", "email", "name", "password", "removed", "username" },
                values: new object[] { 1, new DateTime(2022, 7, 26, 20, 12, 19, 487, DateTimeKind.Local).AddTicks(7616), new DateTime(2022, 7, 26, 20, 12, 19, 488, DateTimeKind.Local).AddTicks(5694), "admin@admin.com.br", "Administrador", "@Asd123456789", false, "admin" });

            migrationBuilder.CreateIndex(
                name: "ix_Unique_Email",
                table: "user",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_Unique_Username",
                table: "user",
                column: "username",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
