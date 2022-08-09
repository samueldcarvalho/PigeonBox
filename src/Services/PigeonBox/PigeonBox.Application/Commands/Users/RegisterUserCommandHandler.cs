using MediatR;
using PigeonBox.Core.CQRS;
using PigeonBox.Domain.Chats;
using PigeonBox.Domain.Interfaces;
using PigeonBox.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PigeonBox.Application.Commands.Users
{
    public class RegisterUserCommandHandler : CommandHandler, IRequestHandler<RegisterUserCommand, CommandResponse<bool>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IChatRepository _chatRepository;

        public RegisterUserCommandHandler(IUserRepository userRepository, IChatRepository chatRepository)
        {
            _userRepository = userRepository;
            _chatRepository = chatRepository;
        }

        public async Task<CommandResponse<bool>> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            if (!request.Validate())
                return new CommandResponse<bool>(request.ValidationResult, false);

            string firstName = request.FirstName.ToLower();
            firstName = firstName.Substring(0, 1).ToUpper() + firstName.Substring(1);

            string lastName = request.LastName.ToLower();
            lastName = lastName.Substring(0, 1).ToUpper() + lastName.Substring(1);

            string name = $"{firstName} {lastName}";

            User user = new User(name, request.Email, request.Username, request.Password);
            user.AddUserConnection();

            Chat everyoneChat = await _chatRepository.GetById(1);

            everyoneChat.AddUser(user);

            _chatRepository.Update(everyoneChat);

            await _chatRepository.UnitOfWork.Commit();

            return new CommandResponse<bool>(ValidationResult, true);
        }
    }
}
