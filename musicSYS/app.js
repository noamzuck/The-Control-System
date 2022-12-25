//browseResult
async function browseResult(){
    let fileselector = document.getElementById('fileselector');
    let pathList = {};
    for(let key in fileselector.files){
        pathList[key] = fileselector.files[key].webkitRelativePath
    }
    let res = {};
    for(let key in pathList){
        if(pathList[key] != undefined){
            let halthpath = pathList[key].replace('songs/', '').split('/');
            console.log(key)
            if(res[halthpath[0]] == undefined) res[halthpath[0]] = [];
            res[halthpath[0]].push(pathList[key]);
        }
    }
    setCookie('dir-music', JSON.stringify(res), 30);
    document.getElementById('hideBtnRe').style.display = 'none';
    await getSongs()
    alert('הקבצים נטענו בהצלחה')
}

//setCookie
function setCookie(cname,cvalue,exdays) {
    /*const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";*/
    localStorage.setItem(cname, cvalue);
}

//getCookie
function getCookie(cname) {
    /*let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;*/
    return localStorage.getItem(cname);
}

async function getSongs(){
    musics = getCookie('dir-music');
    if(musics != null){
        document.getElementById('card').innerHTML = 'טוען...';
        await new Promise(r => setTimeout(r, 2000));
        document.getElementById('card').innerHTML = '';
        
        for(var i = 1; i < 21; i++){
            document.getElementById('loadingDiv').style.scale = (100-i*5) + '%';
            await new Promise(r => setTimeout(r, 0.25));
        }
    
        document.getElementById('loadingDiv').style.display = "none";
        document.getElementById('canvas').style.display = "flex";
        document.getElementById('mainDiv').style.display = "flex";
        document.getElementById('botBar').style.display = "flex";

        if(musics){
            musics = JSON.parse(musics);
            let card = document.getElementById('card');
            let tr, tr2, title, td, td2, column, r, row, btn, name;
            let count = 0;
            let ch = 1;
            for(var key in musics){
                if(count % 2 == 0){
                    tr = document.createElement('tr');
                    card.appendChild(tr);
                    
                    tr2 = document.createElement('tr');
                    card.appendChild(tr2);
                    tr2.style.height = '15px';
                }
                if(ch == count){
                    ch += 3;
                    td = document.createElement('td');
                    tr.appendChild(td);
                    td.style.width = '2%';
                }

                count++;
                
                td = document.createElement('td');
                tr.appendChild(td);
                td.classList.add('item');
                    
                column = document.createElement('div');
                td.appendChild(column);

                td2 = document.createElement('tr');
                column.appendChild(td2);
                td2.classList.add('column');

                title = document.createElement('p');
                td2.appendChild(title);
                title.classList.add('dirName');
                title.innerHTML = key;
                
                for(let item of musics[key]){
                    r = document.createElement('tr');
                    column.appendChild(r);
                    r.classList.add('column');

                    row = document.createElement('div');
                    r.appendChild(row);
                    row.classList.add('row');
                    
                    btn = document.createElement('button');
                    row.appendChild(btn);
                    btn.classList.add('playButton');
                    btn.innerHTML = 'בחירה';
                    btn.id = key;
                    let fun = function(it) {
                        return function() {
                            if(song != it){
                                song = it;
                                stopAudio();
                                let music = document.getElementById('player');
                                music.src = '../Your Files/' + it;
                                time = 0;
                            }
                        }
                    }
                    btn.onclick = fun(item);
                    
                    name = document.createElement('p');
                    row.appendChild(name);
                    name.classList.add('songName');
                    
                    let halthpath = item.replace('songs/', '').replace('.mp3', '').split('/');
                    name.innerHTML = halthpath[halthpath.length-1];
                }
            }
        }
        
        await new Promise(r => setTimeout(r, 2000));
        document.getElementById('titleDiv2').style.overflowX = 'hidden';
        document.getElementById('titleDiv2').style.overflowY = 'scroll';
    } else {
        await new Promise(r => setTimeout(r, 2000));
        document.getElementById('card').innerHTML = '';
        
        for(var i = 1; i < 21; i++){
            document.getElementById('loadingDiv').style.scale = (100-i*5) + '%';
            await new Promise(r => setTimeout(r, 0.25));
        }

        document.getElementById('hideBtnRe').style.display = 'flex';
        document.getElementById('loadingDiv').style.display = "none";
    }
}

