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
        Task<User> GetByConnectionId(string connectionId);
        Task<List<User>> GetAllWithUserConnection();
        Task<List<User>> GetAllOnlineByUserId(params int[] usersIds);
        Task<User> GetByIdWithChilds(int id);
    }
}
