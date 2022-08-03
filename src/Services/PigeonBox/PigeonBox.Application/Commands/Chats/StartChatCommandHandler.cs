using MediatR;
using PigeonBox.Core.CQRS;
using PigeonBox.Domain.Chats;
using PigeonBox.Domain.Interfaces;
using PigeonBox.Domain.Users;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace PigeonBox.Application.Commands.Chats
{
    public class StartChatCommandHandler : CommandHandler, IRequestHandler<StartChatCommand, CommandResponse<bool>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IChatRepository _chatRepository;

        public StartChatCommandHandler(IUserRepository userRepository, IChatRepository chatRepository)
        {
            _userRepository = userRepository;
            _chatRepository = chatRepository;
        }

        public async Task<CommandResponse<bool>> Handle(StartChatCommand request, CancellationToken cancellationToken)
        {
            if (!request.Validate())
                return new CommandResponse<bool>(request.ValidationResult, false);

            User creatorUser = await _userRepository.GetById(request.CreatorUserId);

            List<User> users = new();

            foreach (var userId in request.Participants)
            {
                var user = await _userRepository.GetById(userId);

                if (user != null)
                    users.Add(user);
            }

            if (!users.Any())
            {
                AddError("Cannot find the participants to start a chat.");
                return new CommandResponse<bool>(ValidationResult, false);
            }

            var chat = new Chat(request.Title, request.CreatorUserId, users.ToArray());
            _chatRepository.Add(chat);

            await _chatRepository.UnitOfWork.Commit();
            return new CommandResponse<bool>(ValidationResult, true);
        }
    }
}
