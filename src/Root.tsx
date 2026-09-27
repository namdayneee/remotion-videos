import {Composition} from "remotion";
import {ClientServerExplainer} from "./ClientServerExplainer";
import {DockerExplainer} from "./DockerExplainer";
import {WebVisitExplainer} from "./WebVisitExplainer";
import {DURATION as CLIENT_SERVER_DURATION} from "./data/clientServerSteps";
import {DURATION} from "./data/dockerSteps";
import {DURATION as WEB_VISIT_DURATION} from "./data/webVisitSteps";

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
        id="ClientServerExplainer"
        component={ClientServerExplainer}
        durationInFrames={CLIENT_SERVER_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="WebVisitExplainer"
        component={WebVisitExplainer}
        durationInFrames={WEB_VISIT_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
