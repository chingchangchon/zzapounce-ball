var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var gravity = 0.2;
var dx=0;

addEventListener("resize", function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

addEventListener("click", function(event) {
    init();
});

// 초기화, true로 되면 해당 방향으로 이동
// 이벤트 객체의 keyCode 속성에서 눌려진 키의 코드를 얻을 수 있고, 어떤 키인지 확인한 다음 적절한 변수 설정
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

// 먼저 눌린 키를 수신할 이벤트 리스너 필요
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
 
// 키보드가 눌렸을 때 일어나는 함수 (매개변수: e)
// 각 방향키의 keycode와 방향이 맞다면, 해당 변수들 true 
function keyDownHandler(e) {
	if(e.key == 37 || e.key == "ArrowRight") {
        rightPressed = true;
        console.log(rightPressed);
	}
	else if(e.key == 39 || e.key == "ArrowLeft") {
	  leftPressed = true;
  }
  else if(e.key == 38 || e.key == "ArrowUp") {
	  upPressed = true;
  }
  else if(e.key == 40 || e.key == "ArrowDown") {
	  downPressed = true;
  }
}
 
 
// 키보드가 안 눌렸을 때 일어나는 함수 (매개변수: e)
// 각 방향키의 keycode와 방향이 맞다면, 해당 변수들 false > 초기화
function keyUpHandler(e) {
	if(e.key == 37 || e.key == "ArrowRight") {
	  rightPressed = false;
  }
  else if(e.key == 39 || e.key == "ArrowLeft") {
	  leftPressed = false;
  }
  else if(e.key == 38 || e.key == "ArrowUp") {
	  upPressed = false;
  }
  else if(e.key == 40 || e.key == "ArrowDown") {
	  downPressed = false;
  }
}

function getDistance(x1, y1, x2, y2) {
	let xDistance = x2 - x1;
	let yDistance = y2 - y1;
	
	return Math.sqrt( Math.pow(xDistance, 2) + Math.pow(yDistance, 2) );
}

function Ball(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        if(this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dx;
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
    };
    this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();
	};
}

function Star(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();
	};
}

var ball;
var star;

function init() {
    var radius = 10;
    var x = 10;
    var y = 800;
    var dy = 0;
    ball = new Ball(x, y, dx, dy, radius, 'blue');
    star = new Star(x+300, y+50, radius, 'yellow');
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);

    if (rightPressed == true){
        ball.x += 3;
    }
    else if (leftPressed == true){
        ball.x -= 3;
    }

    if (getDistance(ball.x, ball.y, star.x, star.y) < ball.radius + star.radius){
        window.location.href = "victory.html";
        console.log("you win!");
    }
    ball.update();
    star.draw();
}

init();
animate();