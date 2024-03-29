﻿using PigeonBox.Core.Domain;
using PigeonBox.Core.Infrastructure.Database;
using PigeonBox.Domain.Chats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Domain.Users
{
    public class User : Entity, IAggregateRoot
    {
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Username { get; private set; }
        public string Password { get; private set; }
        public ICollection<Chat> Chats { get; private set; }
        public UserConnection UserConnection { get; private set; }

        protected User() { }
        public User(string name, string email, string username, string password)
        {
            Name = name;
            Email = email;
            Username = username;
            Password = password;
        }

        public void AddUserConnection()
        {
            if (UserConnection != null)
                return;

            UserConnection = new UserConnection();
        }
    }
}
