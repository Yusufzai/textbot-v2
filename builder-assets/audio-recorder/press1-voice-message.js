//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var press1_gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var press1_input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var press1_audioContext //audio context to help us record

var press1_recordButton = document.getElementById("press1-recordButton");
var press1_stopButton = document.getElementById("press1-stopButton");
var press1_pauseButton = document.getElementById("press1-pauseButton");


// press1_recordButton.addEventListener('click', function() {
//     console.log('kidmoood')
// })

var press1_statusText = document.getElementById("press1-status-text");

var press1_intervalId =  '';

var press1_wavePlayer = document.querySelector('.press1-wave-player-container');


var press1_recordAudioPlay = document.querySelector('.press1-wave-play');
var press1_recordAudioPause = document.querySelector('.press1-wave-pause');

var press1_recordRecordAudio = document.querySelector('.press1-wave-upload');


//add events to those 2 buttons
press1_recordButton.addEventListener("click", press1_startRecording);
press1_stopButton.addEventListener("click", press1_stopRecording);
press1_pauseButton.addEventListener("click", press1_pauseRecording);


// var timersCount = 0;
var press1_pause = false; //is timer paused
var press1_counter;

// Functionaliy for Adding wavesurfer after the audio stops recording
var press1_wavesurfer = WaveSurfer.create({
    container: '#press1-waveform',
    waveColor: '#bfc9d4',
    progressColor: '#00695c',
	height: 50,
    barHeight: 2,
	backend: 'MediaElement',
});

// Functionaliy for Showing the timer when audio is recording
function press1_secondsToHms(d) {
	d = Number(d);

	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);

	return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}

// Functionaliy for Showing the timer when audio is recording
function press1_countTimers() {
	// timersCount++;
  
	var press1_count = 0;
	press1_counter = setInterval(press1_timer, 1000);
  
	function press1_timer() {
		if (!press1_pause) { //do something if not paused
			press1_ = press1_count + 1;	
			press1_statusText.innerText = press1_secondsToHms(press1_count);
		} else {
			press1_statusText.innerText = 'Recoding Paused';
		}
	}
  
}

