using PigeonBox.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Core.Infrastructure.Database
{
    public interface IRepository<T> : IDisposable where T : Entity, IAggregateRoot
    {
        public IUnitOfWork UnitOfWork { get; set; }
        Task<T> GetById(int id);
        Task<List<T>> GetAll();
        void Add(T entity);
        void Update(T entity);
    }
}
