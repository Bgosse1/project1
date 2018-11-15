var roundNumber = 1;
$(document).ready(function () {
    $('#modal1').modal({
        dismissible: false,
        onCloseEnd: function () { timer.run() }
    });
    // $('#modal2').modal({
    //     dismissible: false,
    // });
    $('#modal1').modal('open');
    $("#timerNum").text(moment(timer.startNumber).format('m:ss'));

    $("#roundNumber").text(roundNumber);
    $("#timerNum").addClass("light-green-text text-accent-4");
});

var timer = {
    startNumber: 120000,
    intervalId: '',
    run: function () {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.decrement, 1000);
    },
    decrement: function () {
        timer.startNumber -= 1000;
        var formattedTime = moment(timer.startNumber).format('m:ss');
        $("#timerNum").text(formattedTime);
        if (timer.startNumber < 60000) {
            $("#timerNum").removeClass("light-green-text text-accent-4").addClass("orange-text");
        }
        else if(timer.startNumber < 59000){
            $("#timerNum").removeClass("orange-text").addClass("red-text");
        }

        if (timer.startNumber === 0) {
            timer.stop();
            if (roundNumber < 5) {
                //do something here after timer hits zero
                modalNextRound();
            }
        }
    },
    stop: function () {
        clearInterval(this.intervalId);
    }
};


function modalNextRound() {
    roundNumber++;
    $("#roundNumber").text(roundNumber);
    timer.startNumber = 120000;
    $("#timerNum").text(moment(timer.startNumber).format('m:ss'));
    var roundCompleted = $('<p>');
    var instructions = $('<p>');
    roundCompleted.text('Round Completed');
    instructions.text('Click Next Round when you are ready to begin the next round.');
    $('.modal-content').empty();
    $('.modal-content').append(roundCompleted);
    $('.modal-content').append(instructions);
    $('#modal-btn').text('Next Round');
    $('#modal1').modal('open');
};