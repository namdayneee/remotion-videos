import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  clientServerSteps,
  DURATION,
  FRAMES_PER_STEP,
  getStepFromFrame,
} from './data/clientServerSteps';
import {theme} from './theme/tokens';

// --- Sub-components ---

const MachineBox = ({
  label,
  sub,
  active,
  x,
  y,
  frame,
  fps,
}: {
  label: string;
  sub: string;
  active: boolean;
  x: number;
  y: number;
  frame: number;
  fps: number;
}) => {
  const p = spring({frame, fps, config: {damping: 18, stiffness: 140}});
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 320,
        padding: '22px 16px',
        borderRadius: 18,
        background: active ? '#103d50' : theme.raised,
        border: `2px solid ${active ? theme.cyan : theme.border}`,
        boxShadow: active ? `0 0 26px ${theme.cyan}44` : undefined,
        transform: `scale(${0.85 + 0.15 * p})`,
        opacity: p,
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 30, fontWeight: 800, color: active ? theme.text : theme.muted}}>
        {label}
      </div>
      <div style={{fontSize: 18, marginTop: 6, color: theme.dim, fontFamily: theme.mono}}>
        {sub}
      </div>
    </div>
  );
};

const PacketDot = ({
  progress,
  color,
  x,
  yStart,
  yEnd,
}: {
  progress: number;
  color: string;
  x: number;
  yStart: number;
  yEnd: number;
}) => {
  if (progress <= 0 || progress >= 1) return null;
  const y = yStart + (yEnd - yStart) * progress;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - 10,
        top: y - 10,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 14px ${color}`,
      }}
    />
  );
};

const ConnectionLine = ({
  x,
  yTop,
  yBottom,
  connected,
}: {
  x: number;
  yTop: number;
  yBottom: number;
  connected: boolean;
}) => (
  <div
    style={{
      position: 'absolute',
      left: x - 2,
      top: yTop,
      width: 4,
      height: yBottom - yTop,
      borderRadius: 2,
      background: connected ? theme.green : theme.border,
    }}
  />
);

const HandshakeStep = ({
  label,
  direction,
  y,
  visible,
  frame,
  fps,
}: {
  label: string;
  direction: 'right' | 'left';
  y: number;
  visible: boolean;
  frame: number;
  fps: number;
}) => {
  if (!visible) return null;
  const p = spring({frame, fps, config: {damping: 16, stiffness: 180}});
  const arrow = direction === 'right' ? '→' : '←';
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: p,
        transform: `translateX(${direction === 'right' ? -30 + 30 * p : 30 - 30 * p}px)`,
      }}
    >
      <span
        style={{
          fontFamily: theme.mono,
          fontSize: 24,
          color: theme.cyan,
          background: theme.raised,
          padding: '6px 14px',
          borderRadius: 10,
          border: `1px solid ${theme.border}`,
        }}
      >
        {arrow} {label} {arrow}
      </span>
    </div>
  );
};

const HttpRequestCard = ({
  visible,
  frame,
  fps,
}: {
  visible: boolean;
  frame: number;
  fps: number;
}) => {
  if (!visible) return null;
  const p = spring({frame, fps, config: {damping: 18, stiffness: 150}});
  return (
    <div
      style={{
        position: 'absolute',
        top: 620,
        left: 80,
        right: 80,
        background: theme.panel,
        border: `2px solid ${theme.cyan}`,
        borderRadius: 16,
        padding: '20px 24px',
        fontFamily: theme.mono,
        fontSize: 22,
        lineHeight: 1.6,
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px)`,
      }}
    >
      <div style={{color: theme.cyan, fontWeight: 800}}>GET /api/users HTTP/1.1</div>
      <div style={{color: theme.muted}}>Host: example.com</div>
      <div style={{color: theme.muted}}>Content-Type: application/json</div>
    </div>
  );
};

