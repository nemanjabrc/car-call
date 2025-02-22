using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Quartz;

namespace API.BackgroundJobs
{
    public class LoggingBackgroundJobSetup : IConfigureOptions<QuartzOptions>
    {
        public void Configure(QuartzOptions options)
        {
            var jobKey = JobKey.Create(nameof(LoggingBackgroundJob));
            options
                .AddJob<LoggingBackgroundJob>(jobBuilder => jobBuilder.WithIdentity(jobKey))
                .AddTrigger(trigger =>
                    trigger
                        .ForJob(jobKey)
                        .StartAt(DateTimeOffset.Now.AddSeconds(10)) //DateBuilder.FutureDate(10, IntervalUnit.Second)
                        .WithSimpleSchedule(schedule =>
                            schedule.WithIntervalInSeconds(3).RepeatForever()
                        )
                        .EndAt(DateBuilder.FutureDate(5, IntervalUnit.Hour))
                );
        }
    }
}