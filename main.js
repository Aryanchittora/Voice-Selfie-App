var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function(event) {
    console.log(event);

    var content = event.results[0][0].transcript;
    console.log(content);

    document.getElementById("textbox").innerHTML = content;
    speak();
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "Taking Your Selfie In 3 Seconds";
    var utter = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter);

    if (speak_data == "take my selfie") {
        Webcam.attach(camera);
    }  

    setTimeout(function(){
        snapshot();
        save();
    }, 3000);
}

Webcam.set({
    width : 320,
    height : 250,
    image_format : 'png',
    png_quality : 100
});
camera = document.getElementById("camera");

function snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'">';
    });
}

function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src ;
    link.href = image;
    link.click();
}