# DockerExplainer — lời dẫn tiếng Việt

Mỗi bước dài 3,5 giây ở 30 FPS. Đây là kịch bản để tự ghi âm hoặc tạo giọng đọc; video hiện chưa chứa tiếng.

| Thời gian | Lời dẫn |
| --- | --- |
| 0:00–0:03.5 | Ta bắt đầu từ mã nguồn của ứng dụng. |
| 0:03.5–0:07 | Dockerfile ghi lại cách tạo môi trường và khởi động ứng dụng. |
| 0:07–0:10.5 | Docker build đọc công thức và mã nguồn, rồi tạo các lớp dữ liệu. |
| 0:10.5–0:14 | Kết quả là một image, tức mẫu để tạo container. |
| 0:14–0:17.5 | Docker run tạo container từ image và chạy ứng dụng. |
| 0:17.5–0:21 | Container là tiến trình tách biệt, dùng chung kernel của máy chủ. |
| 0:21–0:24.5 | Cổng tám không tám không trên máy chuyển vào cổng ba nghìn của ứng dụng. |
| 0:24.5–0:28 | Named volume giữ dữ liệu ngay cả khi xóa container. |
| 0:28–0:31.5 | Network cho phép container giao tiếp với các dịch vụ khác. |
| 0:31.5–0:35 | Dừng rồi xóa container; image và named volume vẫn còn. |

Khi đã có tệp thu âm, đưa vào `public/audio/narration/` và thêm `Audio` với `staticFile()` trong composition. Giữ hiệu ứng tiếng gõ và âm báo nhỏ hơn giọng đọc; chỉ thêm file có quyền sử dụng.
