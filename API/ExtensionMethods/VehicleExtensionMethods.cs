using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.ExtensionMethods
{
    public static class VehicleExtensionMethods
    {
        public static IQueryable<Vehicle> SearchVehicle(this IQueryable<Vehicle> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
                return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(v => v.Manufacturer.ToLower().Contains(lowerCaseSearchTerm) || v.Model.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Vehicle> FilterVehicles(this IQueryable<Vehicle> query, string categories)
        {
            var categoryList = new List<string>();

            if (!string.IsNullOrEmpty(categories))
            {
                categoryList.AddRange(categories.ToLower().Split(",").ToList());
            }

            query = query.Where(v => categoryList.Count == 0 || categoryList.Contains(v.Category.ToLower()));

            return query;
        }
    }
}