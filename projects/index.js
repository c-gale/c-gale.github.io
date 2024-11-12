function loadGifs() { // IMPROVE APON LATER...
    document.getElementById("combatGif").innerHTML = '<img alt="image" src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3Q0OWZsMms0bjlnc3J5cDNvZWJ4eGd6bG11MnVibmxlM2lqd2doYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/i0tYY5nK336BKisPMH/giphy.gif" class="imageSizeWindow">'
    document.getElementById("dodgingGif").innerHTML = '<img alt="image" src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExamdlM2wyc3kweXJ0YmhkeDN1djk5bTFjYm5zd3Vwd2l5OW0xczRtMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IONNUPOYnDxU5vPYN6/giphy.gif" class="imageSizeWindow">'
    document.getElementById("topdownExampleGif").innerHTML = '<img alt="image" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3hnYzBkdzR6dHBnZ2EyYmRraGpmcXRrcDQzeWs5bXZqaWdhY2ZlZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iwHGv8UnfijFIqmsdH/giphy.gif" class="imageSizeWindow">'
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        document.getElementById("loading-window").remove()

        addNewWindow(document.getElementById("AAP-projectInfo"));
        addNewWindow(document.getElementById("CS-projectInfo"));
        addNewWindow(document.getElementById("US-projectInfo"));

        loadGifs()

        const text = `
            Hello, world!<br><pause=300>
            I'm Optical, And I like making games!<br>
            I have most of my experience in luau scripting,<br>
            I'm a beginner r6 animator,<br>
            as well as a<pause=300> UI des<pause=150>igner...<br>
            <pause=800>I have worked on some projects so feel free to check them out!<br>
            I'm avalible most of the time so feel free to reach out if you want...<br>
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
            var clickSFX = new Audio("/sfx/mouseclick.wav");
            clickSFX.volume = 0.7;

            clickSFX.play();
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

// ON RUN
const style = document.createElement('style'); // for the blinking cursor effect
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
