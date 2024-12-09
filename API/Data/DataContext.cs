using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;


namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Owner> Owners => Set<Owner>();
        public DbSet<Company> Companies => Set<Company>();
        public DbSet<Vehicle> Vehicles => Set<Vehicle>();
        public DbSet<RegistrationNotification> RegistrationNotifications => Set<RegistrationNotification>();
        public DbSet<MaintenanceNotification> MaintenanceNotifications => Set<MaintenanceNotification>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Owner>()
                .Property(o => o.NotificationService)
                .HasConversion(
                    v => string.Join(',', v!.Select(e => ((int)e).ToString())),  // Konvertuje enum u string sa int vrednostima
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)      // Razdvaja string po zarezu
                        .Select(e => (NotificationServiceType)Enum.Parse(typeof(NotificationServiceType), e))  // Konvertuje nazad u enum
                        .ToList()  // Vraća List<NotificationServiceType>
                );
        }


    }
}