import { Jimp } from 'jimp';
import path from 'path';

async function convertTariq() {
  const inputPath = path.resolve('advocates/adv tareeq.png');
  const outputPath = path.resolve('public/team/tariq.jpeg');

  console.log('Loading new image for Tariq from:', inputPath);
  const image = await Jimp.read(inputPath);
  
  console.log('Converting to JPEG and saving to:', outputPath);
  await image.write(outputPath);
  
  console.log('Done!');
}

convertTariq().catch(console.error);
