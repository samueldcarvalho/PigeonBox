using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Core.CQRS
{
    public class MediatorHandler : IMediatorHandler
    {
        private readonly IMediator _mediator;

        public MediatorHandler(IMediator mediator)
        {
            _mediator = mediator;
        }

        public Task<CommandResponse<TResponse>> SendCommand<TResponse>(Command<CommandResponse<TResponse>> command)
        {
            return _mediator.Send(command);
        }
    }
}
