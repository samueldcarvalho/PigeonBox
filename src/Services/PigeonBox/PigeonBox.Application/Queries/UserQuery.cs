using PigeonBox.Application.Models.View;
using PigeonBox.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Application.Queries
{
    public class UserQuery : IUserQuery
    {
        private readonly IUserRepository _userRepository;

        public UserQuery(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserConnectionViewModel> GetUserByEmail(string email)
        {
            var user = await _userRepository.GetByEmail(email);

            if (user == null)
                return null;

            return new UserConnectionViewModel() { Id = user.Id, Email = user.Email, Name = user.Name, Username = user.Username};
        }
    }

    public interface IUserQuery
    {
        Task<UserConnectionViewModel> GetUserByEmail(string email);
    }
}
