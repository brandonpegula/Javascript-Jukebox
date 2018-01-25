// var image = document.getElementById('image')
// image.addEventListener('click', function(){
// 	image.style.backgroundImage = "url('images/004-play-button.png')"
// })

// image.addEventListener('click', function(){
// 	image.style.backgroundImage = "url('images/003-pause.png')"
// })


var songs = ['Ambush.mp3', 'Black Bird.mp3', 'Breakdown.mp3', 'Iron Bacon.mp3']

var songTitle = document.getElementById('songTitle');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('volumeSlider');
var nextSongTitle = document.getElementById('nextSongTitle');

var song = new Audio();
var img = new Image();



img.src = 'images/001-next.png'
var currentSong = 0;

window.onload = loadSong;

function loadSong () {
	song.src = "songs/" + songs[currentSong];
	songTitle.textContent = (currentSong + 1) + ". " + songs[currentSong]
	nextSongTitle.innnerHTML = "<b>Next Song: </b>" + songs[currentSong + 1 % songs.length];
	song.volume = volumeSlider.value;
	song.play();
	setTimeout(showDuration, 1000);
}

setInterval(updateSongSlider, 1000)

function updateSongSlider(){
	var c = Math.round(song.currentTime);
	songSlider.value = c;
	currentTime.textContent = changeDigits(c);
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
	loadSong();
}

function previous(){
	currentSong = currentSong - 1;
	currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
	loadSong();
}