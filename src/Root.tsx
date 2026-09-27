import {Composition} from "remotion";
import {DockerExplainer} from "./DockerExplainer";
import {WebRequestExplainer} from "./WebRequestExplainer";
import {DURATION} from "./data/dockerSteps";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="DockerExplainer"
        component={DockerExplainer}
        durationInFrames={DURATION}
        fps={30}
        width={1080}
        height={1920}
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
