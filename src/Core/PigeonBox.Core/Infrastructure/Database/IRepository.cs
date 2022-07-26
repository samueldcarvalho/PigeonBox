using PigeonBox.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Core.Infrastructure.Database
{
    public interface IRepository<T> where T : Entity, IAggregateRoot
    {
        Task<T> GetById(int id);
        Task<IEnumerable<T>> GetAll();
        void Add(T entity);
        void Update(T entity);
    }
}
