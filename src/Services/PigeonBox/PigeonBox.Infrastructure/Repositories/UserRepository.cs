using Microsoft.EntityFrameworkCore;
using PigeonBox.Core.Infrastructure.Database;
using PigeonBox.Domain.Interfaces;
using PigeonBox.Domain.Users;
using PigeonBox.Infrastructure.DataContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly PigeonBoxContext _context;
        public IUnitOfWork UnitOfWork { get; set; }

        public UserRepository(PigeonBoxContext context)
        {
            _context = context;
            UnitOfWork = _context;
        }

        public void Add(User entity)
        {
            _context.Users.Add(entity);
        }

        public Task<List<User>> GetAll()
        {
            return _context.Users.ToListAsync();
        }

        public Task<User> GetById(int id)
        {
            return _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public Task<User> GetByConnectionId(string connectionId)
        {
            return _context.Users.Include(p => p.UserConnection)
                .FirstOrDefaultAsync(p => p.UserConnection.ConnectionId == connectionId);
        }

        public void Update(User entity)
        {
            _context.Users.Update(entity);
        }

        public Task<User> GetByUsernameAndPassword(string username, string password)
        {
            return _context.Users.FirstOrDefaultAsync(u => u.Username == username && u.Password == password);
        }

        public Task<User> GetByEmail(string email)
        {
            return _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
