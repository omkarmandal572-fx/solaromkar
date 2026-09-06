import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";

/**
 * Procedural banded/noisy texture used as the visual base for every body.
 * When you drop real photo textures into /public/textures they are loaded
 * on top of this and replace it automatically.
 */
function makeProceduralTexture(
  palette: [string, string, string],
  opts: { bands?: boolean; turbulence?: number } = {},
) {
  const { bands = true, turbulence = 26 } = opts;
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, palette[2]);
  grad.addColorStop(0.5, palette[0]);
  grad.addColorStop(1, palette[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  if (bands) {
    for (let i = 0; i < 34; i++) {
      const y = Math.random() * h;
      const bh = 4 + Math.random() * 26;
      ctx.globalAlpha = 0.12 + Math.random() * 0.3;
      ctx.fillStyle = [palette[0], palette[1], palette[2]][i % 3];
      ctx.beginPath();
      for (let x = 0; x <= w; x += 16) {
        const wobble = Math.sin((x / w) * Math.PI * (2 + (i % 4))) * 6;
        if (x === 0) ctx.moveTo(x, y + wobble);
        else ctx.lineTo(x, y + wobble);
      }
      ctx.lineTo(w, y + bh);
      for (let x = w; x >= 0; x -= 16) {
        ctx.lineTo(x, y + bh + Math.cos((x / w) * Math.PI * 3) * 5);
      }
      ctx.closePath();
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
  for (let i = 0; i < turbulence * 40; i++) {
    const r = 2 + Math.random() * 22;
    ctx.globalAlpha = 0.03 + Math.random() * 0.09;
    ctx.fillStyle = [palette[0], palette[1], palette[2]][
      Math.floor(Math.random() * 3)
    ];
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * h, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

type Paths = { map?: string; bumpMap?: string; roughnessMap?: string };

/**
 * Returns the procedural base texture immediately, then swaps in any real
 * texture files that actually exist. Missing files are ignored silently so a
 * placeholder path can never break the scene.
 */
export function usePlanetTextures(
  palette: [string, string, string],
  paths: Paths,
  opts?: { bands?: boolean; turbulence?: number },
) {
  const base = useMemo(
    () => makeProceduralTexture(palette, opts),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [palette.join(), opts?.bands, opts?.turbulence],
  );

  const [loaded, setLoaded] = useState<{
    map?: THREE.Texture;
    bumpMap?: THREE.Texture;
    roughnessMap?: THREE.Texture;
  }>({});

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let alive = true;
    const entries = Object.entries(paths) as [keyof Paths, string | undefined][];
    entries.forEach(([key, url]) => {
      if (!url) return;
      loader.load(
        url,
        (tex) => {
          if (!alive) return;
          if (key === "map") tex.colorSpace = THREE.SRGBColorSpace;
          setLoaded((prev) => ({ ...prev, [key]: tex }));
        },
        undefined,
        () => {
          /* placeholder path not provided yet — keep procedural look */
        },
      );
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paths.map, paths.bumpMap, paths.roughnessMap]);

  useEffect(() => () => base.dispose(), [base]);

  return {
    map: loaded.map ?? base,
    bumpMap: loaded.bumpMap,
    roughnessMap: loaded.roughnessMap,
  };
}

export { makeProceduralTexture };
