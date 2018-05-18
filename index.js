const log = console.log;
const app = new PIXI.Application(2600, 2600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);
const image = PIXI.Sprite.fromImage('./img/dmaps/512x512/clouds.jpg');
image.interactive = true;
image.buttonMode = true;
image.anchor.set(0.5);
image.x = 100;
image.y = 100;
app.stage.addChild(image);

image.on('pointerdown', () => {
    log("Yoooo");
});

const onDragStart = event => {
    image.data = event.data;
    image.dragging = true;
};
const onDragEnd = event => {
    delete image.data;
    image.dragging = false;
};
const onDragMove = event => {
    if(image.dragging === true)
    {
        const newPostion = image.data.getLocalPosition(image.parent);
        image.x = newPostion.x;
        image.y = newPostion.y;
    }
};


image.on('pointerdown', onDragStart)
.on('pointerup', onDragEnd)
.on('pointerupoutside', onDragEnd)
.on('pointermove', onDragMove);

app.ticker.add((delta)=> {
    if(image.dragging === true) {
        image.rotation += 0.1 * delta;
    }
})