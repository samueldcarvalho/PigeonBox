using PigeonBox.Core.Domain;
using PigeonBox.Domain.Users.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Domain.Users
{
    public class UserConnection : Entity
    {
        public int UserId { get; set; }
        public User User { get; private set; }
        public bool IsConnected { get; private set; }
        public DateTime LastConnectionAt { get; private set; }
        public string ConnectionId { get; private set; } = "";
        public UserConnectionStatusEnum Status { get; private set; }

        public UserConnection()
        {
            IsConnected = false;
            LastConnectionAt = DateTime.MinValue;
            Status = UserConnectionStatusEnum.Available;
        }

        public void ChangeConnectionId(string connectionId)
        {
            if (ConnectionId == connectionId)
                return;

            ConnectionId = connectionId;
        }

        public void ChangeIsConnected(bool isConnected)
        {
            if (IsConnected == isConnected)
                return;

            if(isConnected == true)
            {
                LastConnectionAt = DateTime.Now;
                IsConnected = isConnected;
            }
            else
            {
                IsConnected = isConnected;
            }
        }

        public void ChangeStatusConnection(UserConnectionStatusEnum status)
        {
            if (Status == status)
                return;

            Status = status;
        }
    }
}
