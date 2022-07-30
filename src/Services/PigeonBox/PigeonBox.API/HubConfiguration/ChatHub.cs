using Microsoft.AspNetCore.SignalR;
using PigeonBox.Application.Models.Input;
using PigeonBox.Application.Models.View;
using System.Threading;
using System.Threading.Tasks;

namespace PigeonBox.API.HubConfiguration
{
    public class ChatHub : Hub
    {
        public async Task JoinServerHub(int userId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Server");
            await Clients.All.SendAsync("JoinedServer", userId);

            //while (true)
            //{
            //    Thread.Sleep(4000);
            //    await Clients.All.SendAsync("MessageReceived", "A123HelloWorld", -1, "Teste evento");
            //}
        }
    }
}
