using FluentValidation.Results;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PigeonBox.Core.CQRS
{
    public abstract class CommandHandler
    {
        public ValidationResult ValidationResult { get; set; } = new ValidationResult();

        public void AddError(string message)
        {
            ValidationResult.Errors.Add(new ValidationFailure { ErrorMessage = message });
        }
    }
}
