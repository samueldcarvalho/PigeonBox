using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Application.Models.DTOs
{
    public class HubClientConnectionStateDTO
    {
        public int UserId { get; private set; }
        public HashSet<string> ConnectionIds { get; private set; } = new HashSet<string>();

        public HubClientConnectionStateDTO(int userId)
        {
            UserId = userId;
        }
    }
}
