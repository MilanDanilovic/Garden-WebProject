using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace API_Basta.Models
{
    [Table("Poljoprivrednik")]
    public class Poljoprivrednik
    {
        [Key]
        [Column("ID")] //ukoliko prethodno imamo bazu moramo da vodimo racuna o imenima
        public int ID { get; set; }

        [Column("Ime")]
        [MaxLength(255)]
        public string Naziv { get; set; }

        [Column("Adresa")]
        public string Adresa { get; set; }
        public virtual List<Baste> Baste { get; set; } 
        //koriscenje kolekcije u ovom formatu zahteva virtual propertije
        
    }
}