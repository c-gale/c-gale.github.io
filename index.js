var currentDate = new Date(Date.now() - 360000)
const dateEndings = {
    0:"th",
    1:"st",
    2:"nd",
    3:"th"
};

const optionValues = {
    ["blankOption"]: "",
    ["inspirationsOption"]: `inspiration for this website comes from<pause=600> a couple different sources,<br>
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
        P.<pause=500>S.<pause=500> this website is very incomplete atm so<br>
        go check out my portfolio at https://c-gale.github.io/projects`

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
                src: ["/sfx/mouseclick.wav"],
                volume: 0.4,
                autoplay: false
            });
        
            sound.play();
         }, 2000)

        setTimeout(() => {
            typewriter(document.getElementById("aboutMeDesc"), text).then(() => {
                isCurrentlyTyping = false;
                console.log('Typing complete!');
                
                setTimeout(() => {
                    cursor.style.left = "130%";
                    cursor.style.top = "200px";
                }, 2500);
            }); 
        }, 2500);
    }
};

// ON RUN

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