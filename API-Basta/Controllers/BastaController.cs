using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Basta.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API_Basta.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BastaController : ControllerBase
    {
        public BasteContext Context {get; set;}
        public BastaController(BasteContext context)
        {
            Context=context;
        }



        [Route("PreuzmiPoljoprivrednike")]
        [HttpGet]
        public async Task<List<Poljoprivrednik>> PreuzmiPoljoprivredike() //Task se uvek pise za asinhroni poziv
        {
            return await Context.Poljoprivrednik.Include(p => p.Baste).ThenInclude(d => d.Lokacije).ToListAsync();//navedemo sta vraca i napisemo await da bi bio asinhroni poziv
        }

        [Route("UpisiPoljoprivrednike")]
        [HttpPost]
        public async Task<IActionResult> UpisiPoljoprivrednike([FromBody] Poljoprivrednik poljoprivrednik)
        {
            Context.Poljoprivrednik.Add(poljoprivrednik);
            await Context.SaveChangesAsync();
            return Ok(poljoprivrednik.ID);
        }



        [Route("PreuzmiBaste/{idPolj}")]
        [HttpGet]
        public async Task<List<Baste>> PreuzmiBaste(int idPolj) //Task se uvek pise za asinhroni poziv
        {   
           
           return await Context.Baste.Include(p => p.Lokacije).Where(d => d.Poljoprivrednik.ID == idPolj).ToListAsync();//navedemo sta vraca i napisemo await da bi bio asinhroni poziv
        }


        [Route("UpisiBastu")]
        [HttpPost]

        public async Task<IActionResult> UpisiBastu([FromBody] Baste baste)
        {
            Context.Baste.Add(baste);
            await Context.SaveChangesAsync();
            return Ok(baste.ID);
        }

        [Route("IzmeniBastu/{idPolj}")]
        [HttpPut]

        public async Task<IActionResult> IzmeniBastu(int idPolj,[FromBody] Baste baste)
        {   var polj= await Context.Poljoprivrednik.FindAsync(idPolj);
            baste.Poljoprivrednik=polj;
            Context.Update<Baste>(baste);
            await Context.SaveChangesAsync();
             return Ok(baste.ID);
        }

        [Route("IzbrisiBastu/{id}")]
        [HttpDelete]

        public async Task IzbrisiBastu(int id)
        {
            var bas=Context.Baste.Include(p => p.Lokacije).Where(p => p.ID==id).FirstOrDefault();
            var ids=bas.Lokacije.Select( p => p.ID).ToList();
            foreach(int element in ids)
               await BrisiLokaciju(id, element);
            Context.Remove(bas);
            await Context.SaveChangesAsync();
        }

        [Route("UpisLokacije/{idBaste}")]
        [HttpPost]
        // Upis može takođe da se vrši preko FormData, tako što će atribut da bude [FromForm]
        // Aplikacija nema formu, tako da je ovde korišćen FromBody, ali je jednostavnije koristiti FormData.
        public async Task<IActionResult> UpisiLokaciju(int idBaste, [FromBody] Lokacija lok)
        {
            var bas =  Context.Baste.Include(p=>p.Lokacije).Where(c => c.ID == idBaste).FirstOrDefault();
            lok.Basta = bas;

            if (bas.Lokacije.Any(p => p.Vrsta == lok.Vrsta  && (p.X != lok.X || p.Y != lok.Y)))
            {
                var xy = bas.Lokacije.Where(p => p.Vrsta == lok.Vrsta).FirstOrDefault();
                return BadRequest(new { X = xy?.X, Y = xy?.Y });
            }

            var thatLok = bas.Lokacije.Where(p => p.X == lok.X && p.Basta.ID==idBaste && p.Y == lok.Y).FirstOrDefault();

            if (thatLok != null)
            {
                if (thatLok.MaxKapacitet < thatLok.Kapacitet + lok.Kapacitet)
                {
                    return StatusCode(406);
                }
                else if (thatLok.Vrsta != lok.Vrsta)
                {
                    return StatusCode(409);
                }
                else
                {
                    thatLok.Kapacitet += lok.Kapacitet;
                    await Context.SaveChangesAsync();
                    return Ok();
                }
            }

            if ((thatLok != null && thatLok.Kapacitet == 0) || thatLok == null)
            {
                Context.Lokacije.Add(lok);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return StatusCode(410);
            }
        }
        

        [Route("OduzimajLokacije/{idBaste}")]
        [HttpPost]
        // Upis može takođe da se vrši preko FormData, tako što će atribut da bude [FromForm]
        // Aplikacija nema formu, tako da je ovde korišćen FromBody, ali je jednostavnije koristiti FormData.
        public async Task OduzimajLokacije(int idBaste, [FromBody] Lokacija lok)
        {
             var bas =  Context.Baste.Include(p=>p.Lokacije).Where(c => c.ID == idBaste).FirstOrDefault();
            lok.Basta = bas;

            var thatLok = bas.Lokacije.Where(p => p.X == lok.X && p.Basta.ID==idBaste &&  p.Y == lok.Y).FirstOrDefault();
            if (thatLok.Vrsta == lok.Vrsta && thatLok.Tip == lok.Tip && (thatLok.Kapacitet-lok.Kapacitet)>=0)
                thatLok.Kapacitet -= lok.Kapacitet;
            await Context.SaveChangesAsync();
           
        }



        [Route("BrisiLokacije/{idBaste}/{idLok}")]
        [HttpDelete]
        // Upis može takođe da se vrši preko FormData, tako što će atribut da bude [FromForm]
        // Aplikacija nema formu, tako da je ovde korišćen FromBody, ali je jednostavnije koristiti FormData.
        public async Task BrisiLokaciju(int idBaste, int idLok)
        {
            var bas=await Context.Baste.FindAsync(idBaste);
            if(bas!=null){
            var lok = await Context.Lokacije.FindAsync(idLok);
            Context.Remove(lok);
            await Context.SaveChangesAsync();
        }
        else
        {
            throw new Exception("Nepostojeca Basta i lokacija");
        }
        }
    }
}
