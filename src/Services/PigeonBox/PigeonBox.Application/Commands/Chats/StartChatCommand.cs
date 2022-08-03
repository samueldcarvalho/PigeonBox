using FluentValidation;
using PigeonBox.Core.CQRS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Application.Commands.Chats
{
    public class StartChatCommand : Command<CommandResponse<bool>>
    {
        public int CreatorUserId { get; private set; }
        public string Title { get; private set; }
        public ICollection<int> Participants { get; private set; }

        public StartChatCommand(int creatorUserId, string title, ICollection<int> participants)
        {
            CreatorUserId = creatorUserId;
            Title = title;
            Participants = participants;
        }

        public override bool Validate()
        {
            ValidationResult = new StartChatCommandValidator().Validate(this);
            return ValidationResult.IsValid;
        }

        private class StartChatCommandValidator : AbstractValidator<StartChatCommand>
        {
            public StartChatCommandValidator()
            {
                RuleFor(p => p.CreatorUserId)
                    .GreaterThan(0);

                RuleFor(p => p.Participants)
                    .NotNull();

                RuleFor(p => p.Title)
                    .NotNull();
            }
        }
    }
}
