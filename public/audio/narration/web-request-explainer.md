# Lời bình — WebRequestExplainer (30fps, 1200 frames = 40s)

Khi có file audio, đặt tại `public/audio/narration/web-request.mp3`
và thêm `<Audio src={staticFile("audio/narration/web-request.mp3")} />`
vào composition.

## Kịch bản theo từng cảnh

| Frame | Thời gian | Lời bình |
| --- | --- | --- |
| 0–75 | 0:00–0:02 | Khi bạn gõ một địa chỉ web rồi nhấn Enter, điều gì thật sự xảy ra? |
| 75–225 | 0:02–0:07 | Đầu tiên, bạn gõ địa chỉ example.com vào trình duyệt. Nhưng trình duyệt chưa biết máy chủ nằm ở đâu trên Internet. |
| 225–390 | 0:07–0:13 | Trình duyệt hỏi máy chủ DNS. DNS giống như danh bạ: nó đổi tên miền thành địa chỉ IP của server. |
| 390–540 | 0:13–0:18 | Có địa chỉ IP, hai máy bắt tay TCP — ba bước SYN, SYN-ACK, ACK — để mở một kết nối tin cậy. |
| 540–705 | 0:18–0:23 | Kết nối đã mở, trình duyệt gửi một HTTP request, ví dụ GET, tới cổng 443 của server. |
| 705–870 | 0:23–0:29 | Web server nhận request, ứng dụng backend xử lý và tạo ra trang HTML. |
| 870–1035 | 0:29–0:34 | Server gửi HTML quay về. Trình duyệt nhận và vẽ thành trang web bạn nhìn thấy. |
| 1035–1200 | 0:34–0:40 | Tóm gọn: gõ địa chỉ, hỏi DNS, bắt tay TCP, gửi request, server xử lý, rồi HTML quay về. |

## Sound effects gợi ý

- Gói tin di chuyển: whoosh nhẹ (public/audio/sfx/whoosh.mp3)
- Bắt tay TCP hoàn tất: tiếng xác nhận nhỏ (sfx/confirm)
- Trang web hiện lên: pop nhẹ (sfx/pop)