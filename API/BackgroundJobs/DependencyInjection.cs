using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.BackgroundJobs.VehiclesDataFetch;
using Quartz;
using Quartz.Impl;
using Quartz.Simpl;

namespace API.BackgroundJobs
{
    public static class DependencyInjection
    {
        public static void AddInfrastructure(this IServiceCollection services)
        {
            services.AddQuartz(options =>
            {
                options.UseJobFactory<MicrosoftDependencyInjectionJobFactory>();
            });

            services.AddQuartzHostedService(options =>
            {
                options.WaitForJobsToComplete = true;
            });

            services.ConfigureOptions<NotifyingAboutRegistrationJobSetup>();
            services.ConfigureOptions<NotifyingAboutMaintenanceJobSetup>();
        }
    }
}