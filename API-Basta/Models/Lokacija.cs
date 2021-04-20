using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API_Basta.Models
{
    [Table("Lokacija")]
    public class Lokacija
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Vrsta")]
        [MaxLength(255)]
        public string Vrsta { get; set; }

        [Column("Kapacitet")]
        public int Kapacitet { get; set; }

        [Column("MaxKapacitet")]
        public int MaxKapacitet { get; set; }

        [Column("Tip")]
        [MaxLength(255)]
        public string Tip { get; set; }

        [Column("X")]
        public int X { get; set; }

        [Column("Y")]
        public int Y { get; set; }

        [JsonIgnore] //da izbegnemo serijalizaciju u beskonacnost
        public Baste Basta { get; set; } //da bi znali kuj vrt je u pitanje
    }
}