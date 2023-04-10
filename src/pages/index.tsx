import { useEffect, useRef, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageData, setImageData] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current && imageData) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const image = new Image();
        image.onload = () => {
          ctx.drawImage(image, 0, 0);
        };
        image.src = imageData as string;
      }
    }
  }, [imageData, canvasRef]);

  return (
    <Main
      meta={<Meta title="The NFT Factory" description="Work in progress." />}
    >
      <h1 className="h-[1000px]">The NFT Factory</h1>
      <canvas ref={canvasRef} className="h-1 w-1" />
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
