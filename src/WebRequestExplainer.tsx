import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Arrow,
  Box,
  Caption,
  COLORS,
  PacketTrip,
  Page,
  SceneTitle,
} from "./components";

// Sân khấu: client bên trái, server bên phải,
// gói tin chạy trên đường nối ở giữa.
const Stage = ({
  left,
  right,
  connected = false,
  children,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  connected?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div style={{display: "flex", alignItems: "center", width: 1440}}>
      {left}

      <div style={{position: "relative", flex: 1, height: 160}}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 62,
            height: 6,
            borderRadius: 3,
            backgroundColor: connected ? COLORS.green : COLORS.panel2,
          }}
        />
        {children}
      </div>

      {right}
    </div>
  );
};

// Cửa sổ trình duyệt đơn giản: thanh địa chỉ + vùng nội dung.
const BrowserWindow = ({
  url,
  body,
}: {
  url: string;
  body?: React.ReactNode;
}) => {
  return (
    <div
      style={{
        width: 780,
        borderRadius: 18,
        border: "2px solid #3f3f46",
        backgroundColor: COLORS.panel,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 18px",
          backgroundColor: COLORS.panel2,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: "#f87171",
          }}
        />
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: COLORS.yellow,
          }}
        />
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: COLORS.green,
          }}
        />

        <div
          style={{
            flex: 1,
            marginLeft: 10,
            padding: "8px 16px",
            borderRadius: 10,
            backgroundColor: COLORS.background,
            fontFamily: "monospace",
            fontSize: 24,
            color: COLORS.green,
          }}
        >
          {url}
        </div>
      </div>

      <div
        style={{
          minHeight: 320,
          padding: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {body}
      </div>
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
          Web hoạt động thế nào?
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 36,
            color: COLORS.muted,
          }}
        >
          Hành trình từ máy client đến máy server
        </div>
      </div>
    </Page>
  );
};

const URL_TEXT = "https://example.com";

