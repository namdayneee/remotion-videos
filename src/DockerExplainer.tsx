import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const COLORS = {
  background: "#09090b",
  panel: "#18181b",
  panel2: "#27272a",
  text: "#fafafa",
  muted: "#a1a1aa",
  blue: "#38bdf8",
  green: "#4ade80",
  yellow: "#facc15",
};

const Page = ({children}: {children: React.ReactNode}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        color: COLORS.text,
        fontFamily: "Arial, sans-serif",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const Box = ({
  title,
  subtitle,
  highlight = false,
}: {
  title: string;
  subtitle?: string;
  highlight?: boolean;
}) => {
  return (
    <div
      style={{
        width: 360,
        minHeight: 100,
        padding: "24px 30px",
        borderRadius: 18,
        border: `2px solid ${highlight ? COLORS.blue : "#3f3f46"}`,
        backgroundColor: COLORS.panel,
        boxShadow: highlight
          ? "0 0 40px rgba(56, 189, 248, 0.2)"
          : undefined,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
        }}
      >
        {title}
      </div>

      {subtitle ? (
        <div
          style={{
            marginTop: 10,
            color: COLORS.muted,
            fontSize: 22,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

const Arrow = () => {
  return (
    <div
      style={{
        fontSize: 48,
        color: COLORS.blue,
        margin: "16px 0",
      }}
    >
      ↓
    </div>
  );
};

const SceneTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 42,
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
};

const Intro = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    from: 0.7,
    to: 1,
    config: {
      damping: 12,
    },
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <Page>
      <div
        style={{
          textAlign: "center",
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <div
          style={{
            fontSize: 86,
            fontWeight: 800,
          }}
        >
          Docker
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 36,
            color: COLORS.muted,
          }}
        >
          Hoạt động như thế nào?
        </div>
      </div>
    </Page>
  );
};

const BuildScene = () => {
  const frame = useCurrentFrame();

  const visible1 = frame >= 0;
  const visible2 = frame >= 30;
  const visible3 = frame >= 60;
  const visible4 = frame >= 100;

  return (
    <Page>
      <SceneTitle>1. Tạo Docker Image</SceneTitle>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {visible1 && (
          <Box
            title="Source Code"
            subtitle="Ứng dụng của bạn"
          />
        )}

        {visible2 && (
          <>
            <Arrow />
            <Box
              title="Dockerfile"
              subtitle="Công thức đóng gói"
            />
          </>
        )}

        {visible3 && (
          <>
            <Arrow />

            <div
              style={{
                padding: "18px 40px",
                borderRadius: 12,
                backgroundColor: "#111827",
                fontFamily: "monospace",
                fontSize: 27,
                color: COLORS.green,
              }}
            >
              $ docker build .
            </div>
          </>
        )}

        {visible4 && (
          <>
            <Arrow />

            <Box
              title="Docker Image"
              subtitle="Ứng dụng + dependencies"
              highlight
            />
          </>
        )}
      </div>
    </Page>
  );
};

const RunScene = () => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [0, 100],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <Page>
      <SceneTitle>2. Chạy Image</SceneTitle>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 50,
        }}
      >
        <Box
          title="Docker Image"
          subtitle="read-only template"
        />

        <div
          style={{
            width: 260,
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 24,
              color: COLORS.green,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            docker run
          </div>

          <div
            style={{
              height: 8,
              backgroundColor: COLORS.panel2,
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress * 100}%`,
                height: "100%",
                backgroundColor: COLORS.blue,
              }}
            />
          </div>

          <div
            style={{
              textAlign: "center",
              color: COLORS.blue,
              fontSize: 40,
              marginTop: 10,
            }}
          >
            →
          </div>
        </div>

        <Box
          title="Container"
          subtitle="Image đang chạy"
          highlight
        />
      </div>
    </Page>
  );
};

const ContainerScene = () => {
  const frame = useCurrentFrame();

  const appear = (start: number) =>
    interpolate(frame, [start, start + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <Page>
      <SceneTitle>3. Bên trong Container</SceneTitle>

      <div
        style={{
          width: 720,
          padding: 35,
          borderRadius: 30,
          border: `3px solid ${COLORS.blue}`,
          backgroundColor: COLORS.panel,
        }}
      >
        <div
          style={{
            fontSize: 35,
            fontWeight: 700,
            marginBottom: 30,
            color: COLORS.blue,
          }}
        >
          Docker Container
        </div>

        <div
          style={{
            display: "grid",
            gap: 20,
          }}
        >
          <div
            style={{
              opacity: appear(10),
            }}
          >
            <Box title="Application" />
          </div>

          <div
            style={{
              opacity: appear(35),
            }}
          >
            <Box title="Runtime" />
          </div>

          <div
            style={{
              opacity: appear(60),
            }}
          >
            <Box title="Dependencies" />
          </div>
        </div>
      </div>
    </Page>
  );
};

const KernelScene = () => {
  const frame = useCurrentFrame();

  const y = interpolate(frame, [0, 50], [-30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <Page>
      <SceneTitle>4. Container không có Kernel riêng</SceneTitle>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translateY(${y}px)`,
        }}
      >
        <Box
          title="Container"
          subtitle="App + Runtime + Dependencies"
          highlight
        />

        <Arrow />

        <Box
          title="Docker Engine"
          subtitle="Quản lý containers"
        />

        <Arrow />

        <Box
          title="Host OS / Kernel"
          subtitle="Được các container chia sẻ"
        />

        <Arrow />

        <Box
          title="Hardware"
          subtitle="CPU • RAM • Disk • Network"
        />
      </div>
    </Page>
  );
};

const MultiContainerScene = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <Page>
      <SceneTitle>5. Nhiều container cùng chạy</SceneTitle>

      <div
        style={{
          opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 30,
          }}
        >
          <Box title="Container A" />
          <Box title="Container B" />
          <Box title="Container C" />
        </div>

        <div
          style={{
            fontSize: 50,
            color: COLORS.blue,
          }}
        >
          ↘ &nbsp;&nbsp; ↓ &nbsp;&nbsp; ↙
        </div>

        <Box
          title="Host Kernel"
          subtitle="Được chia sẻ"
          highlight
        />

        <div
          style={{
            marginTop: 35,
            color: COLORS.muted,
            fontSize: 28,
          }}
        >
          Container nhẹ hơn Virtual Machine vì không cần một OS đầy đủ riêng.
        </div>
      </div>
    </Page>
  );
};

const Outro = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <Page>
      <div
        style={{
          opacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
          }}
        >
          Docker
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 35,
            color: COLORS.muted,
          }}
        >
          Image = khuôn
        </div>

        <div
          style={{
            marginTop: 15,
            fontSize: 35,
            color: COLORS.muted,
          }}
        >
          Container = instance đang chạy
        </div>

        <div
          style={{
            marginTop: 15,
            fontSize: 35,
            color: COLORS.blue,
          }}
        >
          Containers chia sẻ Kernel của Host
        </div>
      </div>
    </Page>
  );
};

export const DockerExplainer = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <Intro />
      </Sequence>

      <Sequence from={90} durationInFrames={180}>
        <BuildScene />
      </Sequence>

      <Sequence from={270} durationInFrames={150}>
        <RunScene />
      </Sequence>

      <Sequence from={420} durationInFrames={150}>
        <ContainerScene />
      </Sequence>

      <Sequence from={570} durationInFrames={180}>
        <KernelScene />
      </Sequence>

      <Sequence from={750} durationInFrames={150}>
        <MultiContainerScene />
      </Sequence>

      <Sequence from={900} durationInFrames={90}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};