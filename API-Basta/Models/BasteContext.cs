using Microsoft.EntityFrameworkCore;

namespace API_Basta.Models
{
     public class BasteContext : DbContext
    {
        public DbSet<Baste> Baste { get; set; }
        public DbSet<Lokacija> Lokacije { get; set; }

        public DbSet<Poljoprivrednik> Poljoprivrednik { get; set; }
        public BasteContext(DbContextOptions options) : base(options)
        {
             
        }       

        //override za OnModelConfiguring - > podesavanje da se koristi CascadeDelete
    } 
}