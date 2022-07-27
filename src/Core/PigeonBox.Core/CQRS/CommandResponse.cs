using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Core.CQRS
{
    public class CommandResponse<TResponse>
    {
        public ValidationResult ValidationResult { get; set; }
        public bool Success { get; set; }
        public CommandResponse(ValidationResult validationResult, bool success)
        {
            ValidationResult = validationResult;
            Success = success;
        }
    }
}
