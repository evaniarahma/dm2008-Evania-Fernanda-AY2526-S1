let h = (Math.sqrt(3) / 2) * 100;
let shapes;
let hex;
let uiPanel;
let uiHeight = 0;
let perRingControls = [];

let d;
let div = 6;
let sym = 360 / div;
let snowColorPicker, snowSizeSlider, debugCheckbox;

let bgPicker;
let themeSelect;
let orbitControlsContainer;

const themes = {
  None: null,

  Pastel: [
    "#FFFFB5", // ring 1
    "#B4E9FB", // ring 2
    "#FFDDCA", // ring 3
    "#FFE1F9", // ring 4
    "#FFFFFF", // snowflake
    "#CBAACB" // background
  ],

  Sunset: [
    "#FFB5A7",
    "#FEC89A",
    "#F9DCC4",
    "#F8EDEB",
    "#FFEE95",
    "#C65F58"
  ],

  Ocean: [
    "#A8DADC",
    "#457B9D",
    "#1D3557",
    "#BDE0FE",
    "#E0FBFC",
    "#0C1B2A"
  ],

  Earthy: [
    "#CCD5AE",
    "#E9EDC9",
    "#FAEDCD",
    "#D4A373",
    "#FFFFFF",
    "#2C2415"
  ]
};


const ringDefs = [
  {
    radius: 75,
    speed: 0.35,
    size: 12,
    col: "#E92EFB",
    wobbleAmp: 6,
    wobbleFreq: 0.04,
    phase: 0,
    count: 8,
  },
  {
    radius: 60,
    speed: 0.55,
    size: 11,
    col: "#0406D6",
    wobbleAmp: 5,
    wobbleFreq: 0.05,
    phase: 0,
    count: 6,
  },
  {
    radius: 45,
    speed: 0.85,
    size: 10,
    col: "#FF2079",
    wobbleAmp: 4,
    wobbleFreq: 0.06,
    phase: 0,
    count: 3,
  },
  {
    radius: 30,
    speed: 1.25,
    size: 1,
    col: "#FFFE13",
    wobbleAmp: 3,
    wobbleFreq: 0.07,
    phase: 0,
    count: 8,
  },
];

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);

  h = (Math.sqrt(3) / 2) * 100;

  shapes = createGraphics(100, Math.ceil(h));
  shapes.noStroke();
  shapes.angleMode(DEGREES);

  hex = createGraphics(200, 200);
  hex.angleMode(DEGREES);

  // randomize planet sizes
  for (let r of ringDefs) {
    r.size = random(6, 36);
  }

  buildPanel();
  buildOrbitControls();
}

function applyTheme() {
  let selected = themeSelect.value();
  if (selected === "None") return;

  let palette = themes[selected];

  // 4 orbit rings
  for (let i = 0; i < ringDefs.length; i++) {
    ringDefs[i].col = palette[i];
  }

  // snowflake
  if (snowColorPicker) {
    snowColorPicker.value(palette[4]);
  }

  // background
  if (bgPicker) {
    bgPicker.value(palette[5]);
  }

  // update UI swatches
  if (perRingControls.length > 0) {
    for (let i = 0; i < ringDefs.length; i++) {
      perRingControls[i].color.value(ringDefs[i].col);
    }
  }
}

function draw() {
  background(bgPicker.color());
  drawTriangle();
  drawHex();

  const s = 100; // hex radius
  const w = 2 * s; // hex width
  const ht = Math.sqrt(3) * s; // hex height

  const dx = 1.5 * s; // horizontal spacing between centers
  const dy = ht; // vertical spacing between rows
  const offset = ht / 2; // odd column vertical shift

  const cols = Math.ceil(width / dx) + 2;
  const rows = Math.ceil(height / dy) + 2;

  push();
  imageMode(CENTER);

  for (let col = 0; col < cols; col++) {
    let x = col * dx;

    for (let row = 0; row < rows; row++) {
      let y = row * dy + (col % 2 === 1 ? offset : 0);

      push();
      translate(x, y);

      drawingContext.drawImage(hex.elt, -100, -100);

      pop();
    }
  }

  pop();
}

