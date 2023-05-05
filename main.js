PeterSong="";
HarryPotterSong="";
leftWristX ="";
leftWristY ="";
rightWristX ="";
rightWristY ="";
scoreleftWrist ="";
scoreRightWrist ="";
function preload()
{
    PeterSong = loadSound("music.mp3");
    HarryPotterSong =loadSound("music2.mp3");
    
} 
function setup(){
    canvas = createCanvas(600,530);
    canvas.position(600,250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}
function modelLoaded(){
    console.log('PoseNet is Initialized');
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
         
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);


        leftWristx = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}



function draw(){
    image(video,0,0,600,530);
    fill("#00ff00");
    stroke("#ff0000");

    song_name = PeterSong.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        HarryPotterSong.stop();
        if(song_name == false){
            PeterSong.play();
        }
        else{
            console.log("Song Name: PeterSong ");
            document.getElementById("song_id").innerHTML = "Song Name: Peter Song";
        }
    }
    if(scorerightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        PeterSong.stop();
        if(HarryPotterSong == false){
            HarryPotterSong.play();
        }
        else{
            console.log("Song Name: Harry Potter Song");
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Song";
        }
}

}
