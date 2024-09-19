const minTypingSpeedInSeconds = 0.05;
const maxTypingSpeedInSeconds = 0.1;
var isCurrentlyTyping = false;

const keyboardSFXFileNames = [
    "key1",
    "key2",
    "key3",
    "key4",
    "key5",
    "key6",
    "key7",
]

function playKeyboardSound() {
    const randomnum = (Math.random() * (keyboardSFXFileNames.length-1))
    const randomKeyboardSFX = keyboardSFXFileNames[Math.round(randomnum)]

    var sound = new Howl({
        src: ["/sfx/"+randomKeyboardSFX+".mp3"],
        volume: 0.2,
        autoplay: false
    });

    sound.play();
    sound = null;
}

function preprocessText(text) {
    return text.replace(/\s+/g, ' ');
}

function preprocessTextAlt(text) {
    let result = text.replace(/<pause=\d+>/g, '');

    // Collapse multiple spaces into a single space
    result = result.replace(/\s+/g, ' ');

    return result
}

function typewriter(element, rawText, i = 0) {
    const text = preprocessText(rawText);
    isCurrentlyTyping = true;

    return new Promise((resolve) => {
        function typeCharacter(i) {
            // Remove any existing cursor
            const cursor = document.querySelector('.blinking-cursor');
            if (cursor) cursor.remove();

            const randomTypingDelay =  (Math.random() * (maxTypingSpeedInSeconds - minTypingSpeedInSeconds) + minTypingSpeedInSeconds)*1000;

            // Check if the current portion of text contains a pause tag
            const pauseMatch = text.slice(i).match(/^<pause=(\d+)>/);
            
            if (pauseMatch) {
                // Extract the duration from the tag
                const pauseDuration = parseInt(pauseMatch[1], 10);
                // Calculate the next index after the pause tag
                const nextIndex = i + pauseMatch[0].length;
                
                // Pause for the specified duration and continue typing
                setTimeout(() => typeCharacter(nextIndex), pauseDuration);
            } 
            // Check if the current portion of text contains a line break tag
            else if (text.slice(i).startsWith('<br>')) {
                // Add a line break to the element
                element.innerHTML += '<br>';
                // Move to the next character after the <br> tag
                setTimeout(() => typeCharacter(i + 4), randomTypingDelay);
            } 
            else {
                // For normal text, append the character using innerHTML
                element.innerHTML += text[i];
                
                playKeyboardSound();

                if (i === text.length - 1) {
                    // Add the blinking cursor after the text is fully typed
                    element.innerHTML += '<span class="blinking-cursor">|</span>';
                    resolve();  // Resolve the promise when done
                } else {
                    // Continue typing with a random delay
                    setTimeout(() => typeCharacter(i + 1), randomTypingDelay);
                }
            }
            
            // Add the blinking cursor at the end of the element
            if (i < text.length - 1) {
                element.innerHTML += '<span class="blinking-cursor">|</span>';
            }
        }
        
        typeCharacter(i);
    });
}

function moveCursor(toTargetId, cursor) {
    const target = document.getElementById(toTargetId);
    const targetRect = target.getBoundingClientRect();
    
    // Calculate target position including scrolling
    const targetX = targetRect.left + window.scrollX + 140 +(Math.random() * 20);
    const targetY = targetRect.top + window.scrollY + 26 +(Math.random() * 20);

    // Apply position changes
    cursor.style.left = `${targetX}px`;
    cursor.style.top = `${targetY}px`;
}

function doDeleteAllEffect() {
    var element = document.getElementById("aboutMeDesc");
    element.innerHTML = "";
}

function isInOptionTable(option) {
    for (const [key, value] of Object.entries(optionValues)) {
        console.log(key+" : "+value);
        if (option == key) {
            return [true, value];
        }
    }

    return false;
}

function onSubmitOptionClicked() {
    if (isCurrentlyTyping) {
        console.log("CAN'T RN!");
        return
    }

    const selectElement = document.querySelector('#whatDoYouSelect');
    var selectedOption = selectElement.value;

    const [ isOption, optionText ] = isInOptionTable(selectedOption)

    if (isOption) {
        const element = document.getElementById("#aboutMeDesc")
        moveCursor('aboutMeDesc', document.getElementById('cursor'));

        setTimeout(() => { 
            var sound = new Howl({
                src: ["/sfx/mouseclick.wav"],
                volume: 0.4,
                autoplay: false
            });
        
            sound.play();
        }, 2000)

        setTimeout(() => {
            doDeleteAllEffect();
        }, 2500);

        setTimeout(() => {
            typewriter(document.getElementById("aboutMeDesc"), optionText).then(() => {
                setTimeout(() => {
                    cursor.style.left = "130%";
                    cursor.style.top = "200px";

                    isCurrentlyTyping = false;
                }, 2500);
            })
        }, 2700);
    };
};
