var boxes=[];
var started=true;
var colors=["green","blue","yellow"];
var map=new Map();
var size,color;
var points=0;




$(document).keypress(function(){
    if(started===true)
        {
            var audio=new Audio("sounds/next-level.wav");
            audio.play();
            $(".title").html("Total Points- "+points);
            generate();
            show();
            started=false;
        }
    else if(started==="over")
       {
           startOver();
       }
    
  
});



function generate()
{
    var nobox = Math.floor(Math.random() * 11); 
    
    if(nobox===0)
        nobox=7; 
    size=nobox;
    $("#remain").text(nobox);
  
    while(nobox!=0)
    {
     var temp=Math.floor(Math.random() * 24);
     if(boxes.includes(temp)===true)
        continue;
     else{
        nobox=nobox-1;
        boxes.push(temp);
        map.set(temp,1);
     }
    }


  if(started===false)
     show();
}


function show()
{
       
      color=colors[Math.floor(Math.random()*3)];
    
     for(var i=0;i<boxes.length;i++)
     {
         var index=boxes[i].toString();
        $("#"+index).css({"background-color":color,"box-shadow":"10px 10px 5px white","border-color":"darkslategrey"});
        
        
     }
     setTimeout(function () {
        for(var i=0;i<boxes.length;i++)
      {
         var index=boxes[i].toString();
        
            $("#"+index).css({"background-color":"black","box-shadow":"none","border-color":"grey"});
        
        
       
      }
      }, 1000);
    

}


 $(".box").click(function(){
     if(started!="over" && started!=true)
     {
        
        var box_no=$(this).attr("id")*1;
       
              if(boxes.includes(box_no)===true)
              {
                 
                  if(map.get(box_no)===1)
                  {
                    var audio=new Audio("sounds/answer.wav");
                    audio.play();
                      
                      
                      map.set(box_no,0);
                      size=size-1;
                      $("#remain").text(size);
                      $("#"+box_no.toString()).css({"background-color":color,"box-shadow":"10px 10px 5px white","border-color":"darkslategrey"});
                      points=points+10;
                      $(".title").html("Total Points- "+points);
                  }   
                  
              }
              else
              {
                
                  $("body").addClass("over");
                  
                  setTimeout(function(){
                    $("body").removeClass("over");                                   
                  },200);

                  setTimeout(function(){
                    $("body").addClass("over");                                   
                 },400);

                   setTimeout(function(){
                              $("body").removeClass("over");                                   
                  },600);
                   gameover();
              }
  
  if(size===0)
  {
   
      
      setTimeout(function(){
          nextLevel();
      },2000);

      setTimeout(function(){
          generate();
      },3000);
      
      
  }
 }
     
});

function nextLevel()
{
    for(var i=0;i<boxes.length;i++)
    {
       var index=boxes[i].toString();
      
          $("#"+index).css({"background-color":"black","box-shadow":"none","border-color":"grey"});
    }
    boxes=[];
    var audio=new Audio("sounds/next-level.wav");
    audio.play();
   
   

}

function gameover()
{
    $(".title").html("Total Points-"+points +"<br> Press any Key to Restart ");
    $(".remain").html("Game Over");
    $(".remain").addClass("extra");
    $("#remain").css({"visibility":"hidden"});
    var audio=new Audio("sounds/game-over.mp3");
    $("#remain").text(0);
    audio.play();
    started="over";

    
}

function startOver()
{
    for(var i=0;i<boxes.length;i++)
    {
       var index=boxes[i].toString();
      
          $("#"+index).css({"background-color":"black","box-shadow":"none","border-color":"grey"});
    }
    $(".remain").removeClass("extra");
    $("#remain").css({"visibility":"visible"});
    $(".remain").html("Boxes Remaining")
     boxes=[];
     started=true;
     map.clear();
     points=0;
    
     $(".title").html("Press any Key to Start the Game ");
}

