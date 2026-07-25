const { Jimp } = require('jimp');

async function cropImages() {
    try {
        const garima = await Jimp.read('public/team/garima.jpeg');
        garima.crop({ x: 0, y: 450, w: 720, h: 720 }).write('public/team/garima.jpeg');

        const pankaj = await Jimp.read('public/team/pankaj.jpeg');
        pankaj.crop({ x: 0, y: 450, w: 720, h: 720 }).write('public/team/pankaj.jpeg');

        const tariq = await Jimp.read('public/team/tariq.jpeg');
        tariq.crop({ x: 110, y: 300, w: 500, h: 500 }).write('public/team/tariq.jpeg');

        const kulwinder = await Jimp.read('public/team/kulwinder.jpeg');
        kulwinder.crop({ x: 0, y: 100, w: 439, h: 439 }).write('public/team/kulwinder.jpeg');

        const humaira = await Jimp.read('public/team/humaira.jpeg');
        humaira.crop({ x: 0, y: 160, w: 960, h: 960 }).write('public/team/humaira.jpeg');

        console.log('All images cropped successfully!');
    } catch (e) {
        console.error(e);
    }
}
cropImages();
