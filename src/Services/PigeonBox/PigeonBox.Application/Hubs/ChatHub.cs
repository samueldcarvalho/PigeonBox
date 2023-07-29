using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using PigeonBox.Application.Models.DTOs;
using PigeonBox.Application.Models.Input;
using PigeonBox.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PigeonBox.Application.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private static HashSet<HubClientConnectionStateDTO> _clientConnections = new HashSet<HubClientConnectionStateDTO>();

        public override async Task OnConnectedAsync()
        {
            var userIdClaim = Context.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                throw new Exception("User cannot be found");

            await Groups.AddToGroupAsync(Context.ConnectionId, userIdClaim.Value);
            await Clients.All.SendAsync("JoinedServer", userIdClaim.Value);
            AddClientConnection(userIdClaim.Value);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var userIdClaim = Context.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                throw new Exception("User cannot be found");

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, userIdClaim.Value);
            await Clients.All.SendAsync("DisconnectedServer", userIdClaim.Value);
            RemoveClientConnection(userIdClaim.Value);
        }

        private void AddClientConnection(string userId)
        {
            if (!int.TryParse(userId, out int validUserId))
                throw new Exception("UserId is not valid.");

            var clientConnection = _clientConnections.FirstOrDefault(x => x.UserId == validUserId);

            if (clientConnection == null)
            {
                clientConnection = new HubClientConnectionStateDTO(validUserId);
                _clientConnections.Add(clientConnection);
            }

            clientConnection.ConnectionIds.Add(Context.ConnectionId);
        }

        private void RemoveClientConnection(string userId)
        {
            if (!int.TryParse(userId, out int validUserId))
                throw new Exception("UserId is not valid.");

            var clientConnection = _clientConnections.FirstOrDefault(x => x.UserId == validUserId);

            if (clientConnection == null)
                return;

            clientConnection.ConnectionIds.Remove(Context.ConnectionId);

            if (!clientConnection.ConnectionIds.Any())
                _clientConnections.Remove(clientConnection);
        }

        public static bool UserIsOnline(int userId)
        {
            return _clientConnections.Any(x => x.UserId == userId && x.ConnectionIds.Any());
        }
    }
}
