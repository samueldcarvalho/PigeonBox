using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Application.Models.Input
{
    public class StartChatInputModel
    {
        public Guid UniqueIdentifier { get; set; }
        public int CreatorId { get; set; }
        public string Title { get; set; }
        public ICollection<int> Participants { get; set; }
    }
}
