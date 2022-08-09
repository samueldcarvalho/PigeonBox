using MediatR;
using Microsoft.AspNetCore.SignalR;
using PigeonBox.Application.Hubs;
using PigeonBox.Application.Models.View;
using PigeonBox.Core.CQRS;
using PigeonBox.Domain.Interfaces;
using PigeonBox.Domain.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PigeonBox.Application.Commands.Chats
{
    public class SendMessageCommandHandler : CommandHandler, IRequestHandler<SendMessageCommand, CommandResponse<bool>>
    {
        private readonly IChatRepository _chatRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHubContext<ChatHub> _hubContext;

        public SendMessageCommandHandler(IChatRepository chatRepository, IHubContext<ChatHub> hubContext, IUserRepository userRepository)
        {
            _chatRepository = chatRepository;
            _hubContext = hubContext;
            _userRepository = userRepository;
        }

        public async Task<CommandResponse<bool>> Handle(SendMessageCommand request, CancellationToken cancellationToken)
        {
            if (!request.Validate())
                return new CommandResponse<bool>(request.ValidationResult, false);

            var user = await _userRepository.GetById(request.UserId);

            if(user == null)
            {
                AddError("User cannot be finded");
                return new CommandResponse<bool>(ValidationResult, false);
            }

            var chat = await _chatRepository.GetById(request.ChatId);

            if(chat == null)
            {
                AddError("The chat cannot be finded");
                return new CommandResponse<bool>(ValidationResult, false);
            }

            var message = new Message(request.UserId, request.ChatId, request.Text, request.UniqueIdentifier);
            message.ChangeToSent();

            chat.AddMessage(message);

            _chatRepository.Update(chat);
            await _chatRepository.UnitOfWork.Commit();

            await _hubContext.Clients.Clients(ChatHubHandler.UsersConnected
                .Where(u => chat.Users.Any(user => user.Id == u.UserConnection.Id))
                .Select(u => u.ConnectionId).ToList())
                    .SendAsync("MessageReceived", new MessageViewModel
                    {
                        Id = message.Id,
                        UserId = user.Id,
                        UserName = user.Name,
                        ChatId = message.ChatId,
                        Text = message.Text,
                        SentAt = message.SentAt
                    });

            return new CommandResponse<bool>(ValidationResult, true);
        }
    }
}
