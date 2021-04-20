import { Lokacija } from "./lokacija.js";
import { Basta } from "./basta.js"

export class Poljoprivrednik{
    
    
    constructor(id,ime,adresa){
        this.id=id;
        this.ime=ime;
        this.adresa=adresa;
        this.klikV=null;
        this.baste=[];
    }
    dodajBastu(bas){
        this.baste.push(bas);
    }
    upravljackiDugmici(){
        
    this.klikV=document.createElement("div");
    this.klikV.className="klikV";

    let klik0=document.createElement("div");
    let elLab0 = document.createElement("label");
    elLab0.className="klik0"
    elLab0.innerHTML = this.ime;
    let elLab10 = document.createElement("label");
    elLab10.innerHTML = this.adresa;
    klik0.appendChild(elLab0);
    klik0.appendChild(elLab10);
    this.klikV.appendChild(klik0);



    let klik=document.createElement("div");
    const dodajB=document.createElement("button");
    dodajB.innerHTML="Dodaj bastu";
    dodajB.className="dodajB"
    
    const ukloniB=document.createElement("button");
    ukloniB.innerHTML="Ukloni bastu";
    
    klik.appendChild(dodajB);
    klik.appendChild(ukloniB);
    this.klikV.appendChild(klik);
    
    let klik1=document.createElement("div");
    klik1.className="klik1";
    let elLab1 = document.createElement("label");
    elLab1.innerHTML = "Ime Baste";
    elLab1.className="elLab1";
    klik1.appendChild(elLab1);
    let imeB=document.createElement("input");
    imeB.type="text";
    imeB.className="imeBasteOp";
    klik1.appendChild(imeB);
    this.klikV.appendChild(klik1);
    
    let klik2=document.createElement("div");
    klik2.className="klik2";
    let elLab2 = document.createElement("label");
    elLab2.innerHTML = "Broj kolona baste";
    elLab2.className="elLab2";
    klik2.appendChild(elLab2);
    let nDimenzija=document.createElement("input");
    nDimenzija.type="number";
    nDimenzija.className="dimenzijaN";
    klik2.appendChild(nDimenzija);
    this.klikV.appendChild(klik2);
    
    let klik3=document.createElement("div");
    klik3.className="klik3";
    let elLab3 = document.createElement("label");
    elLab3.innerHTML = "Broj vrsta baste";
    elLab3.className="elLab3";
    klik3.appendChild(elLab3);
    let mDimenzija=document.createElement("input");
    mDimenzija.type="number";
    mDimenzija.className="dimenzijaM";
    klik3.appendChild(mDimenzija);
    this.klikV.appendChild(klik3);
    
    let klik4=document.createElement("div");
    klik4.className="klik4";
    let elLab4 = document.createElement("label");
    elLab4.innerHTML = "Kapacitet Lokacija";
    elLab4.className="elLab4";
    klik4.appendChild(elLab4);
    let kapcitetLokacija=document.createElement("input");
    kapcitetLokacija.type="number";
    kapcitetLokacija.className="kapacitetLokacija";
    klik4.appendChild(kapcitetLokacija);
    this.klikV.appendChild(klik4);
    
    
    fetch("https://localhost:5001/Basta/PreuzmiBaste/" + this.id).then(p => {
                    p.json().then(data => {
                    data.forEach(el => {
                    const bas1 = new Basta(el.id, el.naziv, el.n, el.m, el.kapacitet);
                    this.baste.push(bas1);
                    bas1.crtajBastu(this.klikV);
                    
                     el.lokacije.forEach(l => {
                         bas1.lokacije[l.x * el.n + l.y].azurirajLokaciju(l.vrsta, l.kapacitet, l.tip, l.x, l.y);
                    });
                 });
            });
        });
    
        dodajB.onclick=(ev)=>{
           
        const ime_baste = this.klikV.querySelector(".imeBasteOp").value;
        const dimenzija_n = parseInt(this.klikV.querySelector(".dimenzijaN").value);
        const dimenzija_m = parseInt(this.klikV.querySelector(".dimenzijaM").value);
        const kapacitet_lokacija = parseInt(this.klikV.querySelector(".kapacitetLokacija").value);
        
        
        if(ime_baste =="" || isNaN(dimenzija_n)|| isNaN(dimenzija_m) || isNaN(kapacitet_lokacija) || this.baste.find(el=>el.naziv==ime_baste))
            alert("Molimo Vas popunite sve podatke i uverite se da baste imaju razlicita imena");
        else{


            fetch("https://localhost:5001/Basta/IzmeniBastu/" + this.id , {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    naziv:  ime_baste,
                    kapacitet: kapacitet_lokacija,
                    n: dimenzija_n,
                    m: dimenzija_n,
                    lokacije: []
                    })
            }).then(p => {
                if (p.ok) {
                    p.json().then(data=>{
                        let bas = new Basta(data,ime_baste,dimenzija_n,dimenzija_m,kapacitet_lokacija);
                   
                    bas.crtajBastu(this.klikV);
                    this.dodajBastu(bas);
                    })
                    
            }
                else {
                    alert("Greška prilikom upisa.");
                     }
            }).catch(p => {
                alert("Greška prilikom upisa.");
            });
        
            //let bas = new Basta(ime_baste,dimenzija_n,dimenzija_m,kapacitet_lokacija);
            //bas.crtajBastu(this.klikV); //ovde je preglednije document.body u odnosu na klikV
            //this.dodajBastu(bas);
            }
        }

        ukloniB.onclick=(ev)=>{
            const ime_baste = this.klikV.querySelector(".imeBasteOp").value;
           
           
          let potenzijalnaBasta=this.baste.find(el=>el.naziv==ime_baste); //vratio mi objekat koji je isti
        if(!potenzijalnaBasta)
            alert("Unesite bastu sa postojecim imenom");
        else{
          //console.log(document.getElementsByClassName(this.baste.parentNode.nodeName));
            //this.baste[this.baste.findIndex((el)=> el == potenzijalnaBasta)].style.display="none";
           //console.log(this.klikV.getElementsByClassName("klik1")); primer da radi
           let y=this.baste.findIndex((el)=> el == potenzijalnaBasta);
            let x1=this.klikV.getElementsByClassName("kontejner")[y];//.getElementsByClassName("kontForma").getElementsByClassName("header3").value=potenzijalnaBasta.naziv);
            let x2=x1.getElementsByClassName("kontForma")[0];
            let x3=x2.getElementsByClassName("header3")[0];
           // if(x3.innerHTML==potenzijalnaBasta.naziv)
            //{  
                x2.removeChild(x3);
                x1.removeChild(x2);
                this.klikV.removeChild(x1);
            //}
           this.baste.splice(this.baste.findIndex((el)=> el == potenzijalnaBasta), 1);//brisanje elementa iz niza
           //console.log(this.baste);
            
    fetch("https://localhost:5001/Basta/IzbrisiBastu/"+potenzijalnaBasta.id, {
    headers: {
        'Access-Token': 'token'
        },
        method: 'delete'
        }).then((data) => {
    data.text().then(text => console.log(text));
    });


           




            }
        }
        document.body.appendChild(this.klikV);
       
        
    }
}