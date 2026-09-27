import {AbsoluteFill, interpolate} from "remotion";

export const COLORS = {
  background: "#09090b",
  panel: "#18181b",
  panel2: "#27272a",
  text: "#fafafa",
  muted: "#a1a1aa",
  blue: "#38bdf8",
  green: "#4ade80",
  yellow: "#facc15",
};

export const Page = ({children}: {children: React.ReactNode}) => {
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

export const Box = ({
  title,
  subtitle,
  highlight = false,
  width = 360,
}: {
  title: string;
  subtitle?: string;
  highlight?: boolean;
  width?: number;
}) => {
  return (
    <div
      style={{
        width,
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

export const Arrow = () => {
  return (
    <div
      style={{
        fontSize: 48,
        color: COLORS.blue,
        margin: "16px 0",
        textAlign: "center",
      }}
    >
      ↓
    </div>
  );
};

export const SceneTitle = ({children}: {children: React.ReactNode}) => {
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

export const Caption = ({children}: {children: React.ReactNode}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        textAlign: "center",
        color: COLORS.muted,
        fontSize: 30,
      }}
    >
      {children}
    </div>
  );
};

// Gói tin chạy dọc theo đường nối giữa 2 máy.
// progress: 0..1 — tự fade in/out ở hai đầu.
export const PacketTrip = ({
  progress,
  label,
  reverse = false,
  color = COLORS.blue,
}: {
  progress: number;
  label: string;
  reverse?: boolean;
  color?: string;
}) => {
  const pos = reverse ? 1 - progress : progress;

  const opacity = interpolate(progress, [0, 0.08, 0.92, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: `${pos * 100}%`,
        top: 46,
        transform: "translateX(-50%)",
        opacity,
      }}
    >
      <div
        style={{
          padding: "8px 18px",
          borderRadius: 999,
          backgroundColor: color,
          color: COLORS.background,
          fontSize: 24,
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
};
