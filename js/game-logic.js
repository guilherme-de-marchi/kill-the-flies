function get_difficulty(target) {
    let url = window.location.href;
    let index = url.indexOf(target);
    return parseInt(url[index + target.length]);
}

function restart_timer() {
    seconds = 4 / difficulty;
    update_timer();
}

function update_timer() {
    $('#timer').html(Math.floor(seconds));
}

function update_life() {
    $('#heart-1').attr('src', (life <= 1)?'../img/void-heart.png':'../img/full-heart.png');
    $('#heart-2').attr('src', (life <= 0)?'../img/void-heart.png':'../img/full-heart.png');
}

function update_pontuation() {
    $('#pontuation').html(pontuation);
}

function get_random_integer(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
}

function remove_current_fly() {
    $('#current-fly').remove();
    pontuation++;
    update_pontuation();
}

function create_new_fly() {
    let fly_obj = `<img id="current-fly" class="fly" onclick="remove_current_fly(); create_new_fly(); restart_timer();">`;
    $('#flies-container').append(fly_obj);
    
    let flipped = get_random_integer(0, 1);
    $('#current-fly').attr('src', (flipped)?'../img/fly-flipped.png':'../img/fly.png');
    $('#current-fly').addClass((flipped)?'flipped':'not-flipped');

    $('#current-fly').css({
        'top': `${get_random_integer(1, 65)}%`,
        'left': `${get_random_integer(1, 65)}%`
    });
}

var life = 2;
var pontuation = 0;
var difficulty = get_difficulty('difficulty=');
var seconds;
restart_timer();
update_life();
update_pontuation();

var timer = setInterval(() => {
    if (life === 0) {
        window.location.href = 'lose-screen.html';
    }
    if (pontuation >= 10 * difficulty) {
        window.location.href = 'win-screen.html';
    }
    
    seconds--;
    update_timer();

    if (seconds < 0) {
        life--;
        restart_timer();
        update_life();
    }
}, 1000);



create_new_fly();