function fullScreen(){
    document.documentElement.requestFullscreen();
}

function info(){
    document.getElementById('cont-alert').style.display = 'flex';
    document.getElementById('cont-alert').classList.remove('fadeOut');
}

async function hideInfo(){
    document.getElementById('cont-alert').classList.add('fadeOut');
    await new Promise(r => setTimeout(r, 250));
    document.getElementById('cont-alert').style.display = 'none';
}

function help(){
    document.getElementById('cont-alert-help').style.display = 'flex';
    document.getElementById('cont-alert-help').classList.remove('fadeOut');
}

async function hideHelp(){
    document.getElementById('cont-alert-help').classList.add('fadeOut');
    await new Promise(r => setTimeout(r, 250));
    document.getElementById('cont-alert-help').style.display = 'none';
}

function refresh(){
    location.reload();
}

function getInfoBaoutAudio(){
    let audio = document.getElementById('player');

    let c = audio.currentTime;
    let s = Math.floor(c % 60);
    let m = Math.floor(c / 60);

    if(s < 10) s = '0' + s;
    if(m < 10) m = '0' + m;

    let all = audio.duration;
    let sA = Math.floor(all % 60);
    let mA = Math.floor(all / 60);

    if(sA < 10) sA = '0' + sA;
    if(mA < 10) mA = '0' + mA;

    document.getElementById('currentTime').innerHTML = m + ':' + s;
    document.getElementById('allTime').innerHTML = mA + ':' + sA;

    document.getElementById('timeSlider').value = c / all * 100;

    time++;
}

