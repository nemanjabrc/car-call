using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BackgroundJobsModifyContext : DataContext
    {
        public BackgroundJobsModifyContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
    }
}