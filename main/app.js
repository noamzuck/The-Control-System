let start = async function(){
    await new Promise(r => setTimeout(r, 2000));
    for(var i = 1; i < 21; i++){
        document.getElementById('loadingDiv').style.scale = (100-i*5) + '%';
        await new Promise(r => setTimeout(r, 0.25));
    }

    document.getElementById('loadingDiv').style.display = "none";
    document.getElementById('mainDiv').style.display = "flex";
}

start();

function sound(){
    window.location.href = "musicSYS/index.html";
}

function video(){
    window.location.href = "videoSYS/index.html";
}