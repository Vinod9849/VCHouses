using Microsoft.EntityFrameworkCore;
using WebAPI.Data.Entity;

namespace WebAPI.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<CityEntity> Cities { get; set; }

    }
}
