using FluentValidation;
using PigeonBox.Core.CQRS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Application.Commands.Chats
{
    public class SendMessageCommand : Command<CommandResponse<bool>>
    {
        public Guid UniqueIdentifier { get; private set; }
        public string Text { get; private set; }
        public int UserId { get; private set; }
        public int ChatId { get; private set; }

        public SendMessageCommand(Guid uniqueIdentifier, string text, int userId, int chatId)
        {
            UniqueIdentifier = uniqueIdentifier;
            Text = text;
            UserId = userId;
            ChatId = chatId;
        }

        public override bool Validate()
        {
            ValidationResult = new SendMessageCommandValidator().Validate(this);
            return ValidationResult.IsValid;
        }

        private class SendMessageCommandValidator : AbstractValidator<SendMessageCommand>
        {
            public SendMessageCommandValidator()
            {
                RuleFor(p => p.UniqueIdentifier)
                    .NotNull();

                RuleFor(p => p.Text)
                    .NotNull()
                    .NotEmpty();

                RuleFor(p => p.UserId)
                    .NotNull()
                    .GreaterThan(0);

                RuleFor(p => p.ChatId)
                    .NotNull()
                    .GreaterThan(0);
            }
        }
    }
}
