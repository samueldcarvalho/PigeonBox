using PigeonBox.Application.Interfaces;
using PigeonBox.Application.Models.View;
using PigeonBox.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Application.Queries
{
    public class ChatQueries : IChatQueries
    {
        private readonly IChatRepository _chatRepository;

        public ChatQueries(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        public async Task<IEnumerable<ChatViewModel>> GetChatsByUserId(int userId)
        {
            var chats = await _chatRepository.GetByUserId(userId);

            if (chats == null)
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
