using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.ExtensionMethods
{
    public static class AccountExtensionMethods
    {
        public static IQueryable<Owner> SearchOwner(this IQueryable<Owner> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
                return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(o => o.Name.ToLower().Contains(lowerCaseSearchTerm) || o.Surname.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<User> SearchOperator(this IQueryable<User> query, string searchterm)
        {
            if (string.IsNullOrEmpty(searchterm))
                return query;

            var lowerCaseSearchTerm = searchterm.Trim().ToLower();

            return query.Where(u => u.Name.ToLower().Contains(lowerCaseSearchTerm) || u.Surname.ToLower().Contains(lowerCaseSearchTerm));
        }
    }
}