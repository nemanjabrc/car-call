using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Quartz;

namespace API.BackgroundJobs.VehiclesDataFetch
{
    public class NotifyingAboutRegistrationJobSetup : IConfigureOptions<QuartzOptions>
    {
        public void Configure(QuartzOptions options)
        {
            var jobKey = JobKey.Create(nameof(NotifyingAboutRegistrationJob));
            options
                .AddJob<NotifyingAboutRegistrationJob>(jobBuilder => jobBuilder.WithIdentity(jobKey))
                .AddTrigger(trigger =>
                    trigger
                        .ForJob(jobKey)
                        .WithCronSchedule("0 12 19 * * ?")
                );
        }
    }
}