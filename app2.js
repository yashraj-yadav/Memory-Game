
let arr = [[1,2,3,4,5],[6,7,8,9,10],[11,12,1,2,3],[4,5,6,7,8],[9,10,11,12,"+30"]];
let score=0;
let scr = document.querySelector(".score");
let cards=25;
let res = document.querySelector(".reset");
res.addEventListener("click",function(){
    reset();
})
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function shuffle2DArray(array) {
    // Flatten the 2D array into a 1D array
    const flatArray = array.reduce((acc, row) => acc.concat(row), []);
    
    // Shuffle the 1D array
    const shuffledFlatArray = shuffleArray(flatArray);
    
    // Reshape the shuffled 1D array back into a 2D array
    const shuffledArray = [];
    while (shuffledFlatArray.length) {
        shuffledArray.push(shuffledFlatArray.splice(0, array[0].length));
    }
    
    return shuffledArray;
}
arr = shuffle2DArray(arr);
function reset()
{
    cards=25;
    score=0;
    let btns = document.querySelectorAll(".box");
    for(let btn of btns)
    {
        btn.classList.remove("rotate");
    }
    scr.innerText=`Score: ${score}`;
}
/*  */
function addValues()
{
    let cn = document.querySelector(".container");
    let i=0,j=0;
    for(line of cn.children){
        j=0;
        for(col of line.children){
            let k = col.children; /* k = [div.front,div.back] */
            k[1].innerText=arr[i][j];
            j++;
        }
        i++;
    }
}
addValues();

function compare(card){
    let first=card[0];
    let second=card[1];
    if(first.innerText=="?\n+30")
    {
        second.classList.remove("rotate");
        score+=30;
        cards--;
    }
    else if(second.innerText=="?\n+30")
    {
        first.classList.remove("rotate");
        score+=30;
        cards--;
    }
    else if(first.innerText==second.innerText)
    {
        console.log("same");
        score+=10;
        cards-=2;
    }
    else
    { 
        console.log("not same");
         score--;
        clickedcard.forEach(card => {
            card.classList.remove("rotate");
        });
    }
    scr.innerText=`Score: ${score}`;
    if(score==150)
    {
        setTimeout(()=>{
            reset();
        },5000);
     }
}

let clickedcard=[];
function clicked(){
    let btns = document.querySelectorAll(".box");
    for(let btn of btns)
    {
        btn.addEventListener("click",function(){
            if(!btn.classList.contains("rotate"))
            {
                btn.classList.add("rotate"); 
                clickedcard.push(btn);
            }
            if(clickedcard.length==2)
            {
                setTimeout(function(){
                    compare(clickedcard);
                    clickedcard=[];
                },500);
                
            }
        });
    }
}
clicked();