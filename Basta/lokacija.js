export class Lokacija {
    

    constructor(i, j, tip, vrsta, Maxkapacitet) {
      
        this.x = i;
        this.y = j;
        this.kapacitet = 0;
        this.maxKapacitet = Maxkapacitet;
        this.tip = tip; //boja stabla
        this.vrsta = vrsta;// suncokret, bor...
        this.miniKontejner = null;

    }

    vratiBoju() {
        if (!this.tip)
            return "#CE8147";
        else
            return this.tip;
    }
    crtajLokaciju(host) {

        this.miniKontejner = document.createElement("div");
        this.miniKontejner.className = "lok";
        this.miniKontejner.innerHTML = "Prazno, " + this.kapacitet + ", (" + this.maxKapacitet + ")";
        this.miniKontejner.style.backgroundColor = this.vratiBoju();
        host.appendChild(this.miniKontejner);

    }
    azurirajLokaciju(vrsta, kolicina, tip, x, y) {

        console.log("pozvano azuriranje");

        if (kolicina + this.kapacitet > this.maxKapacitet)
            alert("Kapacitet lokacije je popunjen");
        else {

            console.log(kolicina);
            this.vrsta = vrsta;
            this.tip = tip;
            this.kapacitet += kolicina;
            this.miniKontejner.innerHTML = this.vrsta + ", " + this.kapacitet + ", (" + this.maxKapacitet + ")";
            this.miniKontejner.style.backgroundColor = this.vratiBoju();
        }
    }
    azurirajLokacijuUKL(vrsta, kolicina, tip, x, y) {

        console.log("pozvano azuriranje");

        if (this.kapacitet - kolicina < 0)
            alert("Kapacitet lokacije ne sme biti manji od 0");
        else {
            if(this.vrsta!==vrsta || this.tip!==tip)
                alert("Molimo Vas unesite ispravno ime vrste i izaberite ispravan tip");
            else{
            //console.log(kolicina);
            this.vrsta = vrsta;
            //this.tip = tip;
            this.kapacitet -= kolicina;
            this.miniKontejner.innerHTML = this.vrsta + ", " + this.kapacitet + ", (" + this.maxKapacitet + ")";
            this.miniKontejner.style.backgroundColor = this.vratiBoju();
        }}
    }
}