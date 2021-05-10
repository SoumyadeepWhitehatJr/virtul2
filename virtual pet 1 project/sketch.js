//Create variables here
var dog,happyDog,database,foodS,foodStock
var happyDogImage,dogImage,foodObj,lastFed,fedTime
var dogImage,feed,addFood,add

function preload()
{
happyDogImage=loadImage("dd.png")
 dogImage=loadImage("gg.png")


}

function setup() {
  database=firebase.database()
	createCanvas(1000,400)
foodObj=new Food()

foodStock=database.ref('Food')
foodStock.on("value",readStock)


  dog=createSprite(800,200,150,150)

  dog.addImage(dogImage)
  dog.scale=0.1

 

  feed= createButton("FeedDog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
      
}


function draw() {  
  background("red")
  foodObj.display()
  fedTime=database.ref("FeedTime")
  fedTime.on("value",function(data){

lastFed=data.val()

  })
fill("black")
textSize(20)

if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
 }else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + " AM", 350,30);
 }

  
          
  drawSprites();
  //add styles here
  
          }

 


function readStock(data){

foodS=data.val();
foodObj.updateFoodStock(foodS)
}
function feedDog(){
dog.addImage(happyDogImage)

  if(foodObj.getFoodStock()<=0){

  foodObj.updateFoodStock(foodObj.getFoodStock()*0)
}


else{

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)


}
database.ref('/').update({

Food:foodObj.getFoodStock(),
FeedTime:hour()

})

}


 function addFoods(){
foodS++

database.ref('/').update({

Food:foodS

})
}