var songs = ['Ambush.mp3', 'Black Bird.mp3', 'Breakdown.mp3', 'Iron Bacon.mp3']
var images = ['musiclogo.jpeg', 'git.png', 'linkedin.png', 'git.png']

var songTitle = document.getElementById('songTitle');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('volumeSlider');
var nextSongTitle = document.getElementById('nextSongTitle');
// var loadMusic = document.getElementById('loadMusic');

var song = new Audio();
var img = new Image();
var currentSong = 0;


// loadMusic.onclick = loadSong;


function loadMusic(){
	loadSong();
}

function loadSong () {
	song.src = "songs/" + songs[currentSong];
	img.src ="images/" + images[currentSong];
	songTitle.textContent = (currentSong + 1) + ". " + songs[currentSong];
	nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[currentSong + 1 % songs.length];
	// nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[(currentSong > 3) ? 0 % songs.end : 0];
	song.volume = volumeSlider.value;
	song.pause();
	
	setTimeout(showDuration, 1000);
}

setInterval(updateSongSlider, 1000)


// added function below

// function nextSong(){
// 	if(nextSongTitle){
// 		"<b>Next Song: </b>" + songs[currentSong + 1 % songs.length];
// 	// }else{
// 		"<b>Next Song: </b>" + (currentSong > 3) ? 0 % songs.length : currentSong;
// 	}
// }

function updateSongSlider(){
	var c = Math.round(song.currentTime);
	songSlider.value = c;
	currentTime.textContent = changeDigits(c);
	if(song.ended){
		next();
	}
}

function changeDigits(secs){
	var min = Math.floor(secs/60);
	var sec = secs % 60;
	min = (min<10) ? "0" + min : min;
	sec = (sec<10) ? "0" + sec : sec;
	return (min + ":" + sec);
}

function showDuration(){
	var d = Math.floor(song.duration);
	songSlider.setAttribute("max", d);
	duration.textContent = changeDigits(d);
}

function playOrPauseSong(img){
	if(song.paused){
		song.play();
		img.src = "images/003-pause.png";
	}else{
		song.pause();
		img.src = "images/004-play-button.png";
	}
}

function next(){
	currentSong = currentSong + 1 % songs.length;
	currentSong = (currentSong > 3) ? 0 % songs.length : currentSong;
	loadSong();

}

function previous(){
	currentSong = currentSong - 1;
	currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
	loadSong();

}


function seekSong(){
	song.currentTime = songSlider.value;
	currentTime.textContent = changeDigits(song.currentTime);
}

function adjustVolume(){
	song.volume = volumeSlider.value;
}

