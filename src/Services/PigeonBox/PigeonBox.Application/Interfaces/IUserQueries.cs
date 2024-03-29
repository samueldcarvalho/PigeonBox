﻿using PigeonBox.Application.Models.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Application.Interfaces
{
    public interface IUserQueries
    {
        Task<UserConnectionViewModel> GetUserByEmail(string email);
        Task<UserConnectionViewModel> GetUserById(int id);
        Task<IEnumerable<ContactViewModel>> GetAllContacts();
    }
}
