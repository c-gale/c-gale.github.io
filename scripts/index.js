var currentDate = new Date(Date.now() - 360000)

const minTypingSpeedInSeconds = 0.05;
const maxTypingSpeedInSeconds = 0.1;

const dateEndings = {
    0:"th",
    1:"st",
    2:"nd",
    3:"th"
};

const keyboardSFXFileNames = [
    "key1",
    "key2",
    "key3",
    "key4",
    "key5",
    "key6",
    "key7",
]

const optionValues = {
    ["blankOption"]: "",
    ["inspirationsOption"]: `Inspiration for this website comes from<pause=600> a couple diffrent sources,<br>
    ofc I wanted it to look like old websites from the 80s/90s<br><pause=1000>
    but I also took a lot of inspiration from a web<pause=250>site called <pause=350>straw.page <pause=500> (<pause=600>the )
    `,
    ["musicOption"]: "",
    ["favOption"]: ""
}

function getDateEnding(endOfDate) {
    if (endOfDate > 3) {
        return dateEndings[3]
    } 

    return dateEndings[endOfDate] 
}

function getFullDayString(dayNumber) {
    var day = dayNumber.toString();
    console.log(day.slice(-1));
    const dayEndInt = parseInt(day.slice(-1));

    if (dayEndInt) {
        day = day + getDateEnding(dayEndInt);
    }

    return day;
};

function playKeyboardSound() {
    const randomnum = (Math.random() * (keyboardSFXFileNames.length-1))
    const randomKeyboardSFX = keyboardSFXFileNames[Math.round(randomnum)]

    var sound = new Howl({
        src: ["sfx/"+randomKeyboardSFX+".mp3"],
        volume: 0.4,
        autoplay: false
    });

    sound.play();
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

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const text = `
        hello, world!<br>
        the date is<pause=400> <pause=1000>`+(currentDate.toLocaleString('default', { month: 'long' }).toLowerCase())+" "+getFullDayString(currentDate.getDate())+`<br>
        my name is optical <pause=300>or opti<pause=1000><br>
        my bday is on<pause=400> <pause=500> may 21st and<br>
        i code with python,<pause=300> lua,<pause=1100> html, javascript, and some others<br>
        but i'm mostly good at python and lua atm...<br><pause=1500>
        i write songs but i'm still relatively new to it<br><pause=1100>
        << PFP here<pause=600> (I didn't wanna make a seperate la<pause=250>bel for it)..<pause=200>.<pause=500><br>
        anyways cya for now!<br>
        P.<pause=500>S.<pause=500> this website is very incomplete atm!`

        const cursor = document.getElementById('cursor');
        
        // Move the cursor to div2 after 1 second
        setTimeout(() => {
            // Set initial position (could be hidden initially)
            cursor.style.left = "-9999px";
            cursor.style.top = "900px";
            
            // Trigger reflow
            // This ensures the transition is applied from the initial to final state
            void cursor.offsetWidth; 

            // Now move the cursor to the target
            moveCursor('aboutMeDesc', cursor);
        }, 1000);

        setTimeout(() => { 
            var sound = new Howl({
                src: ["sfx/mouseclick.wav"],
                volume: 0.4,
                autoplay: false
            });
        
            sound.play();
         }, 2000)

        setTimeout(() => {
            typewriter(document.querySelector("#aboutMeDesc"), text).then(() => {
                console.log('Typing complete!');
                
                setTimeout(() => {
                    cursor.style.left = "130%";
                    cursor.style.top = "200px";
                }, 2500);
            }); 
        }, 2500);
        // PLEAASEE OPTIMIZZZEEE THINGGNIG BECAUSE THERES GOT TO BE A BETTER WAY OF DOING THIS
    }
};

// CSS for the blinking cursor
const style = document.createElement('style');
style.innerHTML = `
    .blinking-cursor {
        display: inline-block;
        margin-left: -1px;
        animation: blink 0.7s steps(2) infinite;
        opacity: 0;
    }
    @keyframes blink {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(style);