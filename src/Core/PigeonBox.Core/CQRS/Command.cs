using FluentValidation.Results;
using MediatR;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Core.CQRS
{
    public abstract class Command<TResponse> : IRequest<CommandResponse<TResponse>>
    {
        public ValidationResult ValidationResult { get; set; }
        abstract public bool Validate();
    }
}
