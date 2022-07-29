using MediatR;
using PigeonBox.Core.CQRS;
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

        public RegisterUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
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

            _userRepository.Add(new User(name, request.Email, request.Username, request.Password));

            await _userRepository.UnitOfWork.Commit();
  
            return new CommandResponse<bool>(ValidationResult, true);
        }
    }
}
