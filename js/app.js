
function enterInit(e) {
    var key = e.keyCode;
    if (key === 13) {
        window.removeEventListener('keypress', enterInit);
        drawModule.init();
    }
}

(function (window, document, drawModule, undefined) {
    // connect button to html
    var btn = document.getElementById('btn');
    btn.addEventListener("click", function () {
        drawModule.init();
    });
    window.addEventListener('keypress', enterInit);



    // assign keys
    // KeyCode	Key
    // 37   	left arrow
    // 38	    up arrow
    // 39	    right arrow
    // 40	    down arrow

    document.onkeydown = function (event) {
        keyCode = window.event.keyCode;
        keyCode = event.keyCode;

        switch (keyCode) {
            case 37:
                if (direction != 'right') {
                    direction = 'left';
                }
                console.log('left');
                break;
            case 39:
                if (direction != 'left') {
                    direction = 'right';
                }
                console.log('right');
                break;
            case 38:
                if (direction != 'down') {
                    direction = 'up';
                }
                console.log('up');
                break;
            case 40:
                if (direction != 'up') {
                    direction = 'down';
                }
                console.log('down');
                break;
        };
    };
})(window, document, drawModule); //cia nesupratau su self invoking function
