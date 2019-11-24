// main
var drawModule = (function () {
    var bodySnake = function (x, y, c) {
        // single snake square
        ctx.fillStyle = c;
        ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        // border of snake square
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    };

    var pizza = function (x, y) {
        // border of food square
        ctx.fillStyle = 'orange';
        ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        // single food square
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
    };

    var scoreText = function () {
        // snake total food eaten
        var score_text = "Score: " + score;
        scoreLabel.innerHTML = "<p>" + score_text + "</p>";
    };


    // draw snake 
    var drawSnake = function () {
        // initial body length
        var length = 4;
        snake = [];
        // forming snake array
        for (var i = length - 1; i >= 0; i--) {
            snake.push({ x: i, y: 0 }); //cia nlb supratau-----------
        }
    };

    // draw food 
    var createFood = function () {
        food = {
            // random number
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }

        // check snake body position
        for (let i = 0; i < snake.length; i++) { //kodel >?
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            if (food.x === snakeX && food.y === snakeY || food.y === snakeY && food.x === snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            };
        };
    };

    // check snake collision on itself
    var checkCollision = function (x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y)
                return true;
        };
        return false;
    };

    // main function
    var paint = function () {
        // snake moving area
        ctx.fillStyle = 'lightgreen';
        ctx.fillRect(0, 0, w, h);

        // snake moving area border
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, w, h);

        // disable start button and text while playing
        document.getElementById('start-text').setAttribute('hidden', '');
        scoreLabel.style.display = 'inline-block';
        btn.setAttribute('hidden', '');


        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        // moving the snake
        if (direction == 'right') {
            snakeX++;
        } else if (direction == 'left') {
            snakeX--;
        } else if (direction == 'up') {
            snakeY--;
        } else if (direction == 'down') {
            snakeY++;
        };

        // snake dies when 1.touches canvas border, 2. touches itself
        if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
            // the game stops
            // bring back button
            window.addEventListener('keypress', enterInit);
            btn.removeAttribute('hidden', '');
            document.getElementById('start-text').removeAttribute('hidden', '');
            scoreLabel.style.display = 'none';


            // clear canvas
            score = 0;
            ctx.clearRect(0, 0, w, h);
            gameloop = clearInterval(gameloop); //nesupratau/////////////
            return;
        };

        // snake eats food, gets longer, if not - moves
        if (snakeX == food.x && snakeY == food.y) {
            // add square to snake tail
            var tail = {
                x: snakeX,
                y: snakeY
            };
            score++;

            // create new food
            createFood();
        } else {
            // remove last snake square
            var tail = snake.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        };

        // move removed snake square to front
        snake.unshift(tail);

        // draw each of snake squares
        for (var i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y, i == 0 ? 'pink' : 'tomato');
        };

        // draw food
        pizza(food.x, food.y);

        // show score
        scoreText();
    };


    // initialize function
    var init = function () {
        direction = 'down';
        drawSnake();
        createFood();
        gameloop = setInterval(paint, 80);
    }

    return {
        init: init  ///nesupratau---------
    };

    // close mainfunction
}());
