var cancelledTimer = null;

$('document').ready(function() {
    Progressbar = {};

    Progressbar.Progress = function(data) {
        clearTimeout(cancelledTimer);
        $("#progress-label").text(data.label);
    
        $(".progress-container").fadeIn('fast', function() {
            updateBar(25, data.duration);
            $("#progress-bar").stop().css({"width": 0, "background-color": "#1787e2a6"}).animate({
              width: '100%'
            }, {
              duration: parseInt(data.duration),
              complete: function() {
                $(".progress-container").fadeOut('fast', function() {
                    $('#progress-bar').removeClass('cancellable');
                    $("#progress-bar").css("width", 0);
                    $('.item').removeClass('filled');
                    $.post('https://progressbar/FinishAction', JSON.stringify({}));
                });
              }
            });
        });
    };
    
    Progressbar.ProgressCancel = function() {
        $("#progress-label").text("CANCELLED");
        $("#progress-bar").stop().css( {"width": "100%", "background-color": "rgba(71, 0, 0, 0.8)"});
        $('#progress-bar').removeClass('cancellable');
        clearInterval(interval); 
        $('.item').removeClass('filled'); 
    
        cancelledTimer = setTimeout(function () {
            $(".progress-container").fadeOut('fast', function() {
                $("#progress-bar").css("width", 0);
                $.post('https://progressbar/CancelAction', JSON.stringify({}));
            });
        }, 1000);
    };
    
    

    Progressbar.CloseUI = function() {
        $('.main-container').fadeOut('fast');
    };
    
    window.addEventListener('message', function(event) {
        switch(event.data.action) {
            case 'progress':
                Progressbar.Progress(event.data);
                break;
            case 'cancel':
                Progressbar.ProgressCancel();
                break;
        }
    });
});


var interval; // Declare interval outside the function

function updateBar(kne, duration) {
    var kneBar = document.getElementById('kneBar');
    var myBar = document.getElementById('myBar');
    if (kneBar) {
        kneBar.innerHTML = '';
        for (var i = 0; i < 25; i++) {
            var item = document.createElement('div');
            item.className = 'item';
            kneBar.appendChild(item);
        }
        var i = 0;
        clearInterval(interval);
        interval = setInterval(function() {
            if (i >= kne) {
                clearInterval(interval);
                //console.log('The function checks are complete.'); // 
            } else {
                var item = kneBar.children[i];
                item.classList.add('filled');
                i++;
                var percentage = Math.round((i / kne) * 100);
                myBar.textContent = percentage + '%'; 
            }
        }, duration / kne);
    } else {
        //console.log("Element with ID 'kneBar' not found");
    }
}
