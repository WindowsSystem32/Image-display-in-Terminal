const getPixels: any = require("get-pixels");
const i: number = 255;
const sT: number = Date.now();
let itv: NodeJS.Timeout;
const blinkRate: number = 1500;
const config: {list: Array<string>, index: number, xM: number, yM: number} = require("./config.js");
getPixels(config.list[config.index], (err: any, pixels: any) => {
  if (err) {
    console.error(err);
    return;
  }
  const datas: Array<number> = pixels.data;
  const baseColor: Array<number> = [255, 255, 255];
  const shape: Array<number> = pixels.shape;
  const frameCount: number = (shape.length == 4? shape[0] : 1);
  const offset = +(shape.length == 4);
  const width: number = shape[offset];
  const height: number = shape[offset + 1];
  const channels: number = shape[offset + 2];
  const area: number = width * height;
  const xM: number = config.xM;
  const yM: number = config.yM;
  let frames: Array<string> = [];
  //shape[2] = 3;
  //console.log(JSON.stringify(pixels, null, 2));
  //console.log(Object.keys(pixels.data).join(",\n"));
  for (let f: number = 0; f < frameCount; f++) {
    let texts: Array<Array<string>> = [];
    for (let y: number = 0; y + yM <= height; y += yM) {
      texts.push([]);
      const yR = Math.round(y);
      const yRR = Math.round(y / yM);
      for (let x: number = 0; x + xM <= width; x += xM) {
        const xR = Math.round(x);
        const xRR = Math.round(x / xM)
        const index: number = (f * width * height + yR * width + xR) * channels;
        let pixel: string = "뷁";
        const mix = (r: number, g: number, b: number, a: number) => 
          
          "\x1b[48;2;" + 
          (r * a + baseColor[0] * (1 - a)) + ";" + 
          (g * a + baseColor[1] * (1 - a)) + ";" + 
          (b * a + baseColor[2] * (1 - a)) + "m" + 
          
          "\x1b[38;2;" + 
          (r * a + baseColor[0] * (1 - a)) + ";" + 
          (g * a + baseColor[1] * (1 - a)) + ";" + 
          (b * a + baseColor[2] * (1 - a)) + "m"  + pixel;
        switch (channels) {
          case 1:
            pixel = mix(datas[index], datas[index], datas[index], 1);
            break;
          case 2:
            pixel = mix(datas[index], datas[index], datas[index], datas[index + 1] / 255);
            break;
          case 3:
            pixel = mix(datas[index], datas[index + 1], datas[index + 2], 1);
            break;
          case 4:
            pixel = mix(datas[index], datas[index + 1], datas[index + 2], datas[index + 3] / 255);
            break;
        }
        texts[yRR].push(pixel);
      }
    }
    frames.push("\x1b[0m" + texts.map(e=>e.join("")).join("\x1b[0m\n") + "\x1b[0m");
  }
  let i = 0;
  console.log(frames[i]);
  /*
  setInterval(() => {
    console.clear();
    console.log(frames[i]);
    i++;
    if (i == frameCount) i = 0;
  }, 10);
  */
});
//console.log(`\x1b[0mForeground: \x1b[38;2;${i};0;0mR\x1b[0m \x1b[38;2;0;${i};0mG\x1b[0m \x1b[38;2;0;0;${i}mB\x1b[0m\n\x1b[7mBackground\x1b[0m: \x1b[48;2;${i};0;0mR\x1b[0m \x1b[48;2;0;${i};0mG\x1b[0m \x1b[48;2;0;0;${i}mB\x1b[0m\ni: \x1b[48;2;${255-i};0;${i}m\x1b[38;2;0;255;0m${i}\x1b[0m`);
