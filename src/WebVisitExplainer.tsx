import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Connection} from './components/Connection';
import {StepList} from './components/StepList';
import {
  DURATION,
  FRAMES_PER_STEP,
  getStepFromFrame,
  webVisitSteps,
} from './data/webVisitSteps';
import {theme} from './theme/tokens';

const STAGE_H = 1120;
const stepStart = (i: number) => i * FRAMES_PER_STEP;

// --- Sub-components ---

const NetNode = ({
  x,
  y,
  w,
  title,
  sub,
  active,
  frame,
  fps,
  children,
}: {
  x: number;
  y: number;
  w: number;
  title: string;
  sub?: string;
  active: boolean;
  frame: number;
  fps: number;
  children?: React.ReactNode;
}) => {
  const p = spring({frame, fps, config: {damping: 18, stiffness: 150}});
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        boxSizing: 'border-box',
        padding: '16px 14px',
        borderRadius: 16,
        background: active ? '#103d50' : theme.raised,
        border: `2px solid ${active ? theme.cyan : theme.border}`,
        boxShadow: active ? `0 0 26px ${theme.cyan}44` : undefined,
        opacity: p,
        transform: `scale(${0.88 + 0.12 * p})`,
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 26, fontWeight: 800, color: active ? theme.text : theme.muted}}>
        {title}
      </div>
      {sub ? (
        <div style={{fontSize: 16, marginTop: 4, color: theme.dim, fontFamily: theme.mono}}>
          {sub}
        </div>
      ) : null}
      {children}
    </div>
  );
};

const HandshakeLabel = ({
  label,
  dir,
  y,
  visible,
  frame,
  fps,
}: {
  label: string;
  dir: 'right' | 'left';
  y: number;
  visible: boolean;
  frame: number;
  fps: number;
}) => {
  if (!visible) return null;
  const p = spring({frame, fps, config: {damping: 16, stiffness: 180}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 320,
        top: y,
        opacity: p,
        transform: `translateX(${(dir === 'right' ? -24 : 24) * (1 - p)}px)`,
      }}
    >
      <span
        style={{
          fontFamily: theme.mono,
          fontSize: 20,
          color: theme.cyan,
          background: theme.raised,
          padding: '6px 12px',
          borderRadius: 10,
          border: `1px solid ${theme.border}`,
        }}
      >
        {dir === 'right' ? '→' : '←'} {label}
      </span>
    </div>
  );
};

const HttpCard = ({
  lines,
  accent,
  visible,
  frame,
  fps,
}: {
  lines: string[];
  accent: string;
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
        top: 545,
        left: 90,
        width: 400,
        boxSizing: 'border-box',
        background: theme.panel,
        border: `2px solid ${accent}`,
        borderRadius: 14,
        padding: '16px 18px',
        fontFamily: theme.mono,
        fontSize: 19,
        lineHeight: 1.6,
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px)`,
      }}
    >
      {lines.map((line, i) => (
        <div
          key={line}
          style={{color: i === 0 ? accent : theme.muted, fontWeight: i === 0 ? 800 : 400}}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

const RenderPreview = ({visible, local, fps}: {visible: boolean; local: number; fps: number}) => {
  if (!visible) return null;
  const p = spring({frame: local, fps, config: {damping: 18, stiffness: 150}});
  const css = spring({frame: local - 30, fps, config: {damping: 16, stiffness: 160}});
  const js = spring({frame: local - 60, fps, config: {damping: 16, stiffness: 160}});
  const img = spring({frame: local - 90, fps, config: {damping: 16, stiffness: 160}});
  return (
    <div
      style={{
        position: 'absolute',
        top: 500,
        left: 90,
        width: 400,
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px)`,
      }}
    >
      {/* Mini page being painted */}
      <div
        style={{
          background: '#eef4f8',
          borderRadius: 14,
          overflow: 'hidden',
          border: `2px solid ${theme.border}`,
        }}
      >
        <div style={{height: 44, background: theme.cyan, opacity: 0.25 + 0.75 * css}} />
        <div style={{padding: 16, display: 'flex', flexDirection: 'column', gap: 10}}>
          <div style={{height: 14, width: '85%', borderRadius: 7, background: css > 0.5 ? '#7fb8d8' : '#c3ccd4'}} />
          <div style={{height: 14, width: '65%', borderRadius: 7, background: css > 0.5 ? '#9fc9de' : '#cdd5db'}} />
          <div style={{height: 90, borderRadius: 10, background: img > 0.5 ? '#8fd0b8' : '#d7dde2', opacity: 0.35 + 0.65 * img}} />
          <div style={{height: 14, width: '75%', borderRadius: 7, background: css > 0.5 ? '#7fb8d8' : '#c3ccd4'}} />
        </div>
      </div>
      {/* Extra assets arriving */}
      <div style={{display: 'flex', justifyContent: 'center', gap: 12, marginTop: 14}}>
        {[
          {t: '+ CSS', v: css},
          {t: '+ JS', v: js},
          {t: '+ IMG', v: img},
        ].map((badge) => (
          <span
            key={badge.t}
            style={{
              fontFamily: theme.mono,
              fontSize: 18,
              fontWeight: 700,
              color: '#02101b',
              background: theme.green,
              borderRadius: 999,
              padding: '6px 14px',
              opacity: badge.v,
              transform: `scale(${0.7 + 0.3 * badge.v})`,
            }}
          >
            {badge.t}
          </span>
        ))}
      </div>
    </div>
  );
};

