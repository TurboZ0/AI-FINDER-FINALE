 model_status= "";
 res= [];
 
 function preload() {}
 
 function setup() {
     canvas=createCanvas(600,500);
     canvas.position(650, 450);

     video=createCapture(VIDEO);
     video.hide();
 }
 
 function start() {
    objectetector=ml5.objectDetector("cocossd", chocolate);
    document.getElementById("status").innerHTML="Status: Locating...";
    document.getElementById("number_ob").innerHTML="Your object: Searching for your desire";
    object_finder= document.getElementById("object_finder").value;
    }

 function chocolate() {
     console.log("Chocolate Delivery!");
     model_status= true;
 }   

 function gotResult(error, result) {
     if(error) {
         console.log(error);
     }
     
     if(result) {
         console.log(result);
         res= result;
     } 
 }

 function draw() {
      image(video, 0, 0, 600, 500);

      if(model_status != "") {
        objectetector.detect(video, gotResult)
        for(i=0; i<res.length; i++) {
            number_copy= floor(res[i].confidence*100);
            object_label= res[i].label;
            fill("#FF0000");
            textSize(20);
            noStroke();
            text(res[i].label + " " + number_copy + "%", res[i].x, res[i].y);
            noFill();
            stroke("orangered");
            strokeWeight(3);
            rect(res[i].x, res[i].y, res[i].width , res[i].height);

            if(res[i].label == object_finder) {
                document.getElementById("number_ob").innerHTML= object_finder + " is found!";
                document.getElementById("status").innerHTML= "Status: Requested object found";
            }
        }          
      }
 }