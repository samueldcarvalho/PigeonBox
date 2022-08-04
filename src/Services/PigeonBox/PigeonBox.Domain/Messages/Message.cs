using PigeonBox.Core.Domain;
using PigeonBox.Core.Infrastructure.Database;
using PigeonBox.Domain.Chats;
using PigeonBox.Domain.Users;
using System;

namespace PigeonBox.Domain.Messages
{
    public class Message : Entity
    {
        public Guid UniqueIdentifier { get; private set; }
        public string Text { get; private set; }
        public int SenderUserId { get; private set; }
        public User SenderUser { get; private set; }
        public int ChatId { get; private set; }
        public Chat Chat { get; private set; }
        public bool Sent { get; private set; }
        public DateTime SentAt { get; private set; }

        protected Message() { }
        public Message(int senderUserId, int chatId, string text, Guid uniqueIdentifier)
        {
            SenderUserId = senderUserId;
            ChatId = chatId;
            Text = text;
            UniqueIdentifier = uniqueIdentifier;
        }

        public void ChangeToSent()
        {
            Sent = true;
            SentAt = DateTime.Now;
        }
    }
}