function buildPanel() {
  uiPanel = createDiv();
  uiPanel.style("position", "fixed");
  uiPanel.style("left", "0");
  uiPanel.style("right", "0");
  uiPanel.style("bottom", "0");
  uiPanel.style("background", "#111");
  uiPanel.style("color", "#fff");
  uiPanel.style("padding", "12px 16px");
  uiPanel.style("font-family", "Helvetica, Arial, sans-serif");
  uiPanel.style("font-size", "13px");
  uiPanel.style("line-height", "1.2");
  uiPanel.style("border-top", "1px solid #333");
  uiPanel.style("z-index", "10");

  // Background picker
  const bgRow = createDiv().parent(uiPanel);
  bgRow.style("display", "inline-block");
  bgRow.style("margin-right", "20px");

  createSpan("Background:&nbsp;").parent(bgRow);
  bgPicker = createColorPicker("#000000");
  bgPicker.parent(bgRow);
  bgPicker.style("vertical-align", "middle");

  // Theme selection
  const themeRow = createDiv().parent(uiPanel);
  themeRow.style("display", "inline-block");
  themeRow.style("margin-right", "20px");

  createSpan("Theme:&nbsp;").parent(themeRow);
  themeSelect = createSelect().parent(themeRow);
  themeSelect.style("vertical-align", "middle");

  // Theme options
  for (let t in themes) {
    themeSelect.option(t);
  }
  
  themeSelect.selected("None");
  themeSelect.changed(applyTheme);

  // orbits
  orbitControlsContainer = createDiv().parent(uiPanel);
  orbitControlsContainer.style("margin-top", "12px");
}

function buildOrbitControls() {
  orbitControlsContainer.html("");

  // title
  const title = createDiv("Kaleidoscope Controls");
  title.parent(orbitControlsContainer);
  title.style("font-weight", "600");
  title.style("margin", "6px 0 8px 0");

  const globalRow = createDiv().parent(orbitControlsContainer);
  globalRow.style("display", "flex");
  globalRow.style("gap", "12px");
  globalRow.style("align-items", "center");
  globalRow.style("margin-bottom", "8px");

  // Snowflake color
  createSpan("Snowflake color").parent(globalRow).style("min-width", "80px");
  snowColorPicker = createColorPicker("#02FEE4");
  snowColorPicker.parent(globalRow);

  // Snow size slider
  createSpan("Snowflake size").parent(globalRow).style("min-width", "80px");
  snowSizeSlider = createSlider(0, 180, 60, 1);
  snowSizeSlider.parent(globalRow);

  // debug toggle
  debugCheckbox = createCheckbox("Debug lines", false);
  debugCheckbox.parent(globalRow);
  debugCheckbox.style("margin-left", "12px");

  const grid = createDiv().parent(orbitControlsContainer);
  grid.style("display", "grid");
  grid.style("grid-template-columns", "repeat(auto-fit, minmax(220px, 1fr))");
  grid.style("gap", "10px");
  grid.style("margin-top", "8px");

  perRingControls = [];

  for (let i = 0; i < ringDefs.length; i++) {
    const r = ringDefs[i];

    // card
    const card = createDiv().parent(grid);
    card.style("background", "#181818");
    card.style("border", "1px solid #2a2a2a");
    card.style("border-radius", "8px");
    card.style("padding", "10px");

    // label
    const lbl = createDiv(`Orbit ${i + 1}`);
    lbl.parent(card);
    lbl.style("font-weight", "600");
    lbl.style("margin-bottom", "6px");

    // Planet color
    const colorRow = createDiv().parent(card);
    colorRow.style("display", "flex");
    colorRow.style("align-items", "center");
    colorRow.style("gap", "8px");
    createSpan("Color").parent(colorRow).style("min-width", "48px");
    const colorPicker = createColorPicker(r.col);
    colorPicker.parent(colorRow);

    // Planet size (base)
    const sizeRow = createDiv().parent(card);
    sizeRow.style("display", "flex");
    sizeRow.style("align-items", "center");
    sizeRow.style("gap", "8px");
    createSpan("Size").parent(sizeRow).style("min-width", "48px");
    const sizeSlider = createSlider(4, 60, r.size, 1);
    sizeSlider.parent(sizeRow);

    // Planet count
    const countRow = createDiv().parent(card);
    countRow.style("display", "flex");
    countRow.style("align-items", "center");
    countRow.style("gap", "8px");
    createSpan("Count").parent(countRow).style("min-width", "48px");
    const countSlider = createSlider(0, 12, r.count || 1, 1);
    countSlider.parent(countRow);

    // store handles
    perRingControls.push({
      color: colorPicker,
      size: sizeSlider,
      count: countSlider,
    });
  }
}

