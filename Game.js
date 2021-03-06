class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      //.once means  it will se only one time what is happening
      if(playerCountRef.exists()){
        //.exists() means i will just check if thre is an value in databse or not
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1,car2,car3,car4]
  }

  play(){
    //hide input,button,greetings
    form.hidedetails();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
   //undefined means no value have been assigned
   //!== opposite of ==
    if(allPlayers !== undefined){
      var y ;
      var index = 0
      var x  = 0
     //code to see the cars moving in ever tab as when you press up arrow key so that x and y axis should be change
      for(var plr in allPlayers){
        //all players is an array
       index= index+1
       //position the car alittle away from each other
        x=x+200;
        y=displayHeight-allPlayers[plr].distance
        cars[index-1].x = x;
        cars[index-1].y = y;
        //code to change the colour of active car to red
        if(index===player.index){
          cars[index-1].shapeColor = "red"
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites();
  }

}
