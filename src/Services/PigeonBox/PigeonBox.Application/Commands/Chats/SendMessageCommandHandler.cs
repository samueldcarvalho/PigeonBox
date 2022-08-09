using MediatR;
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

        public SendMessageCommandHandler(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        public async Task<CommandResponse<bool>> Handle(SendMessageCommand request, CancellationToken cancellationToken)
        {
            if (!request.Validate())
                return new CommandResponse<bool>(request.ValidationResult, false);

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

            return new CommandResponse<bool>(ValidationResult, true);
        }
    }
}
