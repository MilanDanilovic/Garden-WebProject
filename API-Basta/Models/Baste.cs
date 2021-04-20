using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace API_Basta.Models
{
    [Table("Baste")]
    public class Baste
    {
        [Key]
        [Column("ID")] //ukoliko prethodno imamo bazu moramo da vodimo racuna o imenima
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }

        [Column("Kapacitet")]
        public int Kapacitet { get; set; }

        [Column("N")]
        public int N { get; set; }

        [Column("M")]
        public int M { get; set; }

        public virtual List<Lokacija> Lokacije { get; set; } //ovo je pokazivac koji ukazuje da postoji povezanost izmedju Baste i Lokacija
        //koriscenje kolekcije u ovom formatu zahteva virtual propertije

        [JsonIgnore] //da izbegnemo serijalizaciju u beskonacnost
        public Poljoprivrednik Poljoprivrednik { get; set; }
        
    }
}