const HttpResponseCard = ({
  visible,
  frame,
  fps,
}: {
  visible: boolean;
  frame: number;
  fps: number;
}) => {
  if (!visible) return null;
  const p = spring({frame, fps, config: {damping: 18, stiffness: 150}});
  return (
    <div
      style={{
        position: 'absolute',
        top: 620,
        left: 80,
        right: 80,
        background: theme.panel,
        border: `2px solid ${theme.green}`,
        borderRadius: 16,
        padding: '20px 24px',
        fontFamily: theme.mono,
        fontSize: 22,
        lineHeight: 1.6,
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px)`,
      }}
    >
      <div style={{color: theme.green, fontWeight: 800}}>HTTP/1.1 200 OK</div>
      <div style={{color: theme.muted}}>Content-Type: application/json</div>
      <div style={{color: theme.muted}}>{'{"users": [...]}'}</div>
    </div>
  );
};

const MentalModel = ({visible, frame, fps}: {visible: boolean; frame: number; fps: number}) => {
  if (!visible) return null;
  const p = spring({frame, fps, config: {damping: 20, stiffness: 120}});
  return (
    <div
      style={{
        position: 'absolute',
        top: 560,
        left: 60,
        right: 60,
        textAlign: 'center',
        opacity: p,
        transform: `scale(${0.9 + 0.1 * p})`,
      }}
    >
      <div
        style={{
          background: theme.panel,
          border: `2px solid ${theme.cyan}`,
          borderRadius: 20,
          padding: '36px 30px',
          fontFamily: theme.mono,
          fontSize: 28,
          lineHeight: 2,
        }}
      >
        <div style={{color: theme.text}}>Client</div>
        <div style={{color: theme.cyan}}>↓ Request (HTTP)</div>
        <div style={{color: theme.text}}>Server</div>
        <div style={{color: theme.green}}>↑ Response (HTTP)</div>
        <div style={{color: theme.text}}>Client</div>
      </div>
      <div style={{marginTop: 24, color: theme.muted, fontSize: 24, fontWeight: 600}}>
        Mỗi tương tác = 1 cặp Request / Response
      </div>
    </div>
  );
};

// --- Main Composition ---

export const ClientServerExplainer = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const activeStep = getStepFromFrame(frame);
  const local = frame - activeStep * FRAMES_PER_STEP;
  const captionOpacity = interpolate(
    local,
    [0, 14, FRAMES_PER_STEP - 14, FRAMES_PER_STEP],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const connected = activeStep >= 2;
  const showRequest = activeStep === 3 || activeStep === 4;
  const showResponse = activeStep === 5;
  const showMental = activeStep === 6;

  // Packet animation for request step
  const requestProgress =
    activeStep === 3 ? interpolate(local, [20, FRAMES_PER_STEP - 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  // Packet animation for response step
  const responseProgress =
    activeStep === 5 ? interpolate(local, [20, FRAMES_PER_STEP - 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;

  const centerX = 540;
  const clientY = 320;
  const serverY = 1350;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 30%, #0a2a3d 0%, ${theme.bg} 55%)`,
        color: theme.text,
        fontFamily: theme.sans,
        padding: '90px 50px 70px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header style={{height: 200, marginBottom: 10}}>
        <div
          style={{
            fontFamily: theme.mono,
            fontSize: 20,
            color: theme.cyan,
            fontWeight: 800,
            letterSpacing: 4,
          }}
        >
          VISUAL SYSTEMS / 002
        </div>
        <h1 style={{fontSize: 68, lineHeight: 1.1, letterSpacing: -2, margin: '20px 0 10px'}}>
          Client <span style={{color: theme.cyan}}>↔</span> Server
        </h1>
        <div style={{color: theme.muted, fontSize: 26}}>
          Gửi thông tin cho nhau như thế nào?
        </div>
      </header>

      {/* Stage area */}
      <div style={{position: 'relative', flex: 1}}>
        {/* Connection line */}
        <ConnectionLine x={centerX} yTop={clientY + 90} yBottom={serverY} connected={connected} />

        {/* Client */}
        <MachineBox
          label="Client"
          sub="Browser / App"
          active={activeStep === 0 || activeStep === 3}
          x={centerX - 160}
          y={clientY}
          frame={frame}
          fps={fps}
        />

        {/* Server */}
        <MachineBox
          label="Server"
          sub="192.168.1.10 : 8080"
          active={activeStep === 0 || activeStep === 1 || activeStep === 4 || activeStep === 5}
          x={centerX - 160}
          y={serverY}
          frame={Math.max(0, frame - 15)}
          fps={fps}
        />

        {/* Address label */}
        {activeStep === 1 && (
          <div
            style={{
              position: 'absolute',
              top: serverY - 50,
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: theme.mono,
                fontSize: 26,
                color: theme.green,
                background: theme.raised,
                padding: '8px 18px',
                borderRadius: 12,
                border: `1px solid ${theme.green}`,
              }}
            >
              IP : Port = địa chỉ + cổng
            </span>
          </div>
        )}

        {/* Handshake labels */}
        {activeStep === 2 && (
          <>
            <HandshakeStep label="SYN" direction="right" y={560} visible={local > 10} frame={local - 10} fps={fps} />
            <HandshakeStep label="SYN-ACK" direction="left" y={680} visible={local > 40} frame={local - 40} fps={fps} />
            <HandshakeStep label="ACK" direction="right" y={800} visible={local > 70} frame={local - 70} fps={fps} />
          </>
        )}

        {/* Request packet */}
        <PacketDot
          progress={requestProgress}
          color={theme.cyan}
          x={centerX}
          yStart={clientY + 100}
          yEnd={serverY - 10}
        />

        {/* Response packet */}
        <PacketDot
          progress={responseProgress}
          color={theme.green}
          x={centerX}
          yStart={serverY - 10}
          yEnd={clientY + 100}
        />

        {/* Request card */}
        <HttpRequestCard visible={showRequest} frame={local} fps={fps} />

        {/* Response card */}
        <HttpResponseCard visible={showResponse} frame={local} fps={fps} />

        {/* Mental model */}
        <MentalModel visible={showMental} frame={local} fps={fps} />

        {/* Processing indicator */}
        {activeStep === 4 && (
          <div
            style={{
              position: 'absolute',
              top: serverY - 60,
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: theme.mono,
                fontSize: 22,
                color: theme.cyan,
                background: theme.raised,
                padding: '8px 16px',
                borderRadius: 10,
                border: `1px solid ${theme.cyan}`,
              }}
            >
              ⚙ Đang xử lý request...
            </span>
          </div>
        )}
      </div>

      {/* Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 70,
          left: 50,
          right: 50,
          minHeight: 100,
          padding: '22px 26px',
          boxSizing: 'border-box',
          borderLeft: `5px solid ${theme.cyan}`,
          background: '#0b1c29',
          borderRadius: 12,
          opacity: captionOpacity,
          fontSize: 26,
          lineHeight: 1.35,
          fontWeight: 600,
        }}
      >
        {clientServerSteps[activeStep].caption}
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 6,
          width: `${((frame + 1) / DURATION) * 100}%`,
          background: theme.cyan,
          boxShadow: `0 0 18px ${theme.cyan}`,
        }}
      />

      {/* Step indicator */}
      <div
        style={{
          position: 'absolute',
          top: 90,
          right: 50,
          fontFamily: theme.mono,
          fontSize: 18,
          color: theme.dim,
        }}
      >
        {String(activeStep + 1).padStart(2, '0')} / {clientServerSteps.length}
      </div>
    </AbsoluteFill>
  );
};
