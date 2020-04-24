using System;
using System.Collections;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        private Hashtable _reposidorys;
        public UnitOfWork(StoreContext context)
        {
            _context = context;
        }

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            // Check if anything in has table
            if (_reposidorys == null) {
                _reposidorys = new Hashtable();
            }

            var type = typeof(TEntity).Name;

            if (!_reposidorys.ContainsKey(type)) {
                var repositoryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _context);
                _reposidorys.Add(type, repositoryInstance);
            }

            return(IGenericRepository<TEntity>) _reposidorys[type];
            
        }
    }
}