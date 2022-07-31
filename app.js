window.addEventListener('load', izmesajSve);
let sviLevelDivovi = document.querySelectorAll('[class*="level"]');
let dvaParceta = [];
let trenutniPogled = 'level_1';
let brojilo = 0;
let zaBrojaca = document.querySelector('.zaBrojac');

function izmesajSve() {

    for (const levelDiv of sviLevelDivovi) {

        let sviParcici = levelDiv.querySelectorAll('[class*="img_holder"]');
        let nizRedosleda = [];

        for (let i = 0; i < sviParcici.length; i++) {
            nizRedosleda.push(i + 1);            
        }

        for (let i = 0; i < sviParcici.length; i++) {
            let rand = Math.floor(Math.random()*nizRedosleda.length);
            sviParcici[i].style.order = nizRedosleda[rand];
            nizRedosleda.splice(rand, 1);            
        }
    }
    pocniIgru();
}

function pocniIgru() {
    //set links to show hide
    staviNavLinkove();

    //postavi klikove na sve parcice
    dodajKlikoveNaParcice();
}

function dodajKlikoveNaParcice() {
    let sviParcici = document.querySelectorAll('[class*="img_holder"]');
    for (const parce of sviParcici) {
        parce.addEventListener('click', obeleziMe);
    }
}

function obeleziMe() {
    this.style.border = "2px solid green";
    dvaParceta.push(this); 
    //gurne u taj niz bukvalno ceo div na koji se klikne, Array [ div.img_holder_1, div.img_holder_1 ]
    console.log(dvaParceta);
    console.log(`---------- ${dvaParceta.length} ------------`);
    if (dvaParceta.length === 2) {
        //get order of clicks
        let orderFirst = window.getComputedStyle(dvaParceta[0]).getPropertyValue('order');
        let orderSecond = window.getComputedStyle(dvaParceta[1]).getPropertyValue('order');
        //reorder
        dvaParceta[0].style.order = orderSecond;
        dvaParceta[1].style.order = orderFirst;

        dvaParceta[0].style.border = "none";
        dvaParceta[1].style.border = "none";

        //reset, zbog ovoga je length od ovog niza uvek 0 kada izbacuje console.log
        dvaParceta.length = 0;

        brojilo++;
        document.getElementById('brojac').innerText = brojilo;

        daLiJeGotovo();
    }

    // brojilo++;
    // document.getElementById('brojac').innerText = brojilo;
}

function daLiJeGotovo() {
    let trenutniDiv = document.querySelector('.' + trenutniPogled);
    let sviParcici = trenutniDiv.querySelectorAll('[class*="img_holder"]');

    let praviRedosled = [];

    for (let i = 0; i < sviParcici.length; i++) {
        praviRedosled.push(i + 1);        
    }

    let trenutniRedosled = [];

    for (let i = 0; i < sviParcici.length; i++) {
        const parce = sviParcici[i];
        trenutniRedosled.push(window.getComputedStyle(parce).getPropertyValue('order'));
    }

    if (trenutniRedosled.toString() == praviRedosled.toString()) {
        let aktivniLink = document.querySelector('.active');
        aktivniLink.classList.add('zavrsenoLink');
        trenutniDiv.classList.add('zavrsenoDiv');
        zaBrojaca.classList.add('gotovoBrojanje');
    }
}

function staviNavLinkove() {
    let navLinkovi = document.querySelectorAll('[data-lvl]');

    for (let i = 0; i < navLinkovi.length; i++) {
        const link = navLinkovi[i];
        link.addEventListener('click', function() {
          trenutniPogled = this.getAttribute('data-lvl'); //misli se na taj na koji se kliknulo, zato mu je this

          for (const mojLink of navLinkovi) {
              mojLink.classList.remove('active');
          }

          this.classList.add('active'); //misli se na taj na koji se kliknulo, zato mu je this

          zaBrojaca.classList.remove('gotovoBrojanje');

          brojilo = 0;
          document.getElementById('brojac').innerText = brojilo;

          for (let i = 0; i < sviLevelDivovi.length; i++) {
            sviLevelDivovi[i].style.display = 'none';              
          }

          let divZaPrikaz = document.querySelector('.' + trenutniPogled);
          divZaPrikaz.style.display = "flex";
        })
    }
}

/* 
const izmesajSve = () => {
Ovako sa arrow nece da radi ako se prvo pozove gore
u addEventListener, a hoce sa --function-- da radi
iako je f-ja definisana ispod njenog samog pozivanja
}
*/