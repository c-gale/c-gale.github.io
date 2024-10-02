const windowDivs = {};

function addNewWindow(element) {
    windowDivs[element.id] = {
        "element":element,
        "isOpen":false
    }

    const header = document.getElementById(element.id + "-Header")

    header.style.zIndex = 10;
    element.style.zIndex = 10;
    element.style.position = "absolute";
    element.style.width = "500px";
    element.style.display = "none";

    dragElement(element);
}

function closeWindow(elementId) {
    if (windowDivs[elementId]) {
        windowDivs[elementId]["element"].style.display = "none";
        windowDivs[elementId]["element"].style.zIndex = 10;
        windowDivs[elementId]["isOpen"] = false;
    }
}

function openWindow(element, startX, targetY, targetWidth) {
    if (!windowDivs[element.id]) {
        return false;
    }

    if (windowDivs[element.id]["isOpen"] == true) {
        return false;
    }

    windowDivs[element.id]["isOpen"] = true;

    const bodyOfElement = document.getElementById(element.id + "-Body")

    element.style.display = "block";
    bodyOfElement.style.display = "none";

    element.style.left = `${startX}px`
    element.style.top = `${window.innerHeight-5}px`
    element.style.width = `${500}px`

    var iterations = 8;

    var targetYInterval = (parseInt(element.style.top,10) - targetY)/iterations
    var targetWidthInterval = (targetWidth - parseInt(element.style.width,10))/iterations

    let iteration = 0;
    const interval = setInterval(() => {
        if (iteration < iterations) {
            const randomNum = (Math.random() * (100 - 1) + 1) // whether or not to hide the div for this iteration

            if (randomNum >= 63) {
                element.style.display = "none";
            } else {
                element.style.display = "block";
            }

            element.style.top = `${parseInt(element.style.top,10) - targetYInterval}px`
            element.style.width = `${parseInt(element.style.width,10) + targetWidthInterval}px`

            console.log(parseInt(element.style.width,10));
            iteration++;
        } else {
            element.style.display = "block";

            const sound = new Howl({
                src: ["/sfx/ding.mp3"],
                volume: 0.8,
                autoplay: false
            });
        
            sound.play();

            bodyOfElement.style.display = "block";
            clearInterval(interval);
        }
    }, 32)
}