const MentalModel = ({visible, frame, fps}: {visible: boolean; frame: number; fps: number}) => {
  if (!visible) return null;
  const p = spring({frame, fps, config: {damping: 20, stiffness: 120}});
  const chain = [
    'example.com',
    'DNS → 93.184.216.34',
    'TCP + TLS',
    'GET / (HTTP)',
    'HTML · CSS · JS',
    'Trang web',
  ];
  return (
    <div
      style={{
        position: 'absolute',
        top: 200,
        left: 40,
        width: 500,
        textAlign: 'center',
        opacity: p,
        transform: `scale(${0.92 + 0.08 * p})`,
      }}
    >
      <div
        style={{
          background: theme.panel,
          border: `2px solid ${theme.cyan}`,
          borderRadius: 20,
          padding: '30px 26px',
          fontFamily: theme.mono,
          fontSize: 26,
          lineHeight: 1.5,
        }}
      >
        {chain.map((item, i) => (
          <div key={item}>
            <div
              style={{
                color: i === chain.length - 1 ? theme.green : theme.text,
                fontWeight: 800,
              }}
            >
              {item}
            </div>
            {i < chain.length - 1 ? (
              <div style={{color: theme.cyan, fontSize: 22}}>↓</div>
            ) : null}
          </div>
        ))}
      </div>
      <div style={{marginTop: 20, color: theme.muted, fontSize: 22, fontWeight: 600}}>
        Tất cả diễn ra trong ~1 giây
      </div>
    </div>
  );
};

// --- Main composition ---

