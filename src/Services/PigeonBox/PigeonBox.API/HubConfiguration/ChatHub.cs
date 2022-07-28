using Microsoft.AspNetCore.SignalR;
using PigeonBox.Application.Models.Input;
using PigeonBox.Application.Models.View;
using System.Threading;
using System.Threading.Tasks;

namespace PigeonBox.API.HubConfiguration
{
    public class ChatHub : Hub
    {
        public async Task JoinServerHub(string admin)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Server");
            await Clients.All.SendAsync("JoinedServer", admin);
        }
    }
}
