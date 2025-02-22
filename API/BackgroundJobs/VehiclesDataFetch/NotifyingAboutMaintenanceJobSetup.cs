using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Quartz;

namespace API.BackgroundJobs.VehiclesDataFetch
{
    public class NotifyingAboutMaintenanceJobSetup : IConfigureOptions<QuartzOptions>
    {
        public void Configure(QuartzOptions options)
        {
            var jobKey = JobKey.Create(nameof(NotifyingAboutMaintenanceJob));
            options.AddJob<NotifyingAboutMaintenanceJob>(jobBuilder => jobBuilder.WithIdentity(jobKey).StoreDurably());
        }
    }
}