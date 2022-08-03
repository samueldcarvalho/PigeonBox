using PigeonBox.Core.Domain;
using PigeonBox.Domain.Chats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Domain.Notifications
{
    public class ChatNotification : Entity
    {
        public string Text { get; private set; }
        public int ChatId { get; private set; }
        public Chat Chat { get; private set; }
        public bool Sent { get; private set; }
        public DateTime SentAt { get; private set; }

        public ChatNotification(string text, int chatId)
        {
            Text = text;
            ChatId = chatId;
        }

        public void ChangeToSent()
        {
            Sent = true;
            SentAt = DateTime.Now;
        }
    }
}
