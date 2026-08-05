//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");

recordButton.addEventListener('click', function() {
    console.log('audio kidmoood')
})

var statusText = document.getElementById("status-text");

var intervalId =  '';

var wavePlayer = document.querySelector('.wave-player-container');


var recordAudioPlay = document.querySelector('.wave-play');
var recordAudioPause = document.querySelector('.wave-pause');

var recordRecordAudio = document.querySelector('.wave-upload');


//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
pauseButton.addEventListener("click", pauseRecording);


// var timersCount = 0;
var pause = false; //is timer paused
var counter;

// Functionaliy for Adding wavesurfer after the audio stops recording
var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#bfc9d4',
    progressColor: '#00695c',
	height: 50,
    barHeight: 2,
	backend: 'MediaElement',
});

// Functionaliy for Showing the timer when audio is recording
function secondsToHms(d) {
	d = Number(d);

	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);

	return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}

// Functionaliy for Showing the timer when audio is recording
function countTimers() {
	// timersCount++;
  
	var count = 0;
	counter = setInterval(timer, 1000);
  
	function timer() {
		if (!pause) { //do something if not paused
			count = count + 1;	
			statusText.innerText = secondsToHms(count);
		} else {
			statusText.innerText = 'Recoding Paused';
		}
	}
  
}

// Functionaliy for Starting Audio Recording
function startRecording() {
	console.log("recordButton clicked");

	statusText.innerText = 'Initializing...';


	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/
    
    var constraints = { audio: true, video:false }

 	/*
    	Disable the record button until we get a success or fail from getUserMedia() 
	*/

	recordButton.disabled = true;
	stopButton.disabled = false;
	pauseButton.disabled = false

	/*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	
	
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
		

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device

		*/
		audioContext = new AudioContext();
		
		//update the format 
		
		/*  assign to gumStream for later use  */
		gumStream = stream;
		
		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);
		
		/* 
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
		rec = new Recorder(input,{numChannels:1})

		//start the recording process
		rec.record()
		
		countTimers();
		
	}).catch(function(err) {
	  	//enable the record button if getUserMedia() fails
    	recordButton.disabled = false;
    	stopButton.disabled = true;
    	pauseButton.disabled = true
	});
}

// Functionaliy for Pause Audio Recording
function pauseRecording(){
	console.log("pauseButton clicked rec.recording=",rec.recording );
	if (rec.recording){
		//pause
		rec.stop();
		pause = true;
		pauseButton.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>Resume';
	}else{
		//resume
		rec.record();
		pause = false;

		pauseButton.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> Pause';

	}
}


// Functionaliy for Stop Audio Recording
function stopRecording() {
	console.log("stopButton clicked");

	clearInterval(counter) 

	//disable the stop button, enable the record too allow for new recordings
	stopButton.disabled = true;
	recordButton.disabled = false;
	pauseButton.disabled = true;

	//reset button just in case the recording is stopped while paused
	pauseButton.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> Pause';
	
	//tell the recorder to stop the recording
	rec.stop();

	//stop microphone access
	gumStream.getAudioTracks()[0].stop();

	statusText.innerText = '';
	// document.getElementById("recordingsList").innerHTML = "";
	
	//create the wav blob and pass it on to createDownloadLink
	rec.exportWAV(createDownloadLink);
	// console.log(rec.exportWAV(createDownloadLink));
	// console.log(rec.exportWAV(blob));
	wavePlayer.classList.add('show');

}

function createDownloadLink(blob) {
	var url = URL.createObjectURL(blob);
	console.log(blob)
	console.log(url)
	wavesurfer.load(url);
}


recordAudioPlay.addEventListener('click', function() {
	wavesurfer.play();
	this.disabled = true;
	recordAudioPause.disabled = false;
	
})
recordAudioPause.addEventListener('click', function() {
	wavesurfer.pause();

	this.disabled = true;
	recordAudioPlay.disabled = false;
})

recordRecordAudio.addEventListener('click', function() {
	rec.exportWAV(addUploadAudio);
})



function addUploadAudio(blob) {
	var url = URL.createObjectURL(blob);

	var x = document.getElementById("trigger-incoming-voice");
	var option = document.createElement("option");
	
	option.text = `Audio ${blob.size}`;
	option.value = `audio-${blob.size}`;
	option.setAttribute('selected', true);
	x.add(option);
	Snackbar.show({text: 'Audio Added', textColor: '#060818', actionTextColor: '#060818', backgroundColor: '#02beaf'});
	

	wavesurfer.empty();
    wavePlayer.classList.remove('show')
}



wavesurfer.on('finish', function() {
    recordAudioPause.disabled = true;
    recordAudioPlay.disabled = false;
})





// ------Upload audio -> Play/Pause wavefrom---------
const uploadAudioPlay = document.querySelector('.wave-upload-input-play');
const uploadAudioPause = document.querySelector('.wave-upload-input-pause');
const uploadRecordAudio = document.querySelector('.wave-input-upload');

// WaveSurfer For Input Wave

var inputWave = WaveSurfer.create({
    container: '#inputWave',
    waveColor: '#bfc9d4',
    progressColor: '#00695c',
	height: 50,
    barHeight: 2
});

// Functionaliy for Audio Upload File input
document.querySelector('.audio-input').addEventListener('change', function() {

    var file = this.files[0];

    if (file) {
        var reader = new FileReader();
        
        reader.onload = function (evt) {
            // Create a Blob providing as first argument a typed array with the file buffer
            var blob = new window.Blob([new Uint8Array(evt.target.result)]);

            // Load the blob into Wavesurfer
            inputWave.loadBlob(blob);
            document.getElementById("inputWave").style.display = "block";
            uploadAudioPlay.style.display = "inline-block";
            uploadAudioPause.style.display = "inline-block";
            uploadRecordAudio.style.display = "inline-block";
        };

        reader.onerror = function (evt) {
            console.error("An error ocurred reading the file: ", evt);
        };

        // Read File as an ArrayBuffer
        reader.readAsArrayBuffer(file);
    }
    
})

// Functionaliy for Audio Play Button
uploadAudioPlay.addEventListener('click', function() {
    // alert('clicked before')
    inputWave.play();
    // alert('clicked after')
    this.disabled = true;
    uploadAudioPause.disabled = false;
})

// Functionaliy for Audio Play Button
uploadAudioPause.addEventListener('click', function() {
    inputWave.pause();
    this.disabled = true;
    uploadAudioPlay.disabled = false;
})

// Functionaliy for Resettings the Pause and Play button to disable once the audio is finished
inputWave.on('finish', function() {
    uploadAudioPause.disabled = true;
    uploadAudioPlay.disabled = false;
} )


uploadRecordAudio.addEventListener('click', function() {
	// rec.exportWAV(addUploadAudioInput);
    fileInput = document.querySelector('.audio-input').files[0];
    getFileName = fileInput.name;
    convertFileNameToLowerCase = getFileName.replace(/\s+/g, '-').toLowerCase()

    var x = document.getElementById("trigger-incoming-voice");
	var option = document.createElement("option");
	
	option.text = `${fileInput.name}`;
	option.value = `audio-${convertFileNameToLowerCase}`;
	option.setAttribute('selected', true);
	x.add(option);
	Snackbar.show({text: 'Audio Uploaded', textColor: '#060818', actionTextColor: '#060818', backgroundColor: '#02beaf'});

    inputWave.empty();
    document.getElementById("inputWave").style.display = "none";
    uploadAudioPlay.style.display = "none";
    uploadAudioPause.style.display = "none";
    uploadRecordAudio.style.display = "none";
    document.querySelector('label.custom-file-label').innerText = 'Choose File';

})