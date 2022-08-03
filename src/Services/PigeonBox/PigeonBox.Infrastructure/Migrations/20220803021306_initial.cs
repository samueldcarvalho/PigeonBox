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

            migrationBuilder.CreateTable(
                name: "chat",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    title = table.Column<string>(type: "varchar(100)", nullable: true),
                    description = table.Column<byte[]>(type: "BLOB", nullable: true),
                    creator_user_id = table.Column<int>(type: "int", nullable: false),
                    altered_at = table.Column<DateTime>(type: "datetime(0)", precision: 0, nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime(0)", precision: 0, nullable: false),
                    removed = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_chat", x => x.id);
                    table.ForeignKey(
                        name: "fk_chat_users_creator_user_id",
                        column: x => x.creator_user_id,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "chat_notification",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    text = table.Column<string>(type: "varchar(100)", nullable: true),
                    chat_id = table.Column<int>(type: "int", nullable: false),
                    sent = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    sent_at = table.Column<DateTime>(type: "datetime(0)", precision: 0, nullable: false),
                    altered_at = table.Column<DateTime>(type: "datetime(0)", precision: 0, nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime(0)", precision: 0, nullable: false),
                    removed = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_chat_notification", x => x.id);
                    table.ForeignKey(
                        name: "fk_chat_notification_chat_chat_id",
                        column: x => x.chat_id,
                        principalTable: "chat",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "join_chats_users",
                columns: table => new
                {
                    chat_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_join_chats_users", x => new { x.chat_id, x.user_id });
                    table.ForeignKey(
                        name: "fk_join_chats_users_chat_chat_id",
                        column: x => x.chat_id,
                        principalTable: "chat",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_join_chats_users_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "message",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    text = table.Column<byte[]>(type: "BLOB", nullable: true),
                    sender_user_id = table.Column<int>(type: "int", nullable: false),
                    chat_id = table.Column<int>(type: "int", nullable: false),
                    sent = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    sent_at = table.Column<DateTime>(type: "datetime(0)", precision: 0, nullable: false),
                    altered_at = table.Column<DateTime>(type: "datetime(0)", precision: 0, nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime(0)", precision: 0, nullable: false),
                    removed = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_message", x => x.id);
                    table.ForeignKey(
                        name: "fk_message_chat_chat_id",
                        column: x => x.chat_id,
                        principalTable: "chat",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_message_users_sender_user_id",
                        column: x => x.sender_user_id,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "id", "altered_at", "created_at", "email", "name", "password", "removed", "username" },
                values: new object[] { 1, new DateTime(2022, 8, 2, 23, 13, 5, 620, DateTimeKind.Local).AddTicks(3475), new DateTime(2022, 8, 2, 23, 13, 5, 620, DateTimeKind.Local).AddTicks(3497), "admin@admin.com.br", "Administrador", "@Asd123456789", false, "admin" });

            migrationBuilder.InsertData(
                table: "chat",
                columns: new[] { "id", "altered_at", "created_at", "creator_user_id", "description", "removed", "title" },
                values: new object[] { 1, new DateTime(2022, 8, 2, 23, 13, 5, 557, DateTimeKind.Local).AddTicks(2921), new DateTime(2022, 8, 2, 23, 13, 5, 558, DateTimeKind.Local).AddTicks(1741), 1, new byte[] { 87, 101, 108, 99, 111, 109, 101, 32, 116, 111, 32, 80, 105, 103, 101, 111, 110, 98, 111, 120, 33, 32, 84, 104, 105, 115, 32, 111, 110, 101, 32, 97, 32, 103, 108, 111, 98, 97, 108, 32, 99, 104, 97, 116, 44, 32, 102, 111, 114, 32, 101, 118, 101, 114, 121, 32, 80, 105, 103, 101, 111, 110, 32, 105, 110, 32, 116, 104, 105, 115, 32, 98, 111, 120, 46, 32, 66, 101, 32, 114, 101, 115, 112, 101, 99, 116, 102, 117, 108, 33, 32, 65, 116, 116, 46, 46, 32, 83, 97, 109, 117, 101, 108, 32, 61, 41, 32 }, false, "#Everyone" });

            migrationBuilder.CreateIndex(
                name: "ix_chat_creator_user_id",
                table: "chat",
                column: "creator_user_id");

            migrationBuilder.CreateIndex(
                name: "ix_chat_notification_chat_id",
                table: "chat_notification",
                column: "chat_id");

            migrationBuilder.CreateIndex(
                name: "ix_join_chats_users_user_id",
                table: "join_chats_users",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_message_chat_id",
                table: "message",
                column: "chat_id");

            migrationBuilder.CreateIndex(
                name: "ix_message_sender_user_id",
                table: "message",
                column: "sender_user_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_email",
                table: "user",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_user_username",
                table: "user",
                column: "username",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "chat_notification");

            migrationBuilder.DropTable(
                name: "join_chats_users");

            migrationBuilder.DropTable(
                name: "message");

            migrationBuilder.DropTable(
                name: "chat");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
