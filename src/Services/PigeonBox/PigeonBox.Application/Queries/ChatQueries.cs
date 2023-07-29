using Microsoft.AspNetCore.Http;
using PigeonBox.Application.Interfaces;
using PigeonBox.Application.Models.View;
using PigeonBox.Domain.Interfaces;
using PigeonBox.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Application.Queries
{
    public class ChatQueries : IChatQueries
    {
        private readonly IChatRepository _chatRepository;
        private readonly IHttpContextAccessor _httpContext;

        public ChatQueries(IChatRepository chatRepository, IHttpContextAccessor httpContext)
        {
            _chatRepository = chatRepository;
            _httpContext = httpContext;
        }

        public async Task<IEnumerable<ChatViewModel>> GetChatsByUserId()
        {
            var userId = _httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                throw new Exception("UserId cannot be found");


            var chats = await _chatRepository.GetByUserId(int.Parse(userId));

            if (!chats.Any())
                return new List<ChatViewModel>();

            return chats.Select(chat =>
            {
                var chatViewModel = new ChatViewModel()
                {
                    Id = chat.Id,
                    UniqueIdentifier = chat.UniqueIdentifier,
                    Title = chat.Title
                };

                IEnumerable<MessageViewModel> messages;

                IEnumerable<UserConnectionViewModel> users = chat.Users
                    .Select(user => new UserConnectionViewModel()
                {
                    Id = user.Id,
                    Email = user.Email,
                    Username = user.Username,
                    Name = user.Name
                });

                if (chat.Messages != null && chat.Messages.Any())
                {
                    messages = chat.Messages.Select(msg => new MessageViewModel()
                    {
                        Id = msg.Id,
                        Text = msg.Text,
                        ChatId = msg.ChatId,
                        UserId = msg.UserId,
                        UserName = users.FirstOrDefault(u => u.Id == msg.UserId)?.Name,
                        SentAt = msg.SentAt
                    });

                    chatViewModel.Messages = messages;
                }

                chatViewModel.Users = users;
                return chatViewModel;
            });
        }
    }
}
