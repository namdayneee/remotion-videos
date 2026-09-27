# Remotion Visual Learning Studio

Các video hoạt hình ngắn giúp trực quan hóa cách hệ thống máy tính hoạt động.

Đây là dự án học tập cá nhân: mỗi chủ đề kỹ thuật (docker, dns, client–server, hành trình một request web…) được chuyển thành một video Remotion với sơ đồ hệ thống, packet di chuyển, terminal và dashboard động — thay vì giải thích bằng đoạn văn dài.

## Video hiện có

| Composition | Chủ đề | Thời lượng |
| --- | --- | --- |
| `DockerExplainer` | Cách Docker đóng gói và chạy ứng dụng | 35 giây |
| `ClientServerExplainer` | Mô hình client–server, TCP, HTTP request/response | ~30 giây |
| `WebVisitExplainer` | Hành trình gõ một địa chỉ web: DNS → TCP/TLS → HTTP → render | 36 giây |

Tất cả video đều ở định dạng dọc 1080 × 1920 (9:16), 30 FPS, ngôn ngữ tiếng Việt. Kịch bản lời thoại (narration script) nằm trong `public/audio/narration/` — video hiện chưa có file âm thanh, chỉ có kịch bản để thu âm/TTS sau này.

## Chạy locally

Yêu cầu: Node.js 22 trở lên và npm.

```bash
git clone https://github.com/namdayneee/remotion-videos.git
cd remotion-videos
npm ci
npm run dev
```

Remotion Studio sẽ mở trong trình duyệt. Chọn composition (`DockerExplainer`, `ClientServerExplainer`, `WebVisitExplainer`) để xem trước và scrub timeline.

## Các lệnh npm

```bash
npm run dev            # Mở Remotion Studio để preview
npm run lint           # ESLint + kiểm tra TypeScript
npm test               # Chạy test cho timeline/step data
npm run build          # Tạo Remotion bundle
npm run render:docker  # Render DockerExplainer ra out/docker-explainer.mp4
```

File MP4 được ghi vào `out/` và đã bị Git ignore. Không render MP4 trong lúc phát triển — dùng Studio preview là đủ.

## Cấu trúc dự án

```
src/
  Root.tsx                  # Đăng ký tất cả composition với Remotion
  DockerExplainer.tsx       # Video Docker (dashboard dọc)
  ClientServerExplainer.tsx # Video client–server
  WebVisitExplainer.tsx     # Video hành trình request web
  components/               # Component tái sử dụng: Node, Connection,
                            #   StepRail, StepList, TerminalPanel,
                            #   SystemPanel, StatusBadge…
  data/                     # Step data cho từng video
                            #   (dockerSteps, clientServerSteps, webVisitSteps)
  theme/tokens.ts           # Bảng màu và design token chung
public/
  audio/narration/          # Kịch bản lời thoại tiếng Việt (.md)
tests/                      # Test Node.js cho timeline data
```

Mỗi video là một dashboard cố định: title, step rail, terminal và system panel được giữ nguyên vị trí, chỉ có trạng thái bên trong animate theo frame. Step đang chạy highlight cyan, step xong màu xanh lá, step sắp tới mờ đi.

## Thêm video mới

1. Tạo step data trong `src/data/<topic>Steps.ts` (mỗi step có `title`, `detail`, `caption`, và `narration` nếu cần).
2. Tạo component composition mới trong `src/`, tái sử dụng component trong `src/components/` và token trong `src/theme/tokens.ts`.
3. Đăng ký composition trong `src/Root.tsx` — không xóa hay ghi đè composition cũ.
4. Chạy `npm run lint` và `npm test` để chắc chắn project compile.

`AGENTS.md` mô tả đầy đủ phong cách hình ảnh, quy tắc animation và cách viết lời thoại cho video mới.