function drawTriangle() {
  const ctx = shapes.drawingContext;

  shapes.clear();
  shapes.push();

  //  triangular clipping mask
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(100, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.clip();

  //  move origin to center of triangle contents
  shapes.translate(50, 0); // apex of triangle

  // white rings
  shapes.noFill();
  shapes.stroke("#fff");
  shapes.strokeWeight(0.5);
  for (const r of ringDefs) {
    shapes.ellipse(0, 0, r.radius * 2);
  }

  ctx.restore();
  shapes.pop();
}

function drawHex() {
  // UI User Interface
  for (let i = 0; i < ringDefs.length; i++) {
    const ui = perRingControls[i];
    if (!ui) continue;
    ringDefs[i].col = ui.color.value();
    ringDefs[i].size = ui.size.value();
    ringDefs[i].count = ui.count.value();
  }

  const snowColor = snowColorPicker ? snowColorPicker.value() : "#02FEE4";
  const snowSize = snowSizeSlider ? snowSizeSlider.value() : 60;
  const showDebug = debugCheckbox ? debugCheckbox.checked() : false;

  hex.push();
  hex.clear();
  hex.translate(100, 100);

  hex.push();
  hex.rotate(30);
  for (let i = 0; i < 3; i++) {
    // slice 1
    hex.drawingContext.drawImage(shapes.elt, -50, 0);

    // mirror
    hex.scale(-1, 1);
    hex.rotate(60);

    // slice 2
    hex.drawingContext.drawImage(shapes.elt, -50, 0);

    // rotate for next pair
    hex.rotate(60);
    hex.scale(-1, 1);
  }
  hex.pop();

  hex.push();
  hex.stroke(snowColor);
  hex.strokeWeight(1);
  drawSnowflake(hex, snowSize);
  hex.pop();

  // DEBUG outlines
  if (showDebug) {
    hex.push();
    hex.rotate(30);
    hex.stroke("#00ff00");
    hex.strokeWeight(1);
    hex.noFill();
    for (let i = 0; i < 6; i++) {
      hex.beginShape();
      hex.vertex(0, 0);
      hex.vertex(50, h);
      hex.vertex(-50, h);
      hex.endShape(CLOSE);
      hex.rotate(60);
    }
    hex.pop();
  }

  // ---- ORBITS + PLANETS ----
  hex.angleMode(DEGREES);

  // orbit rings
  hex.noFill();
  hex.stroke(255);
  hex.strokeWeight(0.5);
  for (const r of ringDefs) {
    hex.ellipse(0, 0, r.radius * 2);
  }

  // planets (per ring)
  for (const r of ringDefs) {
    const c = max(0, int(r.count || 0));
    if (c === 0) continue;
    for (let j = 0; j < c; j++) {
      hex.push();
      const step = 360 / c;
      // evenly spaced
      hex.rotate(frameCount * r.speed + j * step);
      hex.noStroke();
      hex.fill(r.col);
      // size wobble
      const sizeNow =
        r.size + r.wobbleAmp * sin(frameCount * r.wobbleFreq * 5 + r.phase);
      const d = max(2, sizeNow);
      drawPlanet(hex, r.radius, d, r);
      hex.pop();
    }
  }

  hex.pop();
}

function drawPlanet(g, radius, size, r) {
  g.ellipse(radius, 0, size);
}

function drawSnowflake(g, sizeVal) {
  const angleD = sizeVal; // degrees to branch rotate
  for (let i = 0; i < 360; i += sym) {
    g.push();
    g.rotate(i);
    branch(g, 50, angleD);
    g.pop();
  }
}

function branch(g, br, angleD) {
  g.line(0, 0, 0, -br);
  g.translate(0, -br);
  if (br > 12) {
    g.push();
    g.rotate(angleD);
    branch(g, br * 0.7, angleD);
    g.pop();

    g.push();
    g.rotate(-angleD);
    branch(g, br * 0.7, angleD);
    g.pop();

    g.push();
    g.rotate(-angleD);
    branch(g, br * 0.7, angleD);
    g.pop();
  }
}

function tessellate(n) {
  push();
  for (let i = 0; i < n; i++) {
    push();
    scale(1 / pixelDensity());
    drawingContext.drawImage(
      hex.elt,
      -100 * pixelDensity(),
      -100 * pixelDensity()
    );
    pop();
    translate(h * 2, 0);
  }

  pop();
}

function keyPressed() {
  if (key == " ") {
    save("mySketch.png");
  }
}
