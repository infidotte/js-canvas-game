var score = 0;

var canvas = document.getElementById('canvas');
var paint = canvas.getContext('2d');
paint.font = "bold 48px serif"
var blobs = [];
var isPlay = false;

function Start() {
    CanvasSize();
    isPlay = true;
    Update(isPlay);
}

function Update() {
    if(isPlay){
        paint.clearRect(0, 0, canvas.width, canvas.height);
        paint.fillRect(0, canvas.height-5, canvas.width, 5);
        paint.fillText(score.toString(), 10, 10);

        if (GetRandom(50) < 1) {
            BlobSpawn();
        }

        blobs.forEach(blob => {
            blob.Move();
            DrawBlob(blob);

            if (blob.isBelow(canvas.height)) {
                let died = new Audio("you-died.mp3");
                died.play();
                score = 0;
                paint.clearRect(0, 0, canvas.width, canvas.height);
                blobs.length = 0;
                isPlay = false;
                setTimeout(Start, 8000);
                paint.fillText("YOU DIED", (window.innerWidth-17)/2, (window.innerHeight-17)/2);
            }
        });
        window.requestAnimationFrame(Update);
    }
}

function DrawBlob(blob) {    
    paint.beginPath();
    paint.strokeStyle = 'black';
    paint.fillStyle = blob.color;
    paint.lineWidth = 1;
    paint.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
    paint.stroke();
    paint.fill();
}

function BlobSpawn() {
    var x = 50 + Math.random() * (canvas.width - 100);
    var y = -10 + Math.random() * 10;
    var randomColor = Math.floor(Math.random() * 5);
    if (randomColor == 1) {
        blobs.push(new Blob(x, y, 25, "red"));
    }
    if (randomColor == 2) {
        blobs.push(new Blob(x, y, 25, "blue"));
    }
    if (randomColor == 3) {
        blobs.push(new Blob(x, y, 25, "green"));
    }
    if (randomColor == 4) {
        blobs.push(new Blob(x, y, 25, "yellow"));
    }
    if (randomColor == 5) {
        blobs.push(new Blob(x, y, 25, "purple"));
    }
    
}

function CanvasSize() {
    canvas.height = window.innerHeight-17;
    canvas.width = window.innerWidth-17;
}

canvas.addEventListener("mousedown", (click) => {
    blobs.forEach(blob => {
        let rect = canvas.getBoundingClientRect();
        let x = click.clientX - rect.left;
        let y = click.clientY - rect.top;
        let result = Math.sqrt(((x - blob.x) ** 2) + ((y - blob.y) ** 2));
        if (result <= blob.radius) {
            let ooh = new Audio("ooh.mp3");
            ooh.play();
            score += 1;
            blobs.splice(blobs.indexOf(blob), 1);
        }
    });
});

function GetRandom(max) {
    return Math.random() * max;
}

class Blob {
    constructor(x, y, r, c) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = c;
    }

    Move() {
        this.y += 1;
    }

    isBelow(height) {
        return this.y + this.radius > height;
    }

}

Start();