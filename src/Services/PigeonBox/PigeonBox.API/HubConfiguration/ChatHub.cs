using Microsoft.AspNetCore.SignalR;
using PigeonBox.Application.Models.Input;
using PigeonBox.Application.Models.View;
using System.Threading;
using System.Threading.Tasks;

namespace PigeonBox.API.HubConfiguration
{
    public class ChatHub : Hub
    {
        public async Task JoinServer(UserConnectionInputModel user, CancellationToken cancellationToken)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Server", cancellationToken);
            await Clients.All.SendAsync("JoinServer", new UserConnectionViewModel { Id = user.Id,  Name = user.Name }, cancellationToken);
        }
    }
}
