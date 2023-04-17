var btnClickId = "";
function display(num){
    btnClickId = num;
}

// negatif positif
function toPos(nbr){
    if(nbr<0)
        return nbr*(-1);
    else    
        return nbr;
}

function countBall(btnList){
    let cpt=0;
    for(let i=0;i<btnList.length;i++){
            if(btnList[i].value == 1)
                cpt++;
    }
    return cpt;
}

function _$(elts){
    return document.getElementById(elts);
}

function _createElements(elts){
    return document.createElement(elts);
}

function eraseBall(tab,lineSuppress, colSuppres, lastBtnClick, btnClickId, btnList){
    let eltsToDel = _$("btn_L"+(lineSuppress)+"_C_"+colSuppres);
    var lastElms = _$(lastBtnClick);
    var newElms = _$(btnClickId);
    if(eltsToDel.value == 1 && newElms.value!=1 && lastElms.value == 1){
        tab[lineSuppress][colSuppres] = 0;
        
        let IdBouleSupprime = _$("btn_L"+lineSuppress+"_C_"+colSuppres);
        IdBouleSupprime.value = 0;

        //supprimer l'ancienne boule
        let lastElms = _$(lastBtnClick);
        lastElms.value = 0;

        //nouvelle boule dans le bouton cliqué
        let newElms = _$(btnClickId);
        newElms.value = 1;

        btnClickId="";
        lastBtnClick="";
        repaint(btnList);
        
        NbrBoule.innerHTML = 'Number of ball : '+ parseInt(countBall(btnList));
        //s'il ne reste qu'une boule, nous avons gagné
        if(countBall(btnList) == 1){
            alert("Félicitation, vous avez gagné");
        }
    }
}

function repaint(btnList){
    for(let i=0; i<tab.length;i++){
        for(let j=0;j<tab[i].length;j++){
            for(let z=0;z<btnList.length;z++){
                if(btnList[z].value==1){
                    btnList[z].setAttribute('style','background-image: '+pawnImage+';');
                }
                else if(btnList[z].value==0){
                    btnList[z].removeAttribute('style','background-image:'+pawnImage+';');
                    btnList[z].setAttribute('style','background : url(../img/solitaire3.jpg);');
                }      
            }
        }
    }
}

var pawnImage = 'url(../img/pierre1.jpg)';
var tab = [["O","O","O","O","O","O","O","O","O"],
            ["O","O","O","O","O","O","O","O","O"],
            ["O","O","O",0,1,1,"O","O","O"],
            ["O","O",1,1,1,1,1,"O","O"],
            ["O",1,1,1,1,1,1,1,"O"],
            ["O",1,1,1,1,1,1,1,"O"],
            ["O",1,1,1,1,1,1,1,"O"],
            ["O","O",1,1,1,1,1,"O","O"],
            ["O","O","O",1,1,1,"O","O","O"],
            ["O","O","O","O","O","O","O","O","O"],
            ["O","O","O","O","O","O","O","O","O"]];
var cptBtn=0;
let NbrBoule = _$('NbrBoule');
var createTable = function(){
    let tbody = _$("tbody");

    for(let i=0; i<tab.length;i++){
        let tr = _createElements("tr"); 
        tbody.appendChild(tr);
        for(let j=0;j<tab[i].length;j++){
            tbody.appendChild(tr);

            let td = _createElements("td");
            tr.appendChild(td);
            
            let cases = _createElements("span");
            cases.innerHTML = tab[i][j];
            cases.id = "cases_L"+i+"_C_"+j;
            if(cases.textContent!="O"){
                let btn = _createElements("button");
                cptBtn++;
                // btn.innerHTML = tab[i][j];
                btn.id = "btn_L"+i+"_C_"+j;
                btn.value = tab[i][j];
                btn.setAttribute('onclick',"display('"+btn.id+"')");
                td.appendChild(btn);
            }

        }
    }
}

createTable();

