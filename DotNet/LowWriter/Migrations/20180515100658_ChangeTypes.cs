using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace LogWriter.Migrations
{
    public partial class ChangeTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PrecipitationTypes",
                table: "PrecipitationTypes");

            migrationBuilder.RenameTable(
                name: "PrecipitationTypes",
                newName: "StringValue");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StringValue",
                table: "StringValue",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_StringValue",
                table: "StringValue");

            migrationBuilder.RenameTable(
                name: "StringValue",
                newName: "PrecipitationTypes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PrecipitationTypes",
                table: "PrecipitationTypes",
                column: "Id");
        }
    }
}
