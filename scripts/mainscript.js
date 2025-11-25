document.getElementById('carCount').value=
localStorage.getItem("carCount") || 1;
document.getElementById('mutationAmount').value=
localStorage.getItem("mutationAmount") || '0.5';
const carCanvas=document.getElementById("carCanvas");
const networkCanvas=document.getElementById("networkCanvas");
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road=new Road(carCanvas.width/2,carCanvas.width*0.9);
const N=Number(document.getElementById('carCount').value);
const cars=generateCars(N);
let bestCar=cars[0];
if(!localStorage.getItem("beenHereBefore")){
    localStorage.setItem("beenHereBefore","true");
    localStorage.setItem("bestBrain",'{"levels":[{"inputs":[0,0.24854552786283346,0.2506801831057158,0.32506388835156763,0.19984269969615542,0,0,0,0.11630312935073428,0.4616030577422917,0.6064279615936463,0.6841882716482615,0.7311798197359982,0.7612666459953492],"outputs":[1,1,1,0,0,0],"biases":[-0.11352987295831585,0.01790431767737455,-0.5866294430297772,-0.15035632775596985,0.8701290468936551,0.9464008804403361],"weights":[[-0.19510412468396,0.06723737778820849,0.7267859453378724,-0.8138713219111069,0.9530478000283424,-0.9784839330856405],[0.3465171674274721,-0.7667821168364604,-0.08516221810159386,0.5918788043851724,-0.6689747380855988,0.9869129953985489],[-0.8593667093226056,0.3836143885614425,0.47259285990638,-0.8217937688719676,0.07235148915832301,-0.39110331005312293],[0.20037516680538747,0.6046173807181834,0.9707378526253412,-0.16813579632560804,0.8634289435548235,-0.5974627216627735],[-0.07650313026011712,-0.724001375017034,0.18040436733869925,0.32644536862878204,0.4296444730171616,0.13007797260086562],[-0.6938509927457941,0.5102878723729167,-0.3983589005798549,-0.9880937209020915,0.7790493212649396,-0.500685008387409],[-0.9430301533255738,0.8084151445418382,0.7976272163513463,-0.034504060663070435,0.30792837860469047,0.1462069286859884],[0.6299051991535962,-0.5897389738052465,-0.45470771013236133,0.38028520521167186,0.5302918464946655,0.281004861675624],[0.9771822961159107,-0.0122296507003401,-0.3799336439511585,0.836124146557536,0.8513751706405892,0.3018824172753458],[-0.20905943272955296,0.3666244572539492,-0.7709780125843948,-0.7408755844526307,0.33988370744639784,-0.07701778732120279],[-0.784953648094336,0.6457628598820102,-0.46555911258446825,-0.7509058628827743,-0.4938251718389497,0.1080057201726421],[0.2855480700592341,0.5691694929461191,0.2415265913450202,0.9797190831435543,-0.7263390416833917,0.32608043389817],[0.6563940930598113,-0.8011929050152782,-0.27332816975180796,0.8451913971150387,-0.11017972157663736,-0.10046531361456412],[0.11203254439633126,0.5068755723398815,0.26603029363914477,-0.9816512160851654,0.186132482745611,0.6681311727130719]]},{"inputs":[1,1,1,0,0,0],"outputs":[1,1,1,0],"biases":[0.19092698382769013,-0.5717327853680858,-0.9698739820368827,0.44936836935316715],"weights":[[0.6150505179329024,0.17434755134784918,-0.4807531585738818,-0.9546668958692972],[0.16382022506144156,0.9154380300030374,-0.09595606998988715,-0.24417760396252053],[0.5057153289169749,-0.7963104899113038,0.4895452000209741,-0.7994452146212907],[0.14140181719100098,-0.10150409424706042,-0.6972494648346907,-0.3582453654225817],[-0.9014116595673858,0.7424749151788692,-0.399257749833521,-0.36432772623981635],[0.4538594853391549,-0.7065659027614566,-0.7715347980512195,-0.41737092832437206]]}]}');
}
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,
                Number(document.getElementById('mutationAmount').value));
        }
    }
}

const traffic=[
    new Car(road.getLaneCenter(5),200,30,50,"DUMMY",3.1,getRandomColor()),
    new Car(road.getLaneCenter(4),-300,30,50,"DUMMY",2.5,getRandomColor()),
    new Car(road.getLaneCenter(3),-300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-500,30,50,"DUMMY",3.9,getRandomColor()),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",1.3,getRandomColor()),
    new Car(road.getLaneCenter(4),-700,30,50,"DUMMY",2.3,getRandomColor()),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2.4,getRandomColor()),
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2.9,getRandomColor()),
    new Car(road.getLaneCenter(3),-300,30,50,"DUMMY",3.5,getRandomColor()),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",4,getRandomColor()),
    new Car(road.getLaneCenter(4),-500,30,50,"DUMMY",3.3,getRandomColor()),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2.8,getRandomColor()),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",3.2,getRandomColor()),
    new Car(road.getLaneCenter(4),-700,30,50,"DUMMY",3.1,getRandomColor()),  
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2.1,getRandomColor()),
    new Car(road.getLaneCenter(4),-300,30,50,"DUMMY",1.7,getRandomColor()),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",3,getRandomColor()),
    new Car(road.getLaneCenter(4),-500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",4,getRandomColor()),
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",3.5,getRandomColor()),
    new Car(road.getLaneCenter(3),-300,30,50,"DUMMY",2.5,getRandomColor()),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",1.5,getRandomColor()),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",4,getRandomColor()),
    new Car(road.getLaneCenter(4),-500,30,50,"DUMMY",3.3,getRandomColor()),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2.8,getRandomColor()),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",3.2,getRandomColor()),
    new Car(road.getLaneCenter(4),-700,30,50,"DUMMY",3.1,getRandomColor()),  
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2.1,getRandomColor()),
    new Car(road.getLaneCenter(4),-300,30,50,"DUMMY",1.7,getRandomColor()),
    new Car(road.getLaneCenter(4),-500,30,50,"DUMMY",2.9,getRandomColor()),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2.2,getRandomColor()),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",3.1,getRandomColor()),
    new Car(road.getLaneCenter(4),-700,30,50,"DUMMY",2.7,getRandomColor()),  
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",3,getRandomColor()),

];

animate();
 function reloadPage() {
            try {
                location.reload(); // Reloads the page
            } catch (error) {
                console.error("Error reloading page:", error);
                alert("Unable to reload the page.");
            }
        }
function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}        
function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(3),100,30,50,"AI"));
    }
    return cars;
}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road,traffic);
    }
    bestCar=cars.find(
        c=>c.fitness==Math.max(
            ...cars.map(c=>c.fitness)
        ));

    carCanvas.height=window.innerHeight-400;
    networkCanvas.height=window.innerHeight-400;

    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx);
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,true);
    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}