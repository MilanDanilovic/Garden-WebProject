using Microsoft.EntityFrameworkCore.Migrations;

namespace API_Basta.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PoljoprivrednikID",
                table: "Baste",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Poljoprivrednik",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Poljoprivrednik", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Baste_PoljoprivrednikID",
                table: "Baste",
                column: "PoljoprivrednikID");

            migrationBuilder.AddForeignKey(
                name: "FK_Baste_Poljoprivrednik_PoljoprivrednikID",
                table: "Baste",
                column: "PoljoprivrednikID",
                principalTable: "Poljoprivrednik",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Baste_Poljoprivrednik_PoljoprivrednikID",
                table: "Baste");

            migrationBuilder.DropTable(
                name: "Poljoprivrednik");

            migrationBuilder.DropIndex(
                name: "IX_Baste_PoljoprivrednikID",
                table: "Baste");

            migrationBuilder.DropColumn(
                name: "PoljoprivrednikID",
                table: "Baste");
        }
    }
}
