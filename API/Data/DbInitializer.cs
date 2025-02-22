using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(DataContext context, UserManager<User> userManager)
        {
            //Dodavanje kategorija vozila.
            if (!context.Categories.Any())
            {
                var category = new Category { Name = "Automobili" };
                context.Categories.Add(category);

                category = new Category { Name = "Motocikli" };
                context.Categories.Add(category);

                category = new Category { Name = "Teretna vozila" };
                context.Categories.Add(category);

                category = new Category { Name = "Autobusi/minibusi" };
                context.Categories.Add(category);

                category = new Category { Name = "ATV/UTV/QUAD" };
                context.Categories.Add(category);

                category = new Category { Name = "Prikolice" };
                context.Categories.Add(category);

                await context.SaveChangesAsync();
            }

            //Dodavanje proizvodjača vozila.
            if (!context.VehicleManufacturers.Any())
            {
                //Automobili
                var manufacturer = new VehicleManufacturer { Name = "Mercedes", CategoryId = 1 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "BMW", CategoryId = 1 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Audi", CategoryId = 1 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Volkswagen", CategoryId = 1 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Peugeot", CategoryId = 1 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Citroën", CategoryId = 1 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Fiat", CategoryId = 1 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Volvo", CategoryId = 1 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Aston Martin", CategoryId = 1 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Ferrari", CategoryId = 1 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Porsche", CategoryId = 1 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Toyota", CategoryId = 1 };
                context.VehicleManufacturers.Add(manufacturer);

                //Motocikli
                manufacturer = new VehicleManufacturer { Name = "Yamaha", CategoryId = 2 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Kawasaki", CategoryId = 2 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Ducati", CategoryId = 2 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Aprilia", CategoryId = 2 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "KTM", CategoryId = 2 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Honda", CategoryId = 2 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "BMW", CategoryId = 2 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Triumph", CategoryId = 2 };
                context.VehicleManufacturers.Add(manufacturer);

                //Teretna vozila
                manufacturer = new VehicleManufacturer { Name = "Mercedes", CategoryId = 3 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "DAF", CategoryId = 3 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "MAN", CategoryId = 3 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Iveco", CategoryId = 3 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Isuzu", CategoryId = 3 };
                context.VehicleManufacturers.Add(manufacturer);

                //Autobusi/minibusi
                manufacturer = new VehicleManufacturer { Name = "Mercedes", CategoryId = 4 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Setra", CategoryId = 4 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Iveco", CategoryId = 4 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Volvo", CategoryId = 4 };
                context.VehicleManufacturers.Add(manufacturer);

                //ATV/UTV/QUAD
                manufacturer = new VehicleManufacturer { Name = "Polaris", CategoryId = 5 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Can-Am", CategoryId = 5 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "CFMOTO", CategoryId = 5 };
                context.VehicleManufacturers.Add(manufacturer);

                //Prikolice
                manufacturer = new VehicleManufacturer { Name = "Schmitz Cargobull", CategoryId = 6 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Krone", CategoryId = 6 };
                context.VehicleManufacturers.Add(manufacturer);

                manufacturer = new VehicleManufacturer { Name = "Kögel", CategoryId = 6 };
                context.VehicleManufacturers.Add(manufacturer);

                await context.SaveChangesAsync();
            }

            //Dodavanje modela vozila.
            if (!context.VehicleModels.Any())
            {
                //AUTOMOBILI
                //Mercedes
                var model = new VehicleModel { Name = "A-Class", VehicleManufacturerId = 1 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "B-Class", VehicleManufacturerId = 1 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "C-Class", VehicleManufacturerId = 1 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "E-Class", VehicleManufacturerId = 1 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "S-Class", VehicleManufacturerId = 1 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "G-Class", VehicleManufacturerId = 1 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "GLA", VehicleManufacturerId = 1 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "GLC", VehicleManufacturerId = 1 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "GLE", VehicleManufacturerId = 1 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "GLS", VehicleManufacturerId = 1 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "AMG GT", VehicleManufacturerId = 1 };
                context.VehicleModels.Add(model);

                //BMW
                model = new VehicleModel { Name = "X1", VehicleManufacturerId = 2 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "X3", VehicleManufacturerId = 2 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "X5", VehicleManufacturerId = 2 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "X7", VehicleManufacturerId = 2 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "M3", VehicleManufacturerId = 2 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "E36", VehicleManufacturerId = 2 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "E46", VehicleManufacturerId = 2 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "E91", VehicleManufacturerId = 2 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "i4", VehicleManufacturerId = 2 };
                context.VehicleModels.Add(model);

                //Audi
                model = new VehicleModel { Name = "A1", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "A2", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "A3", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "A4", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "A5", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "A6", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "A7", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "A8", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Q2", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Q3", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Q5", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Q7", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Q8", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "TT", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "R8", VehicleManufacturerId = 3 };
                context.VehicleModels.Add(model);

                //Volkswagen
                model = new VehicleModel { Name = "Golf 1", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Golf 2", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Golf 3", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Golf 4", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Golf 5", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Golf 6", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Golf 7", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Golf 8", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Arteon", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Passat", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Touareg", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Tiguan", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "T-Roc", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Polo", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Phaeton", VehicleManufacturerId = 4 };
                context.VehicleModels.Add(model);

                //Peugeot
                model = new VehicleModel { Name = "208", VehicleManufacturerId = 5 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "308", VehicleManufacturerId = 5 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "508", VehicleManufacturerId = 5 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "2008", VehicleManufacturerId = 5 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "3008", VehicleManufacturerId = 5 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "5008", VehicleManufacturerId = 5 };
                context.VehicleModels.Add(model);

                //Citroen
                model = new VehicleModel { Name = "C3", VehicleManufacturerId = 6 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "C4", VehicleManufacturerId = 6 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "C5", VehicleManufacturerId = 6 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "C4 Picasso", VehicleManufacturerId = 6 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Berlingo", VehicleManufacturerId = 6 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "SpaceTourer", VehicleManufacturerId = 6 };
                context.VehicleModels.Add(model);

                //Fiat
                model = new VehicleModel { Name = "500", VehicleManufacturerId = 7 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "500X", VehicleManufacturerId = 7 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "500L", VehicleManufacturerId = 7 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Panda", VehicleManufacturerId = 7 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Doblo", VehicleManufacturerId = 7 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Florino", VehicleManufacturerId = 7 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Scudo", VehicleManufacturerId = 7 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Ducato", VehicleManufacturerId = 7 };
                context.VehicleModels.Add(model);

                //Volvo
                model = new VehicleModel { Name = "XC40", VehicleManufacturerId = 8 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "XC60", VehicleManufacturerId = 8 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "XC90", VehicleManufacturerId = 8 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "S60", VehicleManufacturerId = 8 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "S90", VehicleManufacturerId = 8 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "V60", VehicleManufacturerId = 8 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "V90", VehicleManufacturerId = 8 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "EX30", VehicleManufacturerId = 8 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "EX90", VehicleManufacturerId = 8 };
                context.VehicleModels.Add(model);

                //Aston Martin
                model = new VehicleModel { Name = "DB12", VehicleManufacturerId = 9 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "DBX", VehicleManufacturerId = 9 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Vantage", VehicleManufacturerId = 9 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "DBS", VehicleManufacturerId = 9 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Rapide", VehicleManufacturerId = 9 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Valkyrie", VehicleManufacturerId = 9 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Valhalla", VehicleManufacturerId = 9 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Vanquish", VehicleManufacturerId = 9 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Virage", VehicleManufacturerId = 9 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "One-77", VehicleManufacturerId = 9 };
                context.VehicleModels.Add(model);

                //Ferrari
                model = new VehicleModel { Name = "296 GTB", VehicleManufacturerId = 10 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "SF90 Stradale", VehicleManufacturerId = 10 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "812 Superfast", VehicleManufacturerId = 10 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Roma", VehicleManufacturerId = 10 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Portofino M", VehicleManufacturerId = 10 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "F8 Tributo", VehicleManufacturerId = 10 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Daytona SP3", VehicleManufacturerId = 10 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "F40", VehicleManufacturerId = 10 };
                context.VehicleModels.Add(model);

                //Porsche
                model = new VehicleModel { Name = "911", VehicleManufacturerId = 11 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "718 Cayman", VehicleManufacturerId = 11 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Panamera", VehicleManufacturerId = 11 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Macan", VehicleManufacturerId = 11 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Cayenne", VehicleManufacturerId = 11 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Carrera GT", VehicleManufacturerId = 11 };
                context.VehicleModels.Add(model);

                //Toyota
                model = new VehicleModel { Name = "Corolla", VehicleManufacturerId = 12 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Yaris", VehicleManufacturerId = 12 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Camry", VehicleManufacturerId = 12 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "RAV4", VehicleManufacturerId = 12 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Land Cruiser", VehicleManufacturerId = 12 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Hilux", VehicleManufacturerId = 12 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "C-HR", VehicleManufacturerId = 12 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Prius", VehicleManufacturerId = 12 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Prius", VehicleManufacturerId = 12 };
                context.VehicleModels.Add(model);


                //MOTOCIKLI
                //Yamaha
                model = new VehicleModel { Name = "YZF-R1", VehicleManufacturerId = 13 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "MT-09", VehicleManufacturerId = 13 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "MT-07", VehicleManufacturerId = 13 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "MT-03", VehicleManufacturerId = 13 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Ténéré 700", VehicleManufacturerId = 13 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "R6", VehicleManufacturerId = 13 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "R1", VehicleManufacturerId = 13 };
                context.VehicleModels.Add(model);

                //Kawasaki
                model = new VehicleModel { Name = "Ninja ZX-10R", VehicleManufacturerId = 14 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Z1000", VehicleManufacturerId = 14 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Versys 650", VehicleManufacturerId = 14 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Ninja 400", VehicleManufacturerId = 14 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Vulcan S", VehicleManufacturerId = 14 };
                context.VehicleModels.Add(model);

                //Ducati
                model = new VehicleModel { Name = "Panigale V4", VehicleManufacturerId = 15 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Monster 1200", VehicleManufacturerId = 15 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Multistrada 950", VehicleManufacturerId = 15 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Scrambler", VehicleManufacturerId = 15 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Diavel 1260", VehicleManufacturerId = 15 };
                context.VehicleModels.Add(model);

                //Aprilia
                model = new VehicleModel { Name = "RSV4", VehicleManufacturerId = 16 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Tuono V4", VehicleManufacturerId = 16 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Shiver 900", VehicleManufacturerId = 16 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Dorsoduro 900", VehicleManufacturerId = 16 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "RS 660", VehicleManufacturerId = 16 };
                context.VehicleModels.Add(model);

                //KTM
                model = new VehicleModel { Name = "390 Duke", VehicleManufacturerId = 17 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "1290 Super Duke R", VehicleManufacturerId = 17 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "RC 390", VehicleManufacturerId = 17 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "890 Adventure", VehicleManufacturerId = 17 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "350 EXC-F", VehicleManufacturerId = 17 };
                context.VehicleModels.Add(model);

                //Honda
                model = new VehicleModel { Name = "CBR1000RR", VehicleManufacturerId = 18 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "CB650R", VehicleManufacturerId = 18 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "CRF450L", VehicleManufacturerId = 18 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Rebel 500", VehicleManufacturerId = 18 };
                context.VehicleModels.Add(model);

                //BMW
                model = new VehicleModel { Name = "S 1000 RR", VehicleManufacturerId = 19 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "R 1250 GS", VehicleManufacturerId = 19 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "F 850 GS", VehicleManufacturerId = 19 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "R nineT", VehicleManufacturerId = 19 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "G 310 R", VehicleManufacturerId = 19 };
                context.VehicleModels.Add(model);

                //Triumph
                model = new VehicleModel { Name = "Street Triple", VehicleManufacturerId = 20 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Tiger 900", VehicleManufacturerId = 20 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Bonneville T120", VehicleManufacturerId = 20 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Scrambler 1200", VehicleManufacturerId = 20 };
                context.VehicleModels.Add(model);


                //Teretna vozila
                //Mercedes
                model = new VehicleModel { Name = "Actros", VehicleManufacturerId = 21 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Arocs", VehicleManufacturerId = 21 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Atego", VehicleManufacturerId = 21 };
                context.VehicleModels.Add(model);

                //DAF
                model = new VehicleModel { Name = "XF", VehicleManufacturerId = 22 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "CF", VehicleManufacturerId = 22 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "LF", VehicleManufacturerId = 22 };
                context.VehicleModels.Add(model);

                //MAN
                model = new VehicleModel { Name = "TGX", VehicleManufacturerId = 23 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "TGS", VehicleManufacturerId = 23 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "TGL", VehicleManufacturerId = 23 };
                context.VehicleModels.Add(model);

                //Iveco
                model = new VehicleModel { Name = "Stralis", VehicleManufacturerId = 24 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Daily", VehicleManufacturerId = 24 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Eurocargo", VehicleManufacturerId = 24 };
                context.VehicleModels.Add(model);

                //Isuzu
                model = new VehicleModel { Name = "D-Max", VehicleManufacturerId = 25 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "N-Series", VehicleManufacturerId = 25 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "F-Series", VehicleManufacturerId = 25 };
                context.VehicleModels.Add(model);


                //Autobusi/minibusi
                //Mercedes
                model = new VehicleModel { Name = "Tourismo", VehicleManufacturerId = 26 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Sprinter", VehicleManufacturerId = 26 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Citaro", VehicleManufacturerId = 26 };
                context.VehicleModels.Add(model);

                //Setra
                model = new VehicleModel { Name = "S 531 DT", VehicleManufacturerId = 27 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "S 416 GT-HD", VehicleManufacturerId = 27 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "S 516 HD", VehicleManufacturerId = 27 };
                context.VehicleModels.Add(model);

                //Iveco
                model = new VehicleModel { Name = "Crossway", VehicleManufacturerId = 28 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Daily Minibus", VehicleManufacturerId = 28 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Magelys", VehicleManufacturerId = 28 };
                context.VehicleModels.Add(model);

                //Volvo
                model = new VehicleModel { Name = "9700", VehicleManufacturerId = 29 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "7900", VehicleManufacturerId = 29 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "8900", VehicleManufacturerId = 29 };
                context.VehicleModels.Add(model);


                //ATV/UTV/QUAD
                //Polaris
                model = new VehicleModel { Name = "Sportsman 570", VehicleManufacturerId = 30 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "RZR XP 1000", VehicleManufacturerId = 30 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Ranger XP 1000", VehicleManufacturerId = 30 };
                context.VehicleModels.Add(model);

                //Can-Am
                model = new VehicleModel { Name = "8900", VehicleManufacturerId = 31 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Maverick X3", VehicleManufacturerId = 31 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Renegade 1000R", VehicleManufacturerId = 31 };
                context.VehicleModels.Add(model);

                //CFMOTO
                model = new VehicleModel { Name = "CForce 800", VehicleManufacturerId = 32 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "UForce 800", VehicleManufacturerId = 32 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "ZForce 800EX", VehicleManufacturerId = 32 };
                context.VehicleModels.Add(model);


                //PRIKOLICE
                //Schmitz Cargobull
                model = new VehicleModel { Name = "S.KO", VehicleManufacturerId = 33 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "T.SS", VehicleManufacturerId = 33 };
                context.VehicleModels.Add(model);

                //Krone
                model = new VehicleModel { Name = "Profi Liner", VehicleManufacturerId = 34 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Cool Liner", VehicleManufacturerId = 34 };
                context.VehicleModels.Add(model);

                //Kögel
                model = new VehicleModel { Name = "Kögel Cargo", VehicleManufacturerId = 35 };
                context.VehicleModels.Add(model);
                model = new VehicleModel { Name = "Kögel Combi", VehicleManufacturerId = 35 };
                context.VehicleModels.Add(model);


                await context.SaveChangesAsync();
            }

            //Dodavanje difoltne notifikacije za registraciju.
            if (!context.RegistrationNotifications.Any())
            {
                var defaultRegistrationNotification = new RegistrationNotification
                {
                    Message = $""" 
                    Redovna registracija ne samo da osigurava Vašu bezbijednost na putu, već i 
                    pomaže u izbjegavanju potencijalnih kazni. Molimo Vas da preduzmete potrebne
                    korake kako biste na vrijeme obnovili registraciju.
                    Hvala što brinete o sigurnosti na putu!

                    Vaš carcall
                    """,
                };

                context.RegistrationNotifications.Add(defaultRegistrationNotification);
                await context.SaveChangesAsync();
            }

            //Dodavanje korisnika.
            if (!userManager.Users.Any())
            {
                var company = await context.Companies.FirstOrDefaultAsync(c => c.Id == 26);

                //Admin
                var admin = new User
                {
                    UserName = "marko",
                    Email = "marko@test.com",
                    Name = "Marko",
                    Surname = "Markovic",
                    Company = company,
                    IsPasswordTemporary = false,
                    CreatedBy = UserType.SuperAdminType,
                    CreationDate = DateTime.Now
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRoleAsync(admin, "Admin");

                //Operator
                var owner = new User
                {
                    UserName = "janko",
                    Email = "janko@test.com",
                    Name = "Janko",
                    Surname = "Jankovic",
                    Company = company,
                    IsPasswordTemporary = false,
                    CreatedBy = UserType.AdminType,
                    CreationDate = DateTime.Now
                };

                await userManager.CreateAsync(owner, "Pa$$w0rd");
                await userManager.AddToRoleAsync(owner, "Operator");

                //SperAdmin
                var superAdmin = new User
                {
                    UserName = "nemanja",
                    Email = "nemanjabrc@gmail.com",
                    Name = "Nemanja",
                    Surname = "Brckalo",
                    Company = null,
                    IsPasswordTemporary = false,
                    CreatedBy = null,
                    CreationDate = DateTime.Now
                };

                await userManager.CreateAsync(superAdmin, "Pa$$w0rd");
                await userManager.AddToRoleAsync(superAdmin, "SuperAdmin");
            }
        }
    }
}