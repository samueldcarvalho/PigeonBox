using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Application.Models.Input
{
    public class SendMessageInputModel
    {
        public Guid UniqueIdentifier { get; set; }
        public int UserId { get; set; }
        public int ChatId { get; set; }
        public string Text { get; set; }
    }
}
