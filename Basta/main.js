import { Poljoprivrednik } from "./admin.js"

// const adminara = new Poljoprivrednik("miomir","bb 12");

// adminara.upravljackiDugmici();


// const adminara1 = new Poljoprivrednik("miomir","bb 12");

// adminara1.upravljackiDugmici();
var unos=document.createElement("div");
unos.className="unosPOLJOPRIVREDNIKA";
var o = document.createElement("div");
o.className="qwerty"
var x=document.createElement("label");
var y=document.createElement("input");
y.className="uneseno-ime";
x.innerHTML="UNESI IME POLJOPRIVREDNIKA";
x.className="unesi-ime";
o.appendChild(x);
o.appendChild(y);

var r = document.createElement("div");
r.className="qwert"
var t=document.createElement("label");
var f=document.createElement("input");
f.className="unesena-adresa";
t.innerHTML="UNESI ADRESU POLJOPRIVREDNIKA";
t.className="unesi-adresu";
r.appendChild(t);
r.appendChild(f);

unos.appendChild(o);
unos.appendChild(r);

var ddd=document.createElement("button");
ddd.innerHTML="DODAJ"
unos.appendChild(ddd);
document.body.appendChild(unos);

ddd.onclick=(ev)=> {
    const ime_poljop = document.body.querySelector(".unosPOLJOPRIVREDNIKA").querySelector(".qwerty").querySelector(".uneseno-ime").value;
    const adresa_poljop = document.body.querySelector(".unosPOLJOPRIVREDNIKA").querySelector(".qwert").querySelector(".unesena-adresa").value;
    fetch("https://localhost:5001/Basta/UpisiPoljoprivrednike" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    naziv:  ime_poljop,
                    adresa: adresa_poljop
                    })
            }).then(p => {
                if (p.ok) {
                    p.json().then(data=>{
                        let pol = new Poljoprivrednik(data,ime_poljop,adresa_poljop);
                   
                        pol.upravljackiDugmici();
                        
                        
                        
                    })
                   

                    
            }
                else {
                    alert("Greška prilikom upisa.");
                     }
            }).catch(p => {
                alert("Greška prilikom upisa.");
            });

}



fetch("https://localhost:5001/Basta/PreuzmiPoljoprivrednike").then(p => {
    p.json().then(data => {
        data.forEach(el => {
            const polj= new Poljoprivrednik(el.id, el.naziv, el.adresa);
            polj.upravljackiDugmici();
        });
    });
});
