using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace API.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly MailSettings _mailSettings;
        public EmailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;

        }
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail));
                message.To.Add(new MailboxAddress("", to));
                message.Subject = subject;

                var builder = new BodyBuilder
                {
                    HtmlBody = body
                };

                message.Body = builder.ToMessageBody();

                using var client = new SmtpClient();
                await client.ConnectAsync(_mailSettings.Server, _mailSettings.Port, SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(_mailSettings.Username, _mailSettings.Password);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
            catch (Exception e)
            {
                Console.WriteLine("Greška pri slanju mejla: " + e.Message);
            }
        }
    }
}