export const WebVisitExplainer = () => {
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

  const urlText = 'example.com'.slice(
    0,
    Math.floor(
      interpolate(frame, [stepStart(0) + 8, stepStart(0) + 65], [0, 11], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    )
  );
  const ipRevealed = frame >= stepStart(1) + 75;
  const tlsReady = frame >= stepStart(2) + 100;
  const stageDim =
    activeStep === 7
      ? interpolate(frame, [stepStart(7), stepStart(7) + 20], [1, 0.25], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 1;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 72% 40%, #083046 0%, ${theme.bg} 52%)`,
        color: theme.text,
        fontFamily: theme.sans,
        padding: '106px 54px 72px',
        boxSizing: 'border-box',
      }}
    >
      <header style={{height: 220}}>
        <div
          style={{
            fontFamily: theme.mono,
            fontSize: 20,
            color: theme.cyan,
            fontWeight: 800,
            letterSpacing: 4,
          }}
        >
          VISUAL SYSTEMS / 003
        </div>
        <h1 style={{fontSize: 64, lineHeight: 1.08, letterSpacing: -2, margin: '22px 0 12px'}}>
          Truy cập <span style={{color: theme.cyan}}>trang web</span>
        </h1>
        <div style={{color: theme.muted, fontSize: 26}}>
          Chuyện gì xảy ra khi bạn gõ một địa chỉ?
        </div>
      </header>

      <div style={{display: 'flex', gap: 18, alignItems: 'flex-start'}}>
        <StepList
          steps={webVisitSteps}
          activeStep={activeStep}
          frame={frame}
          fps={fps}
          framesPerStep={FRAMES_PER_STEP}
        />

        <div style={{position: 'relative', width: 580, height: STAGE_H}}>
          {/* Wires */}
          <div style={{opacity: stageDim}}>
            <Connection x1={230} y1={135} x2={125} y2={470} start={stepStart(1)} frame={frame} active={activeStep === 1} height={STAGE_H} visibleUntil={stepStart(2) + 40} />
            <Connection x1={125} y1={470} x2={230} y2={135} start={stepStart(1) + 50} frame={frame} active={activeStep === 1} color={theme.green} height={STAGE_H} visibleUntil={stepStart(2) + 40} />
            <Connection x1={290} y1={135} x2={290} y2={820} start={stepStart(2)} frame={frame} active={activeStep === 3} height={STAGE_H} />
            <Connection x1={290} y1={820} x2={290} y2={135} start={stepStart(5)} frame={frame} active={activeStep === 5} color={theme.green} height={STAGE_H} />
          </div>

          {/* Nodes */}
          <div style={{opacity: stageDim}}>
            <NetNode
              x={140}
              y={10}
              w={300}
              title="Browser"
              active={activeStep === 0 || activeStep === 3 || activeStep === 6}
              frame={frame}
              fps={fps}
            >
              <div
                style={{
                  marginTop: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 10,
                  padding: '8px 12px',
                }}
              >
                <span style={{fontFamily: theme.mono, fontSize: 18, color: theme.text}}>
                  {urlText}
                </span>
                <span
                  style={{
                    color: theme.cyan,
                    opacity: activeStep === 0 && local % 30 < 20 ? 1 : 0,
                  }}
                >
                  ▌
                </span>
              </div>
            </NetNode>

            <NetNode
              x={20}
              y={470}
              w={210}
              title="DNS"
              sub="danh bạ Internet"
              active={activeStep === 1}
              frame={Math.max(0, frame - 10)}
              fps={fps}
            />

            <NetNode
              x={140}
              y={820}
              w={300}
              title="Server"
              sub="93.184.216.34 :443"
              active={activeStep === 2 || activeStep === 4 || activeStep === 5}
              frame={Math.max(0, frame - 18)}
              fps={fps}
            >
              {activeStep === 4 ? (
                <div style={{marginTop: 10}}>
                  <div style={{fontFamily: theme.mono, fontSize: 16, color: theme.cyan}}>
                    ⚙ Đang tạo HTML...
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      height: 8,
                      borderRadius: 4,
                      background: theme.bg,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${interpolate(local, [10, FRAMES_PER_STEP - 15], [0, 100], {
                          extrapolateLeft: 'clamp',
                          extrapolateRight: 'clamp',
                        })}%`,
                        background: theme.cyan,
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </NetNode>
          </div>

          {/* Resolved IP address */}
          {ipRevealed && activeStep <= 3 ? (
            <div
              style={{
                position: 'absolute',
                left: 20,
                top: 610,
                width: 210,
                textAlign: 'center',
                opacity: spring({
                  frame: frame - (stepStart(1) + 75),
                  fps,
                  config: {damping: 18, stiffness: 160},
                }),
              }}
            >
              <span
                style={{
                  fontFamily: theme.mono,
                  fontSize: 18,
                  color: theme.green,
                  background: theme.raised,
                  border: `1px solid ${theme.green}`,
                  borderRadius: 10,
                  padding: '6px 12px',
                }}
              >
                IP 93.184.216.34
              </span>
            </div>
          ) : null}

          {/* TCP handshake */}
          <HandshakeLabel label="SYN" dir="right" y={250} visible={activeStep === 2 && local > 12} frame={local - 12} fps={fps} />
          <HandshakeLabel label="SYN-ACK" dir="left" y={340} visible={activeStep === 2 && local > 40} frame={local - 40} fps={fps} />
          <HandshakeLabel label="ACK" dir="right" y={430} visible={activeStep === 2 && local > 68} frame={local - 68} fps={fps} />

          {/* TLS lock on the wire */}
          {tlsReady && activeStep >= 2 && activeStep <= 5 ? (
            <div
              style={{
                position: 'absolute',
                left: 290,
                top: 730,
                transform: 'translateX(-50%)',
                opacity: spring({
                  frame: frame - (stepStart(2) + 100),
                  fps,
                  config: {damping: 18, stiffness: 160},
                }),
              }}
            >
              <span
                style={{
                  fontFamily: theme.mono,
                  fontSize: 18,
                  fontWeight: 700,
                  color: theme.green,
                  background: theme.raised,
                  border: `1px solid ${theme.green}`,
                  borderRadius: 999,
                  padding: '6px 14px',
                }}
              >
                🔒 TLS
              </span>
            </div>
          ) : null}

          {/* Request / response cards */}
          <HttpCard
            visible={activeStep === 3}
            accent={theme.cyan}
            lines={['GET / HTTP/1.1', 'Host: example.com']}
            frame={local}
            fps={fps}
          />
          <HttpCard
            visible={activeStep === 5}
            accent={theme.green}
            lines={['HTTP/1.1 200 OK', 'Content-Type: text/html', '<html>...</html>']}
            frame={local}
            fps={fps}
          />

          {/* Page painting */}
          <RenderPreview visible={activeStep === 6} local={local} fps={fps} />

          {/* Compact mental model */}
          <MentalModel visible={activeStep === 7} frame={local} fps={fps} />
        </div>
      </div>

      {/* Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 77,
          left: 54,
          right: 54,
          minHeight: 116,
          padding: '24px 27px',
          boxSizing: 'border-box',
          borderLeft: `5px solid ${theme.cyan}`,
          background: '#0b1c29',
          borderRadius: 12,
          opacity: captionOpacity,
          fontSize: 26,
          lineHeight: 1.32,
          fontWeight: 600,
        }}
      >
        {webVisitSteps[activeStep].caption}
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
        {String(activeStep + 1).padStart(2, '0')} / {webVisitSteps.length}
      </div>
    </AbsoluteFill>
  );
};