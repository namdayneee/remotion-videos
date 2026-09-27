export const FRAMES_PER_STEP = 135;
export const webVisitSteps = [
  {
    id: 'url',
    title: 'Nhập địa chỉ',
    detail: 'example.com',
    caption: 'Bạn gõ example.com vào thanh địa chỉ. Browser chưa biết server nằm ở đâu.',
    narration: 'Mọi thứ bắt đầu khi bạn gõ một địa chỉ web. Lúc này, browser chưa biết máy chủ của trang web nằm ở đâu trên Internet.',
  },
  {
    id: 'dns',
    title: 'Tra cứu DNS',
    detail: 'Tên miền → địa chỉ IP',
    caption: 'DNS đổi tên example.com thành địa chỉ IP, giống như tra số trong danh bạ.',
    narration: 'Browser hỏi hệ thống DNS: địa chỉ này ứng với máy nào? DNS trả về một địa chỉ IP, giống như tra số điện thoại trong danh bạ.',
  },
  {
    id: 'connect',
    title: 'TCP + TLS',
    detail: 'Bắt tay, mở kết nối an toàn',
    caption: 'Browser bắt tay TCP với server, rồi thiết lập lớp mã hóa TLS.',
    narration: 'Có địa chỉ rồi, browser bắt tay để mở kết nối TCP với server, sau đó thiết lập lớp mã hóa TLS cho an toàn.',
  },
  {
    id: 'request',
    title: 'Gửi request',
    detail: 'GET / → server',
    caption: 'Browser gửi HTTP request GET tới server qua kết nối đã mở.',
    narration: 'Kết nối đã sẵn sàng. Browser gửi một HTTP request, ví dụ lệnh GET, để xin trang chủ của website.',
  },
  {
    id: 'server',
    title: 'Server xử lý',
    detail: 'Chạy ứng dụng, tạo HTML',
    caption: 'Server nhận request, chạy ứng dụng phía sau và chuẩn bị nội dung trang.',
    narration: 'Server nhận request, chạy chương trình phía sau, rồi chuẩn bị nội dung HTML của trang web.',
  },
  {
    id: 'response',
    title: 'Nhận response',
    detail: '200 OK + HTML',
    caption: 'Server trả về HTTP response: mã 200 nghĩa là thành công, kèm nội dung HTML.',
    narration: 'Server gửi ngược về một HTTP response: trạng thái 200 nghĩa là thành công, kèm theo nội dung HTML của trang.',
  },
  {
    id: 'render',
    title: 'Hiển thị trang',
    detail: 'Tải CSS, JS, hình ảnh',
    caption: 'Browser tải thêm CSS, JavaScript và hình ảnh, rồi vẽ trang hoàn chỉnh lên màn hình.',
    narration: 'Chưa xong. Browser đọc HTML, tải thêm CSS, JavaScript và hình ảnh, rồi vẽ trang hoàn chỉnh lên màn hình.',
  },
  {
    id: 'mental-model',
    title: 'Bức tranh toàn cảnh',
    detail: 'URL → DNS → HTTP → trang web',
    caption: 'Từ một địa chỉ: tra DNS tìm server, mở kết nối an toàn, gửi request, nhận HTML, hiển thị trang.',
    narration: 'Tóm lại: từ một địa chỉ, browser tra DNS để tìm server, mở kết nối an toàn, gửi request, nhận HTML và hiển thị trang web.',
  },
] as const;

export const DURATION = webVisitSteps.length * FRAMES_PER_STEP;

export const getStepFromFrame = (frame: number) =>
  Math.min(webVisitSteps.length - 1, Math.max(0, Math.floor(frame / FRAMES_PER_STEP)));