using PigeonBox.Core.Infrastructure.Database;
using PigeonBox.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Domain.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetByUsernameAndPassword(string username, string password);
        Task<User> GetByEmail(string email);
    }
}
