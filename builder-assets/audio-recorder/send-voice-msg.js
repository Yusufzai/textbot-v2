//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var sendMsg_gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var sendMsg_input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var sendMsg_audioContext //audio context to help us record

var sendMsg_recordButton = document.getElementById("sendMsg-recordButton");
var sendMsg_stopButton = document.getElementById("sendMsg-stopButton");
var sendMsg_pauseButton = document.getElementById("sendMsg-pauseButton");


// sendMsg_recordButton.addEventListener('click', function() {
//     console.log('kidmoood')
// })

var sendMsg_statusText = document.getElementById("sendMsg-status-text");

var sendMsg_intervalId =  '';

var sendMsg_wavePlayer = document.querySelector('.sendMsg-wave-player-container');


var sendMsg_recordAudioPlay = document.querySelector('.sendMsg-wave-play');
var sendMsg_recordAudioPause = document.querySelector('.sendMsg-wave-pause');

var sendMsg_recordRecordAudio = document.querySelector('.sendMsg-wave-upload');


//add events to those 2 buttons
sendMsg_recordButton.addEventListener("click", sendMsg_startRecording);
sendMsg_stopButton.addEventListener("click", sendMsg_stopRecording);
sendMsg_pauseButton.addEventListener("click", sendMsg_pauseRecording);


// var timersCount = 0;
var sendMsg_pause = false; //is timer paused
var sendMsg_counter;

// Functionaliy for Adding wavesurfer after the audio stops recording
var sendMsg_wavesurfer = WaveSurfer.create({
    container: '#sendMsg-waveform',
    waveColor: '#bfc9d4',
    progressColor: '#00695c',
	height: 50,
    barHeight: 2,
	backend: 'MediaElement',
});

// Functionaliy for Showing the timer when audio is recording
function sendMsg_secondsToHms(d) {
	d = Number(d);

	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);

	return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}

// Functionaliy for Showing the timer when audio is recording
function sendMsg_countTimers() {
	// timersCount++;
  
	var sendMsg_count = 0;
	sendMsg_counter = setInterval(sendMsg_timer, 1000);
  
	function sendMsg_timer() {
		if (!sendMsg_pause) { //do something if not paused
			sendMsg_ = sendMsg_count + 1;	
			sendMsg_statusText.innerText = sendMsg_secondsToHms(sendMsg_count);
		} else {
			sendMsg_statusText.innerText = 'Recoding Paused';
		}
	}
  
}

