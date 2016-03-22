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
                    if (event.keyCode === 75 && event.metaKey === true) inputSearch.focus()
                });
    
                console.log("Disconnecting the observer");
                observer.disconnect();
            }
        });

        var config = {childList: true, subtree: true};
        observer.observe(document.querySelector("body"), config);

    }, false);
})();