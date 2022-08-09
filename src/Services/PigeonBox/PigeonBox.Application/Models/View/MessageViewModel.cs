using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Application.Models.View
{
    public class MessageViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int ChatId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public DateTime SentAt { get; set; }
    }
}
