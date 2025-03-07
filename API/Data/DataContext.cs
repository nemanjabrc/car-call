using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Company> Companies => Set<Company>();
        public DbSet<Owner> Owners => Set<Owner>();
        public DbSet<Vehicle> Vehicles => Set<Vehicle>();
        public DbSet<RegistrationNotification> RegistrationNotifications => Set<RegistrationNotification>();
        public DbSet<MaintenanceNotification> MaintenanceNotifications => Set<MaintenanceNotification>();
        public DbSet<VehicleManufacturer> VehicleManufacturers => Set<VehicleManufacturer>();
        public DbSet<VehicleModel> VehicleModels => Set<VehicleModel>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<FirebaseToken> FirebaseTokens => Set<FirebaseToken>();
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            if (!builder.Model.GetEntityTypes().Any(e => e.ClrType == typeof(IdentityRole)))
            {
                builder.Entity<IdentityRole>()
                    .HasData(
                        new IdentityRole { Name = "Owner", NormalizedName = "OWNER" },
                        new IdentityRole { Name = "Operator", NormalizedName = "OPERATOR" },
                        new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                        new IdentityRole { Name = "SuperAdmin", NormalizedName = "SUPERADMIN" }
                    );
            }

            //Kaskadno brisanje svih MaintenanceNotification-a kada se obriše Vehicle
            builder.Entity<MaintenanceNotification>()
                .HasOne(m => m.Vehicle)
                .WithMany(v => v.MaintenanceNotifications)
                .OnDelete(DeleteBehavior.Cascade);

            //Kaskadno brisanje svih Owner-a kada se obriše Company
            builder.Entity<Owner>()
                .HasOne(o => o.Company)
                .WithMany()
                .HasForeignKey(o => o.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);

            //Kaskadno brisanje svih User-a kada se obriše Company
            builder.Entity<User>()
                .HasOne(u => u.Company)
                .WithMany()
                .HasForeignKey(u => u.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);

            //Kaskadno brisanje Owner -> Vehicles
            builder.Entity<Vehicle>()
                .HasOne(v => v.Owner)
                .WithMany(o => o.Vehicles)
                .HasForeignKey("OwnerId")
                .OnDelete(DeleteBehavior.Cascade);

            //Kaskadno brisanje Owner -> FirebaseTokens
            builder.Entity<FirebaseToken>()
                .HasOne(f => f.Owner)
                .WithMany(o => o.FirebaseTokens)
                .HasForeignKey(f => f.OwnerId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Company>()
                .HasOne(c => c.RegistrationNotification)
                .WithOne(r => r.Company)
                .HasForeignKey<Company>(c => c.RegistrationNotificationId)
                .IsRequired(true);

            builder.Entity<RegistrationNotification>()
                .HasOne(r => r.Company)
                .WithOne(c => c.RegistrationNotification)
                .IsRequired(false);

            builder.Entity<Vehicle>()
                .HasOne(v => v.RegistrationNotification)
                .WithMany()
                .IsRequired(true);
        }

    }
}