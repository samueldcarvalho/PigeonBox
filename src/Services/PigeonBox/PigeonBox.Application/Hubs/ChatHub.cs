using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using PigeonBox.Application.Models.Input;
using PigeonBox.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PigeonBox.Application.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IUserRepository _userRepository;

        public ChatHub(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task JoinServerHub(UserConnectionInputModel userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "ChatHubServer");
            await Clients.All.SendAsync("JoinedServer", JsonConvert.SerializeObject(userConnection));

            var user = await _userRepository.GetByIdWithChilds(userConnection.Id);

            if(user == null)
                throw new NullReferenceException();

            user.UserConnection.ChangeConnectionId(Context.ConnectionId);
            user.UserConnection.ChangeIsConnected(true);
            await _userRepository.UnitOfWork.Commit();
        }

        public async Task ReconnectedServerHub(UserConnectionInputModel userConnection)
        {
            var user = await _userRepository.GetByIdWithChilds(userConnection.Id);

            if (user == null)
                return;

            await Clients.All.SendAsync("JoinedServer", JsonConvert.SerializeObject(userConnection));

            user.UserConnection.ChangeConnectionId(Context.ConnectionId);
            user.UserConnection.ChangeIsConnected(true);
            await _userRepository.UnitOfWork.Commit();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var user = await _userRepository.GetByConnectionId(Context.ConnectionId);

            if (user == null)
                return;

            await Clients.All.SendAsync("DisconnectedServer", user.Id);

            user.UserConnection.ChangeIsConnected(false);
            await _userRepository.UnitOfWork.Commit();
        }
    }
}
