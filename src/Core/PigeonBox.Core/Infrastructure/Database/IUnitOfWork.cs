using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Core.Infrastructure.Database
{
    public interface IUnitOfWork
    {
        Task Commit();
    }
}
