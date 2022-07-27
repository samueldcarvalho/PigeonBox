using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Core.CQRS
{
    public interface IMediatorHandler
    {
        Task<CommandResponse<TResponse>> SendCommand<TResponse>(Command<CommandResponse<TResponse>> command);
    }
}
