import { Lokacija } from "./lokacija.js";
export class Basta{

    constructor(id,naziv, n , m , kapacitetLok){
        this.id=id;
        this.naziv=naziv;
        this.n=n;
        this.m=m;
        this.kapacitet=kapacitetLok;
        this.kontejner=null;
        this.lokacije=[];
    }

    dodajLokaciju(lok){
        this.lokacije.push(lok);
    }
    crtajBastu(host) {

        if (!host)
            throw new Exception("Roditeljski element ne postoji");

        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kontejner");
        host.appendChild(this.kontejner);

        this.crtajFormu(this.kontejner);
        this.crtajLokacije(this.kontejner);
    }
    crtajFormu(host) {

        const kontForma = document.createElement("div");
        kontForma.className = "kontForma";
        host.appendChild(kontForma);

        var elLabela = document.createElement("h3");
        elLabela.className="header3"
        elLabela.innerHTML = this.naziv;
        kontForma.appendChild(elLabela);

        elLabela = document.createElement("label");
        elLabela.innerHTML = "Ime biljke";
        kontForma.appendChild(elLabela);

        let tb = document.createElement("input");
        tb.className = "vrsta";
        kontForma.appendChild(tb);


        elLabela = document.createElement("label");
        elLabela.innerHTML = "Kolicina";
        kontForma.appendChild(elLabela);

        tb = document.createElement("input");
        tb.className = "kolicina";
        tb.type = "number";
        kontForma.appendChild(tb);


        let tipoviBiljaka = ["zeljaste", "drvenaste"];
        let tipoviBoja = ["#43C59E", "#A24936"];

        let opcija = null;
        let labela = null;
        let divRb = null;
        tipoviBiljaka.forEach((tip, index) => {
            divRb = document.createElement("div");
            divRb.classList.add("tipBiljke")
            opcija = document.createElement("input");
            opcija.type = "radio";
            opcija.name = this.naziv;
            opcija.value = tipoviBoja[index];

            labela = document.createElement("label");
            labela.innerHTML = tip;


            divRb.appendChild(opcija);
            divRb.appendChild(labela);
            kontForma.appendChild(divRb);
        })


        divRb = document.createElement("div");
        let selX = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "X:"
        divRb.appendChild(labela);
        divRb.appendChild(selX);
        divRb.classList.add("X")

        for (let i = 0; i < this.m; i++) {
            opcija = document.createElement("option");
            opcija.innerHTML = i;
            opcija.value = i;
            selX.appendChild(opcija);
        }

        kontForma.appendChild(divRb);


        let selY = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "Y:"
        divRb.appendChild(labela);
        divRb.appendChild(selY);

        for (let i = 0; i < this.n; i++) {
            opcija = document.createElement("option");
            opcija.innerHTML = i;
            opcija.value = i;
            selY.appendChild(opcija);
        }

        kontForma.appendChild(divRb);

        const dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj biljke";
        kontForma.appendChild(dugme);

        const dugmeUKL=document.createElement("button");
        dugmeUKL.innerHTML="Ukloni biljke";
        kontForma.appendChild(dugmeUKL);

        dugme.onclick=(ev)=>{
            
            const vrsta = this.kontejner.querySelector(".vrsta").value;
            const kolicina = parseInt(this.kontejner.querySelector(".kolicina").value);

            const tip = this.kontejner.querySelector(`input[name='${this.naziv}']:checked`);

            if(tip==null || vrsta=="" || isNaN(kolicina))
                alert("Molimo Vas unesite ime biljke,kolicinu i izaberite njen tip");
            else
            {
            let x = parseInt(selX.value);
            let y = parseInt(selY.value);


          /*  let potenzijalnaLok=this.lokacije.find(lok=>lok.vrsta==vrsta
                && lok.kapacitet+kolicina<=this.kapacitet
                && (lok.x!=x || lok.y!=y) );
            if(potenzijalnaLok)
            alert("Postoji nepopunjena lokacija sa navedenom vestom! Lokacija je ("+potenzijalnaLok.x+","+potenzijalnaLok.y+")");
            else
             this.lokacije[x*this.n+y].azurirajLokaciju(vrsta, kolicina,tip.value,x,y);*/
             fetch("https://localhost:5001/Basta/UpisLokacije/" + this.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    vrsta: vrsta,
                    kapacitet: kolicina,
                    maxKapacitet: this.kapacitet,
                    tip: tip.value,
                    x: x,
                    y: y,

                })
            }).then(p => {
                if (p.ok) {
                    this.lokacije[x * this.n + y].azurirajLokaciju(vrsta, kolicina, tip.value, x, y); 
                }
                else if (p.status == 400) {
                    // BadRequest vraća lokaciju kao json. Zato čitamo taj json ispod i upisujemo u greskaLokacija, koju ispisujemo u alert-u.
                    const greskaLokacija = { x: 0, y: 0 };
                    p.json().then(q => {
                        greskaLokacija.x = q.x;
                        greskaLokacija.y = q.y;
                        alert("Postoji nepopunjena lokacija sa navedenom mestom! Lokacija je (" + greskaLokacija.x + "," + greskaLokacija.y + ")");
                    });
                }
                else {
                   // alert("Greška else."+p.status);\
                   alert("Kapacitet ne sme da premasuje maximum");
                }
            }).catch(p => {
                alert("Greška catch.");
            });
            }
        }

        dugmeUKL.onclick=(ev)=>{
            
            const vrsta = this.kontejner.querySelector(".vrsta").value;
            const kolicina = parseInt(this.kontejner.querySelector(".kolicina").value);
            //console.log(vrsta);
            const tip = this.kontejner.querySelector(`input[name='${this.naziv}']:checked`);

            if(tip==null)
                alert("Molimo Vas izaberite tip biljke");

            let x = parseInt(selX.value);
            let y = parseInt(selY.value);




            fetch("https://localhost:5001/Basta/OduzimajLokacije/" + this.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    vrsta: vrsta,
                    kapacitet: kolicina,
                    maxKapacitet: this.kapacitet,
                    tip: tip.value,
                    x: x,
                    y: y,

                })
            }).then(p => {
                if (p.ok) {
                    this.lokacije[x * this.n + y].azurirajLokacijuUKL(vrsta, kolicina, tip.value, x, y);
                }
                else if (p.status == 400) {
                    // BadRequest vraća lokaciju kao json. Zato čitamo taj json ispod i upisujemo u greskaLokacija, koju ispisujemo u alert-u.
                    const greskaLokacija = { x: 0, y: 0 };
                    p.json().then(q => {
                        greskaLokacija.x = q.x;
                        greskaLokacija.y = q.y;
                        alert("Postoji nepopunjena lokacija sa navedenom mestom! Lokacija je (" + greskaLokacija.x + "," + greskaLokacija.y + ")");
                    });
                }
                else {
                    //this.lokacije[x * this.n + y].azurirajLokacijuUKL(vrsta, kolicina, tip.value, x, y);
                    alert("Status 400.");
                }
            }).catch(p => {
                alert("P nije ok.");
            });


            //let potenzijalnaLok=this.lokacije.find(lok=>lok.vrsta==vrsta );
            //if(potenzijalnaLok)
            //                                                                                    this.lokacije[x*this.n+y].azurirajLokacijuUKL(vrsta, kolicina,tip.value,x,y);
            //alert("Postoji nepopunjena lokacija sa navedenom vestom! Lokacija je ("+potenzijalnaLok.x+","+potenzijalnaLok.y+")");
           // else
            // this.lokacije[x*this.n+y].azurirajLokacijuUKL(vrsta, kolicina,tip.value,x,y);
        }





    }
    crtajLokacije(host) {
        const kontLokacije = document.createElement("div");
        kontLokacije.className = "kontLokacije";
        host.appendChild(kontLokacije);
        let red;
        let lok;
        for (let i = 0; i < this.m; i++) {
            red = document.createElement("div");
            red.className = "red";
            kontLokacije.appendChild(red);
            for (let j = 0; j < this.n; j++) {
                //lokacija= document.createElement("div");
                // lokacija.className="lok";
                lok = new Lokacija(i, j, "", "", this.kapacitet);
                this.dodajLokaciju(lok);
                lok.crtajLokaciju(red);
            }
        }
    }

}