//browseResult
async function browseResult(){
    let fileselector = document.getElementById('fileselector');
    console.log(fileselector.files)
    let pathList = {};
    for(let key in fileselector.files){
        pathList[key] = fileselector.files[key].webkitRelativePath
    }
    setCookie('dir', JSON.stringify(pathList), 30);
    document.getElementById('hideBtnRe').style.display = 'none';
    await getVids()
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

async function getVids(){
    vids = getCookie('dir');

    if(vids != null){
        document.getElementById('thumbs').innerHTML = 'טוען...';
        await new Promise(r => setTimeout(r, 2000));
        document.getElementById('thumbs').innerHTML = '';
        
        for(var i = 1; i < 21; i++){
            document.getElementById('loadingDiv').style.scale = (100-i*5) + '%';
            await new Promise(r => setTimeout(r, 0.25));
        }
    
        document.getElementById('loadingDiv').style.display = "none";
        document.getElementById('mainDiv').style.display = "flex";
        if(vids){
            vids = JSON.parse(vids);
            let table = document.getElementById('thumbs');
            let tr, td, title, name, selectItem;
            let count = 0;
            for(var key in vids){
                if(count % 3 == 0){
                    tr = document.createElement("tr");
                    table.appendChild(tr);
                }
                td = document.createElement('td');
                tr.appendChild(td);
                td.classList.add('item');
                td.style.backgroundImage = "url('thumb.png')";
                td.id = key;
                selectItem = function(item) {
                    return function() {
                        let vid = document.getElementById('theVideoPlayer');
                        vid.src = '../Your Files/' + vids[item];
                        vid.style.display = "flex";
                        vid.requestFullscreen();
                        current = item;
                    }
                }
                td.onclick = selectItem(td.id);
    
                title = document.createElement('p');
                td.appendChild(title);
                title.classList.add('titleName');
                name = (parseInt(key)+1) + ' - ' + vids[key].replace('vids/', '').replace('.mp4', '');
                title.innerHTML = name;
                count++;
            }
        }
        
        await new Promise(r => setTimeout(r, 2000));
        document.getElementById('titleDiv2').style.overflowX = 'hidden';
        document.getElementById('titleDiv2').style.overflowY = 'scroll';
    } else {
        await new Promise(r => setTimeout(r, 2000));
        document.getElementById('thumbs').innerHTML = '';
        
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


//start
var vids;
var full = false;
var current = 0;
document.getElementById('theVideoPlayer').addEventListener("fullscreenchange", function() {
    if(document.fullscreenElement == null){
        document.getElementById('theVideoPlayer').src = '';
        document.getElementById('theVideoPlayer').style.display = 'none';
        full = false;
    }
    else full = true;
});
document.getElementById('theIntro').addEventListener("fullscreenchange", function() {
    if(document.fullscreenElement == null){
        document.getElementById('theVideoPlayer').src = '';
        document.getElementById('theVideoPlayer').style.display = 'none';
    }
});

getVids();

document.addEventListener("keydown", function(e){
    if(full){
        if(e.keyCode == 39) {
            if(current == Object.keys(vids).length-1) current = 0;
            else current++;

            let vid = document.getElementById('theVideoPlayer');
            vid.src = '../Your Files/' + vids[current];
        } else if(e.keyCode == 37) {
            if(current == 0) current = Object.keys(vids).length-1;
            else current--;

            let vid = document.getElementById('theVideoPlayer');
            vid.src = '../Your Files/' + vids[current];
        }
    }

    if(e.keyCode == 38){
        document.getElementById('theVideoPlayer').src = '';
        document.getElementById('theVideoPlayer').display = 'none';

        let intro = document.getElementById('theIntro');
        intro.src = '../Your Files/intro/intro.mp4';
        intro.requestFullscreen();
        intro.style.display = 'flex';
        full = false;
    }

    if(e.keyCode == 40){
        document.getElementById('theIntro').src = '';
        document.getElementById('theIntro').style.display = 'none';

        let video = document.getElementById('theVideoPlayer');
        video.style.display = 'flex';
        video.src = '../Your Files/' + vids[current];
        video.requestFullscreen();
        video.display = 'flex';
        full = true;
    }
}, false);