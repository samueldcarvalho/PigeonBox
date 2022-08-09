using PigeonBox.Core.Infrastructure.Database;
using PigeonBox.Domain.Chats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Domain.Interfaces
{
    public interface IChatRepository : IRepository<Chat>
    {
        Task<Chat> GetByIdWithChilds(int id);
        Task<List<Chat>> GetByUserId(int userId);
    }
}