// Functionaliy for Starting Audio Recording
function sendMsg_startRecording() {
	// console.log("recordButton clicked");

	sendMsg_statusText.innerText = 'Initializing...';


	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/
    
    var sendMsg_constraints = { audio: true, video:false }

 	/*
    	Disable the record button until we get a success or fail from getUserMedia() 
	*/

	sendMsg_recordButton.disabled = true;
	sendMsg_stopButton.disabled = false;
	sendMsg_pauseButton.disabled = false

	/*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	
	
	navigator.mediaDevices.getUserMedia(sendMsg_constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
		

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device

		*/
		sendMsg_audioContext = new AudioContext();
		
		//update the format 
		
		/*  assign to gumStream for later use  */
		sendMsg_gumStream = stream;
		
		/* use the stream */
		sendMsg_input = sendMsg_audioContext.createMediaStreamSource(stream);
		
		/* 
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
		rec = new Recorder(sendMsg_input,{numChannels:1})

		//start the recording process
		rec.record()
		
		sendMsg_countTimers();
		
	}).catch(function(err) {
	  	//enable the record button if getUserMedia() fails
          sendMsg_recordButton.disabled = false;
    	sendMsg_stopButton.disabled = true;
    	sendMsg_pauseButton.disabled = true
	});
}

// Functionaliy for Pause Audio Recording
function sendMsg_pauseRecording(){
	// console.log("sendMsg_pauseButton clicked rec.recording=",rec.recording );
	if (rec.recording){
		//pause
		rec.stop();
		sendMsg_pause = true;
		sendMsg_pauseButton.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>Resume';
	}else{
		//resume
		rec.record();
		sendMsg_pause = false;

		sendMsg_pauseButton.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> Pause';

	}
}


// Functionaliy for Stop Audio Recording
function sendMsg_stopRecording() {
	// console.log("sendMsg_stopButton clicked");

	clearInterval(sendMsg_counter) 

	//disable the stop button, enable the record too allow for new recordings
	sendMsg_stopButton.disabled = true;
	sendMsg_recordButton.disabled = false;
	sendMsg_pauseButton.disabled = true;

	//reset button just in case the recording is stopped while paused
	sendMsg_pauseButton.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> Pause';
	
	//tell the recorder to stop the recording
	rec.stop();

	//stop microphone access
	sendMsg_gumStream.getAudioTracks()[0].stop();

	sendMsg_statusText.innerText = '';
	// document.getElementById("recordingsList").innerHTML = "";
	
	//create the wav blob and pass it on to createDownloadLink
	rec.exportWAV(sendMsg_createDownloadLink);
	// console.log(rec.exportWAV(sendMsg_createDownloadLink));
	// console.log(rec.exportWAV(blob));
	sendMsg_wavePlayer.classList.add('show');

}

function sendMsg_createDownloadLink(blob) {
	var url = URL.createObjectURL(blob);
	// console.log(blob)
	// console.log(url)
	sendMsg_wavesurfer.load(url);
}


sendMsg_recordAudioPlay.addEventListener('click', function() {
	sendMsg_wavesurfer.play();
	this.disabled = true;
	sendMsg_recordAudioPause.disabled = false;
	
})
sendMsg_recordAudioPause.addEventListener('click', function() {
	sendMsg_wavesurfer.pause();

	this.disabled = true;
	sendMsg_recordAudioPlay.disabled = false;
})

sendMsg_recordRecordAudio.addEventListener('click', function() {
	rec.exportWAV(sendMsg_addUploadAudio);
})



function sendMsg_addUploadAudio(blob) {
	// var url = URL.createObjectURL(blob);

	var getRecorderAudioElement = document.querySelector(".setRecordedAudio");
	// var option = document.createElement("option");
	
	// option.text = `Audio ${blob.size}`;
	// option.value = `audio-${blob.size}`;
	// option.setAttribute('selected', true);
	// x.add(option);

    getRecorderAudioElement.value = `audio-${blob.size}`;
 
	Snackbar.show({text: 'Audio Added', textColor: '#060818', actionTextColor: '#060818', backgroundColor: '#02beaf'});

	sendMsg_wavesurfer.empty();
    sendMsg_wavePlayer.classList.remove('show')
	document.querySelectorAll(".setInputName")[0].classList.add('show');
}



sendMsg_wavesurfer.on('finish', function() {
    sendMsg_recordAudioPause.disabled = true;
    sendMsg_recordAudioPlay.disabled = false;
})






// ------Upload audio -> Play/Pause wavefrom---------
const sendMsg_uploadAudioPlay = document.querySelector('.sendMsg-wave-upload-input-play');
const sendMsg_uploadAudioPause = document.querySelector('.sendMsg-wave-upload-input-pause');
const sendMsg_uploadRecordAudio = document.querySelector('.sendMsg-wave-input-upload');

// WaveSurfer For Input Wave

var sendMsg_inputWave = WaveSurfer.create({
    container: '#sendMsg_inputWave',
    waveColor: '#bfc9d4',
    progressColor: '#00695c',
	height: 50,
    barHeight: 2
});

// Functionaliy for Audio Upload File input
document.querySelector('.sendMsg_audio-input').addEventListener('change', function() {

    var file = this.files[0];

    if (file) {
        var reader = new FileReader();
        
        reader.onload = function (evt) {
            // Create a Blob providing as first argument a typed array with the file buffer
            var blob = new window.Blob([new Uint8Array(evt.target.result)]);

            // Load the blob into Wavesurfer
            sendMsg_inputWave.loadBlob(blob);
            document.getElementById("sendMsg_inputWave").style.display = "block";
            sendMsg_uploadAudioPlay.style.display = "inline-block";
            sendMsg_uploadAudioPause.style.display = "inline-block";
            sendMsg_uploadRecordAudio.style.display = "inline-block";
        };

        reader.onerror = function (evt) {
            console.error("An error ocurred reading the file: ", evt);
        };

        // Read File as an ArrayBuffer
        reader.readAsArrayBuffer(file);
    }
    
})

// Functionaliy for Audio Play Button
sendMsg_uploadAudioPlay.addEventListener('click', function() {
    // alert('clicked before')
    sendMsg_inputWave.play();
    // alert('clicked after')
    this.disabled = true;
    sendMsg_uploadAudioPause.disabled = false;
})

// Functionaliy for Audio Play Button
sendMsg_uploadAudioPause.addEventListener('click', function() {
    sendMsg_inputWave.pause();
    this.disabled = true;
    sendMsg_uploadAudioPlay.disabled = false;
})

// Functionaliy for Resettings the Pause and Play button to disable once the audio is finished
sendMsg_inputWave.on('finish', function() {
    sendMsg_uploadAudioPause.disabled = true;
    sendMsg_uploadAudioPlay.disabled = false;
})

sendMsg_uploadRecordAudio.addEventListener('click', function() {
	// rec.exportWAV(addUploadAudioInput);
    fileInput = document.querySelector('.sendMsg_audio-input').files[0];
    getFileName = fileInput.name;
    convertFileNameToLowerCase = getFileName.replace(/\s+/g, '-').toLowerCase()

    // var x = document.getElementById("trigger-sendMsg-voice");
	// var option = document.createElement("option");
	
	// option.text = `${fileInput.name}`;
	// option.value = `audio-${convertFileNameToLowerCase}`;
	// option.setAttribute('selected', true);
	// x.add(option);

    var getUploadedAudioElement = document.querySelector(".setuploadedAudio");
	// var option = document.createElement("option");
	
	// option.text = `Audio ${blob.size}`;
	// option.value = `audio-${blob.size}`;
	// option.setAttribute('selected', true);
	// x.add(option);

    getUploadedAudioElement.value = `audio-${convertFileNameToLowerCase}`;
    

	Snackbar.show({text: 'Audio Uploaded', textColor: '#060818', actionTextColor: '#060818', backgroundColor: '#02beaf'});

    sendMsg_inputWave.empty();
	
    
	document.querySelectorAll(".setInputName")[1].classList.add('show');
    document.getElementById("sendMsg_inputWave").style.display = "none";
    sendMsg_uploadAudioPlay.style.display = "none";
    sendMsg_uploadAudioPause.style.display = "none";
    sendMsg_uploadRecordAudio.style.display = "none";
    document.querySelector('label.sendMsg_custom-file').innerText = 'Choose File';
})