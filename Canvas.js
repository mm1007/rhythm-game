let note_lane = [0, 120, 240, 360];

let note_list = [];

function setup() {
    time = 0;
    let Canvas = createCanvas(960, 540);
    v1 = new vec2(0, 25);
    v2 = new vec2(50, 0);
    v3 = new vec2(100, 25);
    v4 = new vec2(50, 50);
    note = new createQuad(v1, v2, v3, v4);

    note_list.push({ note: note, pos: 100, lane: 0 });

    setInterval(note_fall, 1);
}

function draw() {
    background("#FFF");

    note_list.forEach(function (note_data) {
        note_data.note.Quad(note_lane[note_data.lane], time - note_data.pos);
    })
}

function note_fall() {
    time += 2;
}

