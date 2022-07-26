using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Core.Domain
{
    public abstract class Entity
    {
        public int Id { get; set; }
        public DateTime AlteredAt { get; set; } = DateTime.Now;
        public DateTime CreatedAt { get; set; }
        public bool Removed { get; set; }
        
        [NotMapped]
        public IEnumerable<INotification> Notifications { get; private set; }

        protected Entity()
        {
            CreatedAt = DateTime.Now;
            Removed = false;
        }
    }
}
