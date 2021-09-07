// https://teachablemachine.withgoogle.com/models/Npmgxa3lx/
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    });

}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Npmgxa3lx/model.json", modelLoaded);

function modelLoaded(){
    console.log('Model Loaded');
}

function speak(prediction_1, prediction_2){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first predicted emotion is" + prediction_1;
    speak_data_2 = "The second predicted emotion is" + prediction_2;
    utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if(error){
        console.error(error);
    } 
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label+"("+results[0].confidence+")";
        document.getElementById("result_emotion_name2").innerHTML = results[1].label+"("+results[1].confidence+")";
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak(prediction_1, prediction_2);
        if(results[0].label == "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128513;";
        }
        if(results[0].label == "Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128557;";
        }
        if(results[0].label == "Angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }
        if(results[1].label == "Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128515;";
        }
        if(results[1].label == "Sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128542;";
        }
        if(results[1].label == "Angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128520;";
        }
    }
}