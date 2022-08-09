using PigeonBox.Application.Hubs;
using PigeonBox.Application.Interfaces;
using PigeonBox.Application.Models.View;
using PigeonBox.Domain.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PigeonBox.Application.Queries
{
    public class UserQueries : IUserQueries
    {
        private readonly IUserRepository _userRepository;

        public UserQueries(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<ContactViewModel>> GetAllContacts()
        {
            var users = await _userRepository.GetAll();

            if (users == null)
                return null;

            return users.Select(u => new ContactViewModel
            {
                Id = u.Id,
                Name = u.Name,
                Username = u.Username,
                Email = u.Email,
                IsOnline = ChatHubHandler.UsersConnected.Any(user => user.UserConnection.Id == u.Id)
            });
        }

        public async Task<UserConnectionViewModel> GetUserByEmail(string email)
        {
            var user = await _userRepository.GetByEmail(email);

            if (user == null)
                return null;

            return new UserConnectionViewModel() { Id = user.Id, Email = user.Email, Name = user.Name, Username = user.Username};
        }
    }
}
