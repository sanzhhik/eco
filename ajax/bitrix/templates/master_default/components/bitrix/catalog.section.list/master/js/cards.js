;
(function () {
    
    var _readyFn = function () {
        var targetElements = document.querySelectorAll('.flex-card');

        if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window) {

            var options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.5
            }


            var callback = function (entries, observer) {
                for (var i in entries) {
                    if (!entries.hasOwnProperty(i)) {
                        continue;
                    }

                    var entry = entries[i];

                    if (entry.isIntersecting) {
                        entry.target.classList
                            .remove('wait-animation');

                        observer.unobserve(entry.target);
                    }
                }
            }

            var observer = new IntersectionObserver(callback, options);
            for (var i in targetElements) {
                if (!targetElements.hasOwnProperty(i)) {
                    continue;
                }

                observer.observe(targetElements[i]);
            }
        } else {
            for (var i in targetElements) {
                if (!targetElements.hasOwnProperty(i)) {
                    continue;
                }

                targetElements[i].classList
                    .remove('wait-animation');
            }
        }
    }

    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", _readyFn);
    }

}(window, document));