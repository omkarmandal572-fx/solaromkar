import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { USE_TEXTURE_FILES } from "@/data/planets";

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
      ctx.fillStyle = palette[i % 3]!;
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
    ctx.fillStyle = palette[Math.floor(Math.random() * 3)]!;
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
    if (!USE_TEXTURE_FILES) return;
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

/**
 * Procedural ring texture (radial bands with alpha gaps), used until a real
 * ring image is supplied. Mapped across a ringGeometry's radial UVs.
 */
function makeRingTexture(color: string) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = 8;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, 8);
  let x = 0;
  while (x < size) {
    const band = 4 + Math.random() * 26;
    const alpha = Math.random() < 0.18 ? 0 : 0.25 + Math.random() * 0.7;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(x, 0, band, 8);
    x += band;
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/** Ring texture: procedural bands, swapped for a real file when available. */
export function useRingTexture(color: string, url?: string) {
  const base = useMemo(() => makeRingTexture(color), [color]);
  const [loaded, setLoaded] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!USE_TEXTURE_FILES || !url) return;
    let alive = true;
    new THREE.TextureLoader().load(
      url,
      (tex) => {
        if (!alive) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        setLoaded(tex);
      },
      undefined,
      () => {
        /* keep procedural rings */
      },
    );
    return () => {
      alive = false;
    };
  }, [url]);

  useEffect(() => () => base.dispose(), [base]);

  return loaded ?? base;
}

export { makeRingTexture };
