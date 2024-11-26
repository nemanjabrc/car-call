using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Owner> Owners => Set<Owner>();
    }
}