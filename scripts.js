window.onload = function() {
    const speed = 1;
    const stage = document.querySelector("#stage");
    const ctx = stage.getContext("2d");

    let speedX = 0; 
    let speedY = 0;

    let pointX = 10;
    let pointY = 15;
    
    let lengthOfPiece = 20;
    let quantitieOfPieces = 20;
    
    let appleX = 15;
    let appleY = 15;

    let trail = [];
    let tail = 5;


    setInterval(game, 80);            
    
    function game() {
        document.addEventListener("keydown", keyPush)
        pointX += speedX
        pointY += speedY

        if (pointX < 0)
            pointX = quantitieOfPieces - 1
        if (pointX > quantitieOfPieces - 1)
            pointX = 0
        if (pointY < 0)
            pointY = quantitieOfPieces - 1
        if (pointY > quantitieOfPieces - 1)
            pointY = 0
        
        ctx.fillStyle = 'gray'
        ctx.fillRect(0, 0, stage.width, stage.height)
        
        ctx.fillStyle = "red"
        ctx.fillRect(appleX * lengthOfPiece, appleY * lengthOfPiece,lengthOfPiece,lengthOfPiece)
        
        ctx.fillStyle = "green"
        for (let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * lengthOfPiece, trail[i].y * lengthOfPiece, quantitieOfPieces - 1, quantitieOfPieces - 1)
            if (trail[i].x == pointX && trail[i].y == pointY) {
                speedX = 0
                speedY = 0
                tail = 5
            }
        }

        trail.push({ x: pointX, y: pointY })
        while (trail.length > tail) {
            trail.shift();
        }

        if (appleX == pointX && appleY == pointY) {
            tail++
            appleX = Math.floor(Math.random() * quantitieOfPieces)
            appleY = Math.floor(Math.random() * quantitieOfPieces)
        }
        
        function keyPush(event) {
            switch (event.keyCode) {
                case 37: // Left
                    speedX = - speed
                    speedY = 0
                    break;
                case 38: // Up
                    speedX = 0
                    speedY = - speed
                    break;
                case 39: // Right
                    speedX = speed
                    speedY = 0
                    break;
                case 40: // Down
                    speedX = 0
                    speedY = speed
                    break;
                default:
                    break;
            }
        }
    }
}