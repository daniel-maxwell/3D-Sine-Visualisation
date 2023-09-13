let confLocs = [];
let confTheta = [];
let cubeHeightSlider;
let sineSpeedSlider;
let camSpeedSlider;
let camAngle = 0;

function setup() {
    createCanvas(900, 800, WEBGL);

    createSliders();

    // Populate confLocs and confTheta arrays
    for (let i = 0; i < 200; i++) {
        let loc = createVector(random(-500, 500), random(-800, 0), random(-500, 500));
        confLocs.push(loc);
        confTheta.push(random(0, 360));
    }

}

function draw() {
    background(125);
    angleMode(DEGREES);

    // Fetch the values from the sliders
    let cubeHeight = cubeHeightSlider.value();
    let sineSpeed = sineSpeedSlider.value();
    let camSpeed = camSpeedSlider.value() * 0.01;

    // Increment camera angle
    camAngle += camSpeed;

    // Adding lights
    ambientLight(100, 100, 100);  // General light to the whole scene
    pointLight(255, 255, 255, 500, -500, 0);  // A bright light from a specific 3D location
    directionalLight(255, 255, 255, 1, -1, -1);  // Simulates "sunlight" from a specific direction
 
    // Camera movement around the structure
    let camX = 1000 * cos(camAngle);
    let camZ = 1000 * sin(camAngle);
    camera(camX, -600, camZ, 0, 0, 0, 0, 1, 0);

    // Set the camera's position and where it looks
    camera(camX, -600, camZ, 0, 0, 0, 0, 1, 0);

    // Set the material to normal and remove the stroke
    normalMaterial();
    noStroke();
    strokeWeight(2);
    
    // Creating the grid of boxes
    let boxSize = 50;
    let spacing = 50;  // spacing between the boxes, same as boxSize for now

    for (let x = -400; x <= 400; x += spacing) {
        for (let z = -400; z <= 400; z += spacing) {
            push();  // Save the current coordinate system

            // Map the box color to the x and z coordinates
            r = map(x, -400, 400, 0, 255);
            g = map(z, -400, 400, 0, 255);
            b = map(x, -400, 400, 255, 0);

            // Set an ambient material using the mapped colors
            ambientMaterial(r, g, b);
        
            // Calculate the distance from the center of the coordinate system
            let distance = dist(x, 0, z, 0, 0, 0);

            // Calculate the length of the box using a sine wave
            let length = map(sin(distance * sineSpeed + frameCount), -1, 1, 100, cubeHeight);

            translate(x, -length / 2, z); // Adjust the vertical position so the boxes grow upwards
            
            box(boxSize, length, boxSize);  // Set the height of the box using the length variable
            
            pop();  // Restore the previous coordinate system
        }
    }

    // Draw the confetti
    confetti();
}

function createSliders() {
    // Cube height slider and its label
    let cubeHeightLabel = createP('Cube Height');
    cubeHeightLabel.position(160, height - 11);
    cubeHeightLabel.style('font-family', 'Verdana');
    cubeHeightSlider = createSlider(100, 300, 200);
    cubeHeightSlider.position(20, height + 5);

    // Sine wave speed slider and its label
    let sineSpeedLabel = createP('Sine Wave Speed');
    sineSpeedLabel.position(160, height + 18);
    sineSpeedLabel.style('font-family', 'Verdana');
    sineSpeedSlider = createSlider(0.01, 2, 1, 0.01);
    sineSpeedSlider.position(20, height + 35);

    // Camera rotation speed slider and its label
    let camSpeedLabel = createP('Camera Rotation Speed');
    camSpeedLabel.position(160, height + 48);
    camSpeedLabel.style('font-family', 'Verdana');
    camSpeedSlider = createSlider(1, 300, 5);
    camSpeedSlider.position(20, height + 65);
}

function confetti() {
    for (let i = 0; i < confLocs.length; i++) {
        push();  // Save current drawing state
        
        // Increment y-coordinate and rotation
        confLocs[i].y += 1;
        confTheta[i] += 10;

        // Translate to confetti location
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);

        // Rotate the confetti by its theta
        rotateX(confTheta[i]);
        rotateY(confTheta[i]);
        rotateZ(confTheta[i]);
        
        // Draw the confetti plane
        plane(15, 15);
        
        // Check if confetti y-coordinate has reached the middle
        if (confLocs[i].y > 0) {
            confLocs[i].y = -800;
        }

        pop();  // Restore previous drawing state
    }
}

