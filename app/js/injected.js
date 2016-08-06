(function () {

    console.log("Waiting for DOMContentLoaded");
    document.addEventListener('DOMContentLoaded', function () {
        console.log("DOMContentLoaded event");

        // pass in the target node, as well as the observer options
        var observer = new MutationObserver(function (mutations) {
            console.log("Mutations occurred: ", mutations.length);
            var inputSearch = document.querySelector("input.input-search");
            if (inputSearch) {
                console.log("Adding event listeners");

                document.addEventListener("keydown", function (event) {
                    // cmd+k and cmd+f focuses on search input.
                    if ((event.keyCode === 75 || event.keyCode == 70) && event.metaKey === true)
                        inputSearch.focus();
                });

                console.log("Disconnecting the observer");
                observer.disconnect();
            }
        });

        var config = {childList: true, subtree: true};
        observer.observe(document.querySelector("body"), config);

    }, false);

    setInterval(function() {
        Array.from(document.querySelectorAll('audio')).map(function(audio) {
            audio.playbackRate = (window.audioRate || 1)
        });
        if (window.audioRate) {
            Array.from(document.querySelectorAll('.meta-audio *:first-child')).map(function(span) {
                span.innerHTML = window.audioRate.toFixed(1) + "x&nbsp;";
            });
        }
    }, 200);
})();
