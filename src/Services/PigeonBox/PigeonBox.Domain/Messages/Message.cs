using PigeonBox.Core.Domain;
using PigeonBox.Core.Infrastructure.Database;
using PigeonBox.Domain.Chats;
using System;

namespace PigeonBox.Domain.Messages
{
    public class Message : Entity
    {
        public string Text { get; private set; }
        public int SenderUserId { get; private set; }
        public int ChatId { get; private set; }
        public Chat Chat { get; private set; }
        public bool Sent { get; private set; }
        public DateTime SentAt { get; private set; }

        protected Message() { }
        public Message(int senderUserId, int chatId, string text)
        {
            SenderUserId = senderUserId;
            ChatId = chatId;
            Text = text;
        }

        public void ChangeToSent()
        {
            Sent = true;
            SentAt = DateTime.Now;
        }
    }
}
