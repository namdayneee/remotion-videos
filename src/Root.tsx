import {Composition} from "remotion";
import {DockerExplainer} from "./DockerExplainer";
import {WebRequestExplainer} from "./WebRequestExplainer";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="DockerExplainer"
        component={DockerExplainer}
        durationInFrames={990}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="WebRequestExplainer"
        component={WebRequestExplainer}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};