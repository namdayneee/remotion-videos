export const FRAMES_PER_STEP = 130;
export const clientServerSteps = [
  {
    id: 'two-machines',
    title: 'Client & Server',
    detail: 'Hai máy tính riêng biệt',
    caption: 'Client là máy của bạn. Server là máy ở xa, chạy dịch vụ.',
  },
  {
    id: 'address',
    title: 'Địa chỉ IP : Port',
    detail: 'Cách tìm đúng server',
    caption: 'Server có địa chỉ IP và port. Client dùng địa chỉ này để tìm tới.',
  },
  {
    id: 'handshake',
    title: 'Bắt tay TCP',
    detail: 'SYN → SYN-ACK → ACK',
    caption: 'Trước khi gửi dữ liệu, hai bên bắt tay để mở kết nối.',
  },
  {
    id: 'request',
    title: 'Gửi Request',
    detail: 'Client → Server',
    caption: 'Client gửi một HTTP Request: method, đường dẫn, headers và body.',
  },
  {
    id: 'process',
    title: 'Server xử lý',
    detail: 'Đọc và thực thi',
    caption: 'Server nhận request, đọc method và path, rồi xử lý logic.',
  },
  {
    id: 'response',
    title: 'Gửi Response',
    detail: 'Server → Client',
    caption: 'Server gửi HTTP Response: status code, headers và dữ liệu.',
  },
  {
    id: 'mental-model',
    title: 'Mental Model',
    detail: 'Request ↔ Response',
    caption: 'Client gửi request, server trả response. Lặp lại cho mỗi tương tác.',
  },
] as const;

export const DURATION = clientServerSteps.length * FRAMES_PER_STEP;

export const getStepFromFrame = (frame: number) =>
  Math.min(clientServerSteps.length - 1, Math.max(0, Math.floor(frame / FRAMES_PER_STEP)));
