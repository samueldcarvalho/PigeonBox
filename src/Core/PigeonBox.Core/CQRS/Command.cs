using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Core.CQRS
{
    public abstract class Command<TResponse> : IRequest<TResponse>
    {
        abstract protected bool Validate();
    }
}
