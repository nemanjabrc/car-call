using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class RegistrationNotification
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public Company Company { get; set; }

        public RegistrationNotification()
        {

        }

        public RegistrationNotification(Company company)
        {
            Message = $""" 
            Redovna registracija ne samo da osigurava Vašu bezbijednost na putu, već i 
            pomaže u izbjegavanju potencijalnih kazni. Molimo Vas da preduzmete potrebne
            korake kako biste na vrijeme obnovili registraciju.
            Hvala što brinete o sigurnosti na putu!
            Ukoliko imate neka pitanja slobodno nas kontaktirajte putem {company.Email} ili 
            na broj {company.PhoneNumber}.

            Srdačan pozdrav,
            {company.Name}
            """;

            Company = company;
        }
    }
}