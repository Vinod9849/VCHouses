using WebAPI.Data.Repository;
using WebAPI.Interfaces;

namespace WebAPI.Data
{
    public class UnitofWork : IUnitofWork
    {
        private readonly DataContext _context;
        public UnitofWork(DataContext dataContext)
        {
            _context = dataContext;
        }
        public ICityRepository CityRepository =>
            new CityRepository(_context);

        public async Task<bool> SaveAsync()
        {
           return await _context.SaveChangesAsync() > 0;
        }
    }
}
