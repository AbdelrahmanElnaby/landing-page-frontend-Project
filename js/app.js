const sections=document.querySelectorAll('section');

function createUnorderdList(){
    
    const unorderedList=document.getElementById('navbar__list');
    const container=document.createDocumentFragment();
    for( const section of sections){
        section.setAttribute('class','');
        const listItem=document.createElement('li');
        const content=section.getAttribute('data-nav');
        listItem.innerHTML=`<a href=${'#'+section.id} name=${section.id} class='menu__link' style='text-decoration: none;'> ${content}</a>`;
       
        container.appendChild(listItem);
        
    };
    unorderedList.appendChild(container);
 
}




function anchorEvent(){
    const menu=document.getElementById('navbar__list');
    menu.addEventListener('click',event =>{
        if(event.target.className === 'menu__link'){
            event.preventDefault();
            const section=document.getElementById(`${event.target.name}`);
            section.scrollIntoView(true);
        }   
    });
};


let state=0;
let tempSection=undefined;

document.addEventListener('scroll',  ()=> {
    
    if(state === 0){
        for(const section of sections){
            if(isNotPassed(section)){
                tempSection=section;
                break;
            }

        }

        if(tempSection && isInView(tempSection)){
            tempSection.classList.add('active');
            state=1;
        }

    }
    else {
        if(!isInView(tempSection)){
            tempSection.classList.remove('active');
            state=0;
        }

    }
      
    

});

function isNotPassed(section){
    topValue=sectionElementRect(section).top;
    return (topValue > 0);
}

function getViewHeigth(){
    const height= window.innerHeight || document.documentElement.clientHeight;
    return height;
}
function isInView(section){
    const elementRect=sectionElementRect(section);
    const bottom=elementRect.bottom;
    return ( bottom > 0 && bottom <= getViewHeigth() );
}

function sectionElementRect(section){
    const elementRect=section.firstElementChild.firstElementChild.getBoundingClientRect();
    return elementRect;
}


createUnorderdList();
anchorEvent();