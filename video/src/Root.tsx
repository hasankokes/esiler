import { Composition } from "remotion";
import { EsilerHero, HERO_DURATION, HERO_FPS } from "./EsilerHero";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="EsilerHero"
      component={EsilerHero}
      durationInFrames={HERO_DURATION}
      fps={HERO_FPS}
      width={1080}
      height={1350}
    />
  );
};
