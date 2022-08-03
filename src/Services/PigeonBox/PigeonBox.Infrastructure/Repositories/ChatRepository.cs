using Microsoft.EntityFrameworkCore;
using PigeonBox.Core.Infrastructure.Database;
using PigeonBox.Domain.Chats;
using PigeonBox.Domain.Interfaces;
using PigeonBox.Infrastructure.DataContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Infrastructure.Repositories
{
    public class ChatRepository : IChatRepository
    {
        private readonly PigeonBoxContext _context;
        public IUnitOfWork UnitOfWork { get; set; }

        public ChatRepository(PigeonBoxContext context)
        {
            _context = context;
            UnitOfWork = _context;
        }


        public void Add(Chat entity)
        {
            _context.Chats.Add(entity);
        }

        public Task<List<Chat>> GetAll()
        {
            return _context.Chats.ToListAsync();
        }

        public Task<Chat> GetById(int id)
        {
            return _context.Chats.FirstOrDefaultAsync(c => c.Id == id);
        }

        public void Update(Chat entity)
        {
            _context.Chats.Update(entity);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