// Functionaliy for Starting Audio Recording
function press1_startRecording() {
	// console.log("recordButton clicked");

	press1_statusText.innerText = 'Initializing...';


	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/
    
    var press1_constraints = { audio: true, video:false }

 	/*
    	Disable the record button until we get a success or fail from getUserMedia() 
	*/

	press1_recordButton.disabled = true;
	press1_stopButton.disabled = false;
	press1_pauseButton.disabled = false

	/*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	
	
	navigator.mediaDevices.getUserMedia(press1_constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
		

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device

		*/
		press1_audioContext = new AudioContext();
		
		//update the format 
		
		/*  assign to gumStream for later use  */
		press1_gumStream = stream;
		
		/* use the stream */
		press1_input = press1_audioContext.createMediaStreamSource(stream);
		
		/* 
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
		rec = new Recorder(press1_input,{numChannels:1})

		//start the recording process
		rec.record()
		
		press1_countTimers();
		
	}).catch(function(err) {
	  	//enable the record button if getUserMedia() fails
          press1_recordButton.disabled = false;
    	press1_stopButton.disabled = true;
    	press1_pauseButton.disabled = true
	});
}

// Functionaliy for Pause Audio Recording
function press1_pauseRecording(){
	// console.log("press1_pauseButton clicked rec.recording=",rec.recording );
	if (rec.recording){
		//pause
		rec.stop();
		press1_pause = true;
		press1_pauseButton.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>Resume';
	}else{
		//resume
		rec.record();
		press1_pause = false;

		press1_pauseButton.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> Pause';

	}
}


// Functionaliy for Stop Audio Recording
function press1_stopRecording() {
	// console.log("press1_stopButton clicked");

	clearInterval(press1_counter) 

	//disable the stop button, enable the record too allow for new recordings
	press1_stopButton.disabled = true;
	press1_recordButton.disabled = false;
	press1_pauseButton.disabled = true;

	//reset button just in case the recording is stopped while paused
	press1_pauseButton.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> Pause';
	
	//tell the recorder to stop the recording
	rec.stop();

	//stop microphone access
	press1_gumStream.getAudioTracks()[0].stop();

	press1_statusText.innerText = '';
	// document.getElementById("recordingsList").innerHTML = "";
	
	//create the wav blob and pass it on to createDownloadLink
	rec.exportWAV(press1_createDownloadLink);
	// console.log(rec.exportWAV(press1_createDownloadLink));
	// console.log(rec.exportWAV(blob));
	press1_wavePlayer.classList.add('show');

}

function press1_createDownloadLink(blob) {
	var url = URL.createObjectURL(blob);
	// console.log(blob)
	// console.log(url)
	press1_wavesurfer.load(url);
}


press1_recordAudioPlay.addEventListener('click', function() {
	press1_wavesurfer.play();
	this.disabled = true;
	press1_recordAudioPause.disabled = false;
	
})
press1_recordAudioPause.addEventListener('click', function() {
	press1_wavesurfer.pause();

	this.disabled = true;
	press1_recordAudioPlay.disabled = false;
})

press1_recordRecordAudio.addEventListener('click', function() {
	rec.exportWAV(press1_addUploadAudio);
})



function press1_addUploadAudio(blob) {
	// var url = URL.createObjectURL(blob);

	var x = document.getElementById("trigger-press1-voice");
	var option = document.createElement("option");
	
	option.text = `Audio ${blob.size}`;
	option.value = `audio-${blob.size}`;
	option.setAttribute('selected', true);
	x.add(option);
	Snackbar.show({text: 'Audio Added', textColor: '#060818', actionTextColor: '#060818', backgroundColor: '#02beaf'});
	

	press1_wavesurfer.empty();
    press1_wavePlayer.classList.remove('show')
}



press1_wavesurfer.on('finish', function() {
    press1_recordAudioPause.disabled = true;
    press1_recordAudioPlay.disabled = false;
})






// ------Upload audio -> Play/Pause wavefrom---------
const press1_uploadAudioPlay = document.querySelector('.press1-wave-upload-input-play');
const press1_uploadAudioPause = document.querySelector('.press1-wave-upload-input-pause');
const press1_uploadRecordAudio = document.querySelector('.press1-wave-input-upload');

// WaveSurfer For Input Wave

var press1_inputWave = WaveSurfer.create({
    container: '#press1_inputWave',
    waveColor: '#bfc9d4',
    progressColor: '#00695c',
	height: 50,
    barHeight: 2
});

// Functionaliy for Audio Upload File input
document.querySelector('.press1_audio-input').addEventListener('change', function() {

    var file = this.files[0];

    if (file) {
        var reader = new FileReader();
        
        reader.onload = function (evt) {
            // Create a Blob providing as first argument a typed array with the file buffer
            var blob = new window.Blob([new Uint8Array(evt.target.result)]);

            // Load the blob into Wavesurfer
            press1_inputWave.loadBlob(blob);
            document.getElementById("press1_inputWave").style.display = "block";
            press1_uploadAudioPlay.style.display = "inline-block";
            press1_uploadAudioPause.style.display = "inline-block";
            press1_uploadRecordAudio.style.display = "inline-block";
        };

        reader.onerror = function (evt) {
            console.error("An error ocurred reading the file: ", evt);
        };

        // Read File as an ArrayBuffer
        reader.readAsArrayBuffer(file);
    }
    
})

// Functionaliy for Audio Play Button
press1_uploadAudioPlay.addEventListener('click', function() {
    // alert('clicked before')
    press1_inputWave.play();
    // alert('clicked after')
    this.disabled = true;
    press1_uploadAudioPause.disabled = false;
})

// Functionaliy for Audio Play Button
press1_uploadAudioPause.addEventListener('click', function() {
    press1_inputWave.pause();
    this.disabled = true;
    press1_uploadAudioPlay.disabled = false;
})

// Functionaliy for Resettings the Pause and Play button to disable once the audio is finished
press1_inputWave.on('finish', function() {
    press1_uploadAudioPause.disabled = true;
    press1_uploadAudioPlay.disabled = false;
})

press1_uploadRecordAudio.addEventListener('click', function() {
	// rec.exportWAV(addUploadAudioInput);
    fileInput = document.querySelector('.press1_audio-input').files[0];
    getFileName = fileInput.name;
    convertFileNameToLowerCase = getFileName.replace(/\s+/g, '-').toLowerCase()

    var x = document.getElementById("trigger-press1-voice");
	var option = document.createElement("option");
	
	option.text = `${fileInput.name}`;
	option.value = `audio-${convertFileNameToLowerCase}`;
	option.setAttribute('selected', true);
	x.add(option);
	Snackbar.show({text: 'Audio Uploaded', textColor: '#060818', actionTextColor: '#060818', backgroundColor: '#02beaf'});

    press1_inputWave.empty();
    document.getElementById("press1_inputWave").style.display = "none";
    press1_uploadAudioPlay.style.display = "none";
    press1_uploadAudioPause.style.display = "none";
    press1_uploadRecordAudio.style.display = "none";
    document.querySelector('label.press1_custom-file').innerText = 'Choose File';
})