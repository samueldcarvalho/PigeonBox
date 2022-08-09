using Microsoft.AspNetCore.SignalR;
using PigeonBox.Application.Models.Input;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PigeonBox.Application.Hubs
{
    public static class ChatHubHandler
    {
        public static HashSet<UserHubConnection> UsersConnected = new HashSet<UserHubConnection>();

        public class UserHubConnection
        {
            public string ConnectionId { get; set; }
            public UserConnection UserConnection { get; set; }
        }
    }

    public class ChatHub : Hub
    {
        public async Task JoinServerHub(UserConnection userConnection)
        {
            userConnection.IsOnline = true;

            await Groups.AddToGroupAsync(Context.ConnectionId, "ChatHubServer");
            await Clients.All.SendAsync("JoinedServer", userConnection);

            ChatHubHandler.UsersConnected.Add(new ChatHubHandler.UserHubConnection
            {
                ConnectionId = Context.ConnectionId,
                UserConnection = userConnection
            });
        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var user = ChatHubHandler.UsersConnected
                .FirstOrDefault(user => user.ConnectionId == Context.ConnectionId);

            if (user == null)
                return;

            await Clients.All.SendAsync("DisconnectedServer", user.UserConnection.Id);
            ChatHubHandler.UsersConnected.Remove(user);
        }
    }
}
