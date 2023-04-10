import { useEffect, useRef, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const imageDefinition = 10;
const cellSize = 25;
const canvasSize = imageDefinition * cellSize;

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageData, setImageData] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.canvas.width = canvasSize;
        ctx.canvas.height = canvasSize;
      }
    }
  }, [canvasRef]);

  useEffect(() => {
    if (canvasRef && canvasRef.current && imageData) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const image = new Image();
        image.onload = () => {
          let canvasWidth = canvasSize;
          let canvasHeight = canvasSize;
          if (image.height > image.width) {
            canvasWidth = image.width * (canvasSize / image.height);
          } else if (image.width > image.height) {
            canvasHeight = image.height * (canvasSize / image.width);
          }
          ctx.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            canvasWidth,
            canvasHeight
          );
        };
        image.src = imageData as string;
      }
    }
  }, [imageData]);

  return (
    <Main
      meta={<Meta title="The NFT Factory" description="Work in progress." />}
    >
      <h1>The NFT Factory</h1>
      <canvas ref={canvasRef} />
      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        multiple={false}
        onChange={(event) => {
          const { files } = event.target;
          if (files && files.length > 0) {
            const file = files[0] as File;
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              setImageData(reader.result);
            });
            reader.readAsDataURL(file);
          }
        }}
      ></input>
    </Main>
  );
};

export default Index;
