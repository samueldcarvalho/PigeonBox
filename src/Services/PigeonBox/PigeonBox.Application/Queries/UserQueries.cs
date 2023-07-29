using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using PigeonBox.Application.Hubs;
using PigeonBox.Application.Interfaces;
using PigeonBox.Application.Models.View;
using PigeonBox.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PigeonBox.Application.Queries
{
    public class UserQueries : IUserQueries
    {
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContext;

        public UserQueries(IUserRepository userRepository, IHttpContextAccessor httpContext)
        {
            _userRepository = userRepository;
            _httpContext = httpContext;
        }

        public async Task<IEnumerable<ContactViewModel>> GetAllContacts()
        {
            var users = await _userRepository.GetAll();

            var userId = _httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null || !users.Any())
                throw new Exception("Had a problem to get the contacts");

            var contacts = users.Where(x => x.Id != int.Parse(userId)).Select(u => new ContactViewModel
            {
                Id = u.Id,
                Name = u.Name,
                Username = u.Username,
                Email = u.Email,
                IsOnline = ChatHub.UserIsOnline(u.Id)
            });

            return contacts;
        }

        public async Task<UserConnectionViewModel> GetUserByEmail(string email)
        {
            var user = await _userRepository.GetByEmail(email);

            if (user == null)
                return null;

            return new UserConnectionViewModel() { Id = user.Id, Email = user.Email, Name = user.Name, Username = user.Username};
        }

        public async Task<UserConnectionViewModel> GetUserById(int id)
        {
            var user = await _userRepository.GetById(id);

            if (user == null)
                return null;

            return new UserConnectionViewModel() { Id = user.Id, Email = user.Email, Name = user.Name, Username = user.Username };
        }
    }
}
