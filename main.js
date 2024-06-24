sound = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0
leftWristY = 0;

function preload() {

    sound = loudSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("green");

    if (scoreRightWrist > 0.2)
        {
            circle(rightWristX, rightWristY, 30);

            if (rightWristY > 0 && rightWristY <= 100) {
                document.getElementById("speed").innerHTML = "Speed = 0.5x";
                sound.rate(0.5);
            }
        
        
            else if (rightWristY > 100 && rightWristY <= 200) {
                document.getElementById("speed").innerHTML = "Speed = 1x";
                sound.rate(1);
            }
        
        
            else if (rightWristY > 200 && rightWristY <= 300) {
                document.getElementById("speed").innerHTML = "Speed = 1.5x";
                sound.rate(1.5);
            }
        
        
            else if (rightWristY > 300 && rightWristY <= 400) {
                document.getElementById("speed").innerHTML = "Speed = 2x";
                sound.rate(2);
            }
        
        
            else if (rightWristY > 400 && rightWristY <= 500) {
                document.getElementById("speed").innerHTML = "Speed = 2.5x";
                sound.rate(2.5);
            } 
        }

   


    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 30);
        nlx = Number(leftWristY);
        flx = floor(nlx);
        volume = flx / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        sound.setVolume(volume);
    }


}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}


function play() {
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}


function gotPoses(results) {
    if (results.length > 0) {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
}