const UrlScene = () => {
  const frame = useCurrentFrame();

  // Hiệu ứng gõ chữ trong thanh địa chỉ
  const typed = Math.floor(
    interpolate(
      frame,
      [15, 15 + URL_TEXT.length * 3],
      [0, URL_TEXT.length],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    ),
  );

  const questionOpacity = interpolate(frame, [95, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Page>
      <SceneTitle>1. Gõ địa chỉ web</SceneTitle>

      <BrowserWindow
        url={URL_TEXT.slice(0, typed)}
        body={
          <div
            style={{
              opacity: questionOpacity,
              fontSize: 30,
              color: COLORS.muted,
              textAlign: "center",
            }}
          >
            example.com nằm ở đâu trên Internet?
          </div>
        }
      />

      <Caption>Browser chưa biết server nằm ở đâu — cần địa chỉ IP</Caption>
    </Page>
  );
};

const DnsScene = () => {
  const frame = useCurrentFrame();

  const request = interpolate(frame, [15, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const response = interpolate(frame, [90, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dnsActive = frame >= 65 && frame < 95;

  return (
    <Page>
      <SceneTitle>2. Hỏi DNS để tìm địa chỉ IP</SceneTitle>

      <Stage
        left={<Box title="Browser" subtitle="Máy client" />}
        right={
          <Box
            title="DNS Server"
            subtitle="Danh bạ Internet"
            highlight={dnsActive}
          />
        }
      >
        <PacketTrip progress={request} label="example.com?" />
        <PacketTrip
          progress={response}
          label="IP: 93.184.216.34"
          reverse
          color={COLORS.green}
        />
      </Stage>

      <Caption>DNS đổi tên miền thành địa chỉ IP của server</Caption>
    </Page>
  );
};

const TcpScene = () => {
  const frame = useCurrentFrame();

  const syn = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const synAck = interpolate(frame, [55, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ack = interpolate(frame, [100, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const connected = frame >= 135;

  return (
    <Page>
      <SceneTitle>3. Bắt tay TCP</SceneTitle>

      <Stage
        left={<Box title="Browser" subtitle="Máy client" />}
        right={
          <Box
            title="Server"
            subtitle="Cổng 443 (HTTPS)"
            highlight={connected}
          />
        }
        connected={connected}
      >
        <PacketTrip progress={syn} label="SYN" />
        <PacketTrip
          progress={synAck}
          label="SYN-ACK"
          reverse
          color={COLORS.yellow}
        />
        <PacketTrip progress={ack} label="ACK" />
      </Stage>

      <Caption>Ba bước để mở một kết nối tin cậy giữa hai máy</Caption>
    </Page>
  );
};

const HttpScene = () => {
  const frame = useCurrentFrame();

  const request = interpolate(frame, [25, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const serverActive = frame >= 90;

  const detailOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Page>
      <SceneTitle>4. Gửi HTTP Request</SceneTitle>

      <Stage
        left={<Box title="Browser" subtitle="Máy client" />}
        right={
          <Box title="Server" subtitle="Cổng 443" highlight={serverActive} />
        }
      >
        <PacketTrip progress={request} label="GET / HTTP/1.1" />
      </Stage>

      <div
        style={{
          opacity: detailOpacity,
          marginTop: 10,
          padding: "18px 40px",
          borderRadius: 12,
          backgroundColor: "#111827",
          fontFamily: "monospace",
          fontSize: 26,
          color: COLORS.green,
          textAlign: "left",
        }}
      >
        GET / HTTP/1.1
        <br />
        Host: example.com
      </div>

      <Caption>Request gồm method, đường dẫn và headers</Caption>
    </Page>
  );
};

const ServerProcessScene = () => {
  const frame = useCurrentFrame();

  const appear = (start: number) =>
    interpolate(frame, [start, start + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <Page>
      <SceneTitle>5. Server xử lý request</SceneTitle>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{opacity: appear(5)}}>
          <Box title="Web Server" subtitle="Nhận request ở cổng 443" />
        </div>

        {frame >= 35 ? <Arrow /> : null}

        <div style={{opacity: appear(35)}}>
          <Box title="Ứng dụng backend" subtitle="Xử lý logic, đọc dữ liệu" />
        </div>

        {frame >= 80 ? <Arrow /> : null}

        <div style={{opacity: appear(80)}}>
          <Box title="Trang HTML" subtitle="Nội dung sẽ trả về" highlight />
        </div>
      </div>

      <Caption>Bên trong máy server</Caption>
    </Page>
  );
};

const ResponseScene = () => {
  const frame = useCurrentFrame();

  const response = interpolate(frame, [20, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pageOpacity = interpolate(frame, [95, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Page>
      <SceneTitle>6. HTML quay về client</SceneTitle>

      <Stage
        left={
          <Box
            title="Browser"
            subtitle="Máy client"
            highlight={frame >= 95}
          />
        }
        right={<Box title="Server" subtitle="Cổng 443" />}
      >
        <PacketTrip
          progress={response}
          label="200 OK • HTML"
          reverse
          color={COLORS.green}
        />
      </Stage>

      <div
        style={{
          opacity: pageOpacity,
          marginTop: 10,
          width: 380,
          padding: 22,
          borderRadius: 14,
          backgroundColor: "#fafafa",
        }}
      >
        <div
          style={{
            height: 18,
            width: "60%",
            borderRadius: 6,
            backgroundColor: COLORS.blue,
            marginBottom: 14,
          }}
        />
        <div
          style={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#d4d4d8",
            marginBottom: 8,
          }}
        />
        <div
          style={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#d4d4d8",
            marginBottom: 8,
          }}
        />
        <div
          style={{
            height: 10,
            width: "70%",
            borderRadius: 5,
            backgroundColor: "#d4d4d8",
          }}
        />
      </div>

      <Caption>Browser nhận HTML và vẽ thành trang web bạn thấy</Caption>
    </Page>
  );
};

const STEPS = [
  "Gõ địa chỉ web",
  "DNS tìm địa chỉ IP",
  "TCP bắt tay mở kết nối",
  "Browser gửi HTTP request",
  "Server xử lý, tạo HTML",
  "HTML quay về — trang hiện lên",
];

const MentalModel = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <Page>
      <SceneTitle>Mô hình ghi nhớ</SceneTitle>

      <div
        style={{
          opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {STEPS.map((step, i) => {
          const stepOpacity = interpolate(
            frame,
            [10 + i * 14, 22 + i * 14],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );

          const isLast = i === STEPS.length - 1;

          return (
            <div
              key={step}
              style={{
                opacity: stepOpacity,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {i > 0 ? (
                <div
                  style={{
                    color: COLORS.blue,
                    fontSize: 26,
                    margin: "2px 0",
                  }}
                >
                  ↓
                </div>
              ) : null}

              <div
                style={{
                  padding: "10px 30px",
                  borderRadius: 12,
                  border: `2px solid ${isLast ? COLORS.green : "#3f3f46"}`,
                  backgroundColor: COLORS.panel,
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>

      <Caption>Client hỏi — Server trả lời, tất cả trao đổi qua HTTP</Caption>
    </Page>
  );
};

export const WebRequestExplainer = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={75}>
        <Intro />
      </Sequence>

      <Sequence from={75} durationInFrames={150}>
        <UrlScene />
      </Sequence>

      <Sequence from={225} durationInFrames={165}>
        <DnsScene />
      </Sequence>

      <Sequence from={390} durationInFrames={150}>
        <TcpScene />
      </Sequence>

      <Sequence from={540} durationInFrames={165}>
        <HttpScene />
      </Sequence>

      <Sequence from={705} durationInFrames={165}>
        <ServerProcessScene />
      </Sequence>

      <Sequence from={870} durationInFrames={165}>
        <ResponseScene />
      </Sequence>

      <Sequence from={1035} durationInFrames={165}>
        <MentalModel />
      </Sequence>
    </AbsoluteFill>
  );
};