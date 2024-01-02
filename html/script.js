document.addEventListener("DOMContentLoaded", (event) => {
    var ProgressBar = {
        init: function () {
            this.progressLabel = document.getElementById("progress-label");
            //this.progressPercentage = document.getElementById("progress-percentage");
            this.progressBar = document.getElementById("progress-bar");
            this.progressContainer = document.querySelector(".progress-container");
            this.animationFrameRequest = null;
            this.setupListeners();
        },

        setupListeners: function () {
            window.addEventListener("message", function (event) {
                if (event.data.action === "progress") {
                    ProgressBar.update(event.data);
                } else if (event.data.action === "cancel") {
                    ProgressBar.cancel();
                }
            });
        },

        update: function (data) {
            if (this.animationFrameRequest) {
                cancelAnimationFrame(this.animationFrameRequest);
            }
            clearTimeout(this.cancelledTimer);

            this.progressContainer.style.transition = "opacity 0.3s ease-in";
            this.progressContainer.style.opacity = "100";

            this.progressLabel.textContent = data.label;
            //this.progressPercentage.textContent = "0%";
            this.progressContainer.style.display = "block";
            let startTime = Date.now();
            let duration = parseInt(data.duration, 10);

            // Call the updateRPM function with the name of the data object
            updateBar(25, data.duration);

            const animateProgress = () => {
                let timeElapsed = Date.now() - startTime;
                let progress = timeElapsed / duration;
                if (progress > 1) progress = 1;
                let percentage = Math.round(progress * 100);
                this.progressBar.style.width = percentage + "%";
                //this.progressPercentage.textContent = percentage + "%";
                if (progress < 1) {
                    this.animationFrameRequest = requestAnimationFrame(animateProgress);
                } else {
                    this.onComplete();
                }
            };
            this.animationFrameRequest = requestAnimationFrame(animateProgress);
        },

        cancel: function () {
            if (this.animationFrameRequest) {
                cancelAnimationFrame(this.animationFrameRequest);
                this.animationFrameRequest = null;
            }
            this.progressLabel.textContent = "CANCELLED";
            //this.progressPercentage.textContent = "";
            this.progressBar.style.width = "100%";

            this.progressContainer.style.transition = "opacity 0.3s ease-out";
            this.progressContainer.style.opacity = "0";
            
            this.cancelledTimer = setTimeout(this.onCancel.bind(this), 1000);
            clearInterval(interval); 
            var items = document.querySelectorAll('.item');
            items.forEach(function(item) {
                item.classList.remove('filled');
            });
        },

        onComplete: function () {
            setTimeout(() => {  // Add a delay of 2 seconds (2000 milliseconds)
                this.progressBar.style.width = "0";
                this.progressContainer.style.transition = "opacity 0.3s ease-out";
                this.progressContainer.style.opacity = "0";
                this.postAction("FinishAction");
                clearInterval(interval); 
                var items = document.querySelectorAll('.item');
                items.forEach(function(item) {
                    item.classList.remove('filled');
                });
            }, 100);
        },

        onCancel: function () {
            this.progressContainer.style.display = "none";
            this.progressBar.style.width = "0";
            //this.progressPercentage.textContent = "";
            clearInterval(interval); 
            var items = document.querySelectorAll('.item');
            items.forEach(function(item) {
                item.classList.remove('filled');
            });
        },

        postAction: function (action) {
            fetch(`https://progressbar/${action}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });
        },

        closeUI: function () {
            let mainContainer = document.querySelector(".main-container");
            if (mainContainer) {
                mainContainer.style.display = "none";
            }
        },
    };

    ProgressBar.init();
});



var interval; // Declare interval outside the function

function updateBar(kne, duration) {
    var kneBar = document.getElementById('kneBar');
    var myBar = document.getElementById('myBar');
    var progressPercentage = document.getElementById("progress-percentage");

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
                progressPercentage.textContent = percentage + '%'; 
            }
        }, duration / kne);
    } else {
        //console.log("Element with ID 'kneBar' not found");
    }
}
