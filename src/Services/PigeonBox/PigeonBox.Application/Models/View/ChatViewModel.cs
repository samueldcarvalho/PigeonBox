using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Application.Models.View
{
    public class ChatViewModel
    {
        public Guid UniqueIdentifier { get; set; }
        public string Title { get; set; }
        public IEnumerable<MessageViewModel> Messages { get; set; }
        public IEnumerable<UserConnectionViewModel> Users { get; set; }

    }
}
