var currentDate = new Date(Date.now() - 360000);

const dateEndings = {
    0:"th",
    1:"st",
    2:"nd",
    3:"th"
};

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

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {

        const text = `
        Hello, world!<br><pause=300>
        My name is<pause=150> Optical,<br>
        I'm<pause=150> <pause=250>15.5 yea<pause=150>rs old,<br>
        I program with luau,<pause=350> python,<pause=250> and some others.<br>
        I'm currently <pause=200>learning Godot,<br> 
        however I mostly use <pause=250> Roblox Studio, which<br><pause=250>
        I have around <pause=350>3 years of experience in.<br><br>
        feel free to check out my projects and look at my socials!<br>P.S. thanks for your time!`

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