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
        addNewWindow(document.getElementById("TOOG-projectInfo"));
        addNewWindow(document.getElementById("AAP-projectInfo"));

        const text = `
        Hello, world!<br><pause=300>
        I'm Optical, And I like making games!<br>
        I have 3 years of scripting experience,<br>
        I'm a beginner r6 animator,<br>
        as well as a<pause=300> UI des<pause=150>igner...<br>
        <pause=800>I have worked on some projects so feel free to check them out!<br>
        I'm avalaible on weekdays from 5pm to 8pm and on weekends i'm available from 1pm to around 10pm (keep in mind this schedule is flexible)<br>
        <pause=800>(MST is m<pause=250>y timezone by the way)<br>
        <br>
        Thanks and have a good day!<br>
        Also, you can reach me through discord at @optical_.
        `;
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
                    cursor.style.left = "-999px";
                    cursor.style.top = "500px";
                }, 2500);
            }); 
        }, 2500);
    }
};

// CSS for the blinking cursor cool
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