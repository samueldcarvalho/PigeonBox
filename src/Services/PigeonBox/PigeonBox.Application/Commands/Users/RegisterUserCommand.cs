using FluentValidation;
using PigeonBox.Core.CQRS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace PigeonBox.Application.Commands.Users
{
    public class RegisterUserCommand : Command<CommandResponse<bool>>
    {
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Email { get; private set; }
        public string Username { get; private set; }
        public string Password { get; private set; }

        public RegisterUserCommand(string firstName, string lastName, string email, string username, string password)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Username = username;
            Password = password;
        }

        public override bool Validate()
        {
            ValidationResult = new RegisterUserCommandValidator().Validate(this);
            return ValidationResult.IsValid;
        }

        private class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
        {
            public RegisterUserCommandValidator()
            {
                RuleFor(x => x.FirstName)
                    .NotEmpty()
                    .WithMessage("First name cannot be empty");

                RuleFor(x => x.LastName)
                    .NotEmpty()
                    .WithMessage("Last name cannot be empty");

                RuleFor(x => x.FirstName)
                    .Must(x => new Regex(@"^[a-zA-Z]*$").IsMatch(x));

                RuleFor(x => x.LastName)
                    .Must(x => new Regex(@"^[a-zA-Z]*$").IsMatch(x));

                //RuleFor(x => x.Email)
                //    .Must(x => new Regex(@"/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i").IsMatch(x));

                RuleFor(x => x.Email)
                    .NotEmpty()
                    .WithMessage("Email cannot be empty");

                RuleFor(x => x.Username)
                    .NotEmpty()
                    .WithMessage("Username cannot be empty");

                RuleFor(x => x.Username)
                    .MinimumLength(4)
                    .WithMessage("Minimum length for username is 4");

                RuleFor(x => x.Username)
                    .Must(x => new Regex(@"^[A-Za-z0-9_-]*$").IsMatch(x));

                RuleFor(x => x.Password)
                    .NotEmpty()
                    .WithMessage("Password cannot be empty");


                RuleFor(x => x.Password)
                    .MinimumLength(6)
                    .WithMessage("Minimum length for password is 6");
            }
        }
    }
}
