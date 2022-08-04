using PigeonBox.Core.Domain;
using PigeonBox.Core.Infrastructure.Database;
using PigeonBox.Domain.Messages;
using PigeonBox.Domain.Notifications;
using PigeonBox.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Domain.Chats
{
    public class Chat : Entity, IAggregateRoot
    {
        public Guid UniqueIdentifier { get; private set; }
        public string Title { get; private set; }
        public string Description { get; private set; } = "";
        public int CreatorUserId { get; private set; }
        public User CreatorUser { get; private set; }
        public ICollection<Message> Messages { get; private set; }
        public ICollection<ChatNotification> ChatNotifications { get; private set; }
        public ICollection<User> Users { get; private set; }

        protected Chat() { }
        public Chat(Guid uniqueIdentifier, string title, int creatorUserId, params User[] participants)
        {
            Title = title;
            CreatorUserId = creatorUserId;
            Users = participants;
            UniqueIdentifier = uniqueIdentifier;
        }

        public void ChangeTitle(string newTitle)
        {
            if (string.IsNullOrWhiteSpace(newTitle))
                throw new Exception("New Title cannot be empty");

            Title = newTitle;
        }

        public void ChangeDescription(string description)
        {
            if (description == null)
                throw new Exception("Description cannot be null");

            Description = description;
        }

        public void AddMessage(Message message)
        {
            if (message == null)
                throw new Exception("Message cannot be null");

            if (Messages.Any(m => m.Id == message.Id))
                return;

            Messages.Add(message);
        }

        public void AddChatNotification(ChatNotification notification)
        {
            if (notification == null)
                throw new Exception("Notification cannot be null");

            if (ChatNotifications.Any(n => n.Id == notification.Id))
                return;

            ChatNotifications.Add(notification);
        }

        public void AddUser(User user)
        {
            if (user == null)
                throw new Exception("User cannot be null");

            if (Users.Any(u => u.Id == user.Id))
                return;

            Users.Add(user);
        }
    }
}