function playAudio(){
    document.getElementById('player').play();
    document.getElementById('playBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'block';
}

function stopAudio(){
    document.getElementById('player').pause();
    document.getElementById('stopBtn').style.display = 'none';
    document.getElementById('playBtn').style.display = 'block';
}

async function setVol(vol){
    let t = scale;
    if((t * 100) > vol){
        for(let i = 0; i < (t * 100) - vol + 1; i++){
            scale = ((t * 100) - i) * 0.01;
            scale = parseFloat(scale.toFixed(2));
            document.getElementById('volumeSlider').value = parseInt(scale * 100);
            document.getElementById('volume').innerHTML = parseInt(scale * 100) + '%';
            document.getElementById('player').volume = scale;
            await new Promise(r => setTimeout(r, 25));
        }
    } else if((t * 100) < vol){
        for(let i = 0; i < vol - (t * 100) + 1; i++){
            scale = ((t * 100) + i) * 0.01;
            scale = parseFloat(scale.toFixed(2));
            document.getElementById('volumeSlider').value = parseInt(scale * 100);
            document.getElementById('volume').innerHTML = parseInt(scale * 100) + '%';
            document.getElementById('player').volume = scale;
            await new Promise(r => setTimeout(r, 25));
        }
    }
}

function visualOn(){
    visual = true;
    context = new AudioContext();
    src = context.createMediaElementSource(document.getElementById('player'));
    analyser = context.createAnalyser();
}

//start
var musics, update;
var song;
var visual = false;
var context, src, analyser;
getSongs();

var scale = 1;
var time = 0;

document.getElementById('timeSlider').addEventListener("input", function(){
    document.getElementById('player').currentTime = this.value / 100 * document.getElementById('player').duration;
    time = this.value / 100 * document.getElementById('player').duration;
});

document.getElementById('timeSlider').addEventListener("wheel",function(e){
    if(e.wheelDelta > 0 && (time + 1) < document.getElementById('player').duration) time++;
    else if(e.wheelDelta > 0 && (time + 1) >= 1) time = document.getElementById('player').duration;
    else if(e.wheelDelta < 0 && (time - 1) > 0) time--;
    else if(e.wheelDelta < 0 && (time - 1) <= 0) time = 0;
  
    document.getElementById('timeSlider').value = time / document.getElementById('player').duration * 100;
    document.getElementById('player').currentTime = time;
    
    e.preventDefault();
});

document.getElementById('volumeSlider').addEventListener("input", function(){
    document.getElementById('volume').innerHTML = this.value + '%';
    document.getElementById('player').volume = this.value * 0.01;
    scale = this.value * 0.01;
    scale = parseFloat(scale.toFixed(2));
});

document.getElementById('volumeSlider').addEventListener("wheel",function(e){
    if(e.wheelDelta > 0 && (scale + 0.01) < 1) scale += 0.01;
    else if(e.wheelDelta > 0 && (scale + 0.01) >= 1) scale = 1;
    else if((scale - 0.01) > 0 && e.wheelDelta < 0) scale -= 0.01;
    else if(e.wheelDelta < 0 && (scale - 0.01) <= 0) scale = 0;
    scale = parseFloat(scale.toFixed(2));
  
    document.getElementById('volumeSlider').value = scale * 100;
    document.getElementById('volume').innerHTML = this.value + '%';
    document.getElementById('player').volume = this.value * 0.01;
    
    e.preventDefault();
});

document.addEventListener("keydown", function(e){
    if(e.keyCode == 107 || e.keyCode == 38) {
        if((scale + 0.01) <= 1) scale += 0.01;
        else if((scale + 0.01) > 1) scale = 1;
        scale = parseFloat(scale.toFixed(2));
        
        document.getElementById('volumeSlider').value = parseInt(scale * 100);
        document.getElementById('volume').innerHTML = parseInt(scale * 100) + '%';
        document.getElementById('player').volume = scale;
    } else if(e.keyCode == 109 || e.keyCode == 40) {
        if((scale - 0.01) >= 0) scale -= 0.01;
        else if((scale - 0.01) < 0) scale = 0;
        scale = parseFloat(scale.toFixed(2));

        document.getElementById('volumeSlider').value = parseInt(scale * 100);
        document.getElementById('volume').innerHTML = parseInt(scale * 100) + '%';
        document.getElementById('player').volume = scale;
    } else 
    
    if(e.keyCode == 37) {
        if((time + 1) <= document.getElementById('player').duration) time++;
        else if((time + 1) > document.getElementById('player').duration) time = document.getElementById('player').duration;
        
        document.getElementById('timeSlider').value = time / document.getElementById('player').duration * 100;
        document.getElementById('player').currentTime = time;
    } else if(e.keyCode == 39) {
        if((time - 1) >= 0) time--;
        else if((time - 1) < 0) time = 0;
        
        document.getElementById('timeSlider').value = time / document.getElementById('player').duration * 100;
        document.getElementById('player').currentTime = time;
    } else

    if(e.keyCode == 32){
        if(document.getElementById('player').paused) playAudio();
        else stopAudio();
    } else

    if(e.keyCode == 96 || e.keyCode == 48) setVol(0);
    else if(e.keyCode == 97 || e.keyCode == 49) setVol(10);
    else if(e.keyCode == 98 || e.keyCode == 50) setVol(20);
    else if(e.keyCode == 99 || e.keyCode == 51) setVol(30);
    else if(e.keyCode == 100 || e.keyCode == 52) setVol(40);
    else if(e.keyCode == 101 || e.keyCode == 53) setVol(50);
    else if(e.keyCode == 102 || e.keyCode == 54) setVol(60);
    else if(e.keyCode == 103 || e.keyCode == 55) setVol(70);
    else if(e.keyCode == 104 || e.keyCode == 56) setVol(80);
    else if(e.keyCode == 105 || e.keyCode == 57) setVol(90);
    else if(e.keyCode == 110 || e.keyCode == 189) setVol(100);
}, false);

document.getElementById('player').addEventListener('ended', () => {
    clearInterval(update);
    document.getElementById('stopBtn').style.display = 'none';
    document.getElementById('playBtn').style.display = 'block';
    time = 0;
});

document.getElementById('player').addEventListener('pause', () => {clearInterval(update);});

document.getElementById('player').addEventListener('play', () => {
    getInfoBaoutAudio();
    update = setInterval(getInfoBaoutAudio, 1000);

    if(visual){
        var canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext("2d");
      
        src.connect(analyser);
        analyser.connect(context.destination);
      
        analyser.fftSize = 256;
      
        var bufferLength = analyser.frequencyBinCount;
      
        var dataArray = new Uint8Array(bufferLength);
      
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;
      
        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;
      
        function renderFrame() {
          requestAnimationFrame(renderFrame);
      
          x = 0;
      
          analyser.getByteFrequencyData(dataArray);
      
          ctx.fillStyle = "rgb(0, 24, 56)";
          ctx.fillRect(0, 0, WIDTH, HEIGHT);
      
          for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            
            var r = barHeight + (25 * (i/bufferLength));
            var g = 250 * (i/bufferLength);
            var b = 50;
      
            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      
            x += barWidth + 1;
          }
        }
        renderFrame();
    }
});