window.addEventListener('load',(e)=>{
    e.preventDefault();
    let btnList = document.getElementsByTagName('button');
    let tempLastBtnClick = "";  //variable temporaire
    let cptClick = 0; 
    let lastBtnClick = "";

    repaint(btnList);

    document.addEventListener('click',(e)=>{   
        for(let x=0;x<tab.length;x++){
            for(let y=0;y<tab[x].length;y++){
                let ID = "btn_L"+x+"_C_"+y;
                let elems = _$(ID);
                if(elems!=null){
                    elems.removeAttribute('style','border : 2px solid  rgba(0, 255, 21, 0.5);');
                    if(elems.value!=0){
                        elems.setAttribute('style','background-image: '+pawnImage+';');
                    }
                    if(elems.value==0){
                        elems.setAttribute('style','background : url(../img/solitaire3.jpg);');
                    }
                        
                }
                    
            }
        }

        if(cptClick == 0){
            tempLastBtnClick = btnClickId;
        }else{
            lastBtnClick = tempLastBtnClick;
            tempLastBtnClick = btnClickId;
        }
        let ElementBtnChoosed = _$(btnClickId);
        if(btnClickId == ElementBtnChoosed.id && ElementBtnChoosed.value!=0){
            let btn = document.querySelector('.btnBorderBlue');
            cptClick = 1; 
            if(btn)
                btn.classList.remove('btnBorderBlue');
            ElementBtnChoosed.classList.add('btnBorderBlue') ;
        }
     
        let lvalidLine = parseInt(btnClickId[5]);
        let validCol = parseInt(btnClickId[9]);

        let Lhaut = _$("btn_L"+(lvalidLine-2)+"_C_"+validCol);
        let Lbas = _$("btn_L"+(lvalidLine+2)+"_C_"+validCol);
        let Cgauche = _$("btn_L"+lvalidLine+"_C_"+(validCol-2));
        let Cdroite = _$("btn_L"+lvalidLine+"_C_"+(validCol+2));
        
        //choix des placement
        if(_$(btnClickId).value == 1){//ra mbola misy boule le kitiana dia afaka manao choix placement
            if(Lhaut!=null && Lhaut.value==0 && _$("btn_L"+(lvalidLine-1)+"_C_"+validCol).value==1)
                Lhaut.setAttribute('style','border : 2px solid  rgba(0, 255, 21, 0.5);background : url(../img/solitaire3.jpg);');
            if(Lbas!=null && Lbas.value==0 && _$("btn_L"+(lvalidLine+1)+"_C_"+validCol).value==1)
                Lbas.setAttribute('style','border : 2px solid rgba(0, 255, 21, 0.5);background : url(../img/solitaire3.jpg);');
            if(Cgauche!=null && Cgauche.value==0 && _$("btn_L"+lvalidLine+"_C_"+(validCol-1)).value==1)
                Cgauche.setAttribute('style','border : 2px solid rgba(0, 255, 21, 0.5);background : url(../img/solitaire3.jpg);');
            if(Cdroite!=null && Cdroite.value==0 && _$("btn_L"+lvalidLine+"_C_"+(validCol+1)).value==1)
                Cdroite.setAttribute('style','border : 2px solid  rgba(0, 255, 21, 0.5);background : url(../img/solitaire3.jpg);');
        }
        
        
        //suppression d'une boule
        if(((lastBtnClick[5] - btnClickId[5])==0) && lastBtnClick!="" && lastBtnClick != btnClickId){ //si meme ligne
            let colSuppres ;
            let lineSuppress = btnClickId[5];

            if(parseInt(lastBtnClick[9]) > parseInt(btnClickId[9])  && ((parseInt(lastBtnClick[9])-1) != parseInt(btnClickId[9]))){
                colSuppres = parseInt(lastBtnClick[9]) - 1;
                eraseBall(tab,lineSuppress,colSuppres,lastBtnClick,btnClickId,btnList);
                    
    
            }
            else{
                if(parseInt(lastBtnClick[9]) < parseInt(btnClickId[9])  && ((parseInt(lastBtnClick[9])) != (parseInt(btnClickId[9])-1))){
                        colSuppres = parseInt(btnClickId[9]) - 1;
                        eraseBall(tab,lineSuppress,colSuppres,lastBtnClick,btnClickId,btnList);
                }
                
            }  
                    

        }else{
            //si même colonne
            if(((lastBtnClick[9] - btnClickId[9])==0) && lastBtnClick!=""  && lastBtnClick != btnClickId ){ 
                let lineSuppress;
                let colSuppres = btnClickId[9];
                
                if((parseInt(lastBtnClick[5]) > parseInt(btnClickId[5])) && ((lastBtnClick[5]-1) != btnClickId[5])){
                    lineSuppress = parseInt(lastBtnClick[5]) - 1;
                    eraseBall(tab,lineSuppress,colSuppres,lastBtnClick,btnClickId,btnList);  
                }
                    
                else {
                    if((parseInt(lastBtnClick[5]) < parseInt(btnClickId[5])) && (lastBtnClick[5] != (btnClickId[5]-1))){
                        lineSuppress = parseInt(btnClickId[5]) - 1;
                        eraseBall(tab,lineSuppress,colSuppres,lastBtnClick,btnClickId,btnList);   
                    }
                }     
            } 
        }
    });        
})
