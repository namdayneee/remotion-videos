export const FRAMES_PER_STEP = 105;
export const dockerSteps = [
  {id:'source', title:'Source code', detail:'Mã nguồn ứng dụng', command:'ls -la', output:'app.js  package.json  Dockerfile', caption:'Ứng dụng bắt đầu từ mã nguồn trên máy của bạn.'},
  {id:'dockerfile', title:'Dockerfile', detail:'Công thức build', command:'cat Dockerfile', output:'FROM node:22-alpine\nCOPY . /app\nCMD ["node", "app.js"]', caption:'Dockerfile mô tả các bước tạo image và lệnh khởi chạy.'},
  {id:'build', title:'docker build', detail:'Tạo các layer', command:'docker build -t my-app .', output:'=> load build context\n=> build layers\n=> naming to my-app:latest', caption:'Build dùng context và Dockerfile để tạo các layer của image.'},
  {id:'image', title:'Docker image', detail:'Mẫu chỉ đọc', command:'docker image ls', output:'REPOSITORY   TAG      IMAGE ID\nmy-app       latest   7f2a91', caption:'Image là mẫu đóng gói để tạo một hoặc nhiều container.'},
  {id:'run', title:'docker run', detail:'Tạo và khởi chạy', command:'docker run -d -p 8080:3000 -v app-data:/data my-app', output:'c74d0f8a1e22', caption:'docker run tạo container từ image rồi khởi chạy tiến trình.'},
  {id:'container', title:'Container', detail:'Tiến trình đang chạy', command:'docker ps', output:'c74d0f8a1e22   my-app   Up\n0.0.0.0:8080->3000/tcp', caption:'Container chạy ứng dụng và dùng chung kernel của host.'},
  {id:'ports', title:'Port mapping', detail:'Host → container', command:'curl localhost:8080', output:'HTTP/1.1 200 OK\nHello from container', caption:'Cổng 8080 trên host chuyển tiếp tới cổng 3000 của container.'},
  {id:'volume', title:'Volume', detail:'Dữ liệu bền vững', command:'docker volume inspect app-data', output:'Mountpoint: /var/lib/docker/volumes/app-data/_data', caption:'Named volume app-data đã được gắn vào /data khi chạy container.'},
  {id:'network', title:'Network', detail:'Giao tiếp dịch vụ', command:'docker network connect app-net c74d0f8a1e22', output:'container connected to app-net', caption:'Container trên cùng network có thể giao tiếp bằng tên dịch vụ.'},
  {id:'stop', title:'Stop / remove', detail:'Dọn container', command:'docker stop c74d0f8a1e22 && docker rm c74d0f8a1e22', output:'c74d0f8a1e22\nc74d0f8a1e22', caption:'Dừng và xóa container; image và named volume vẫn còn.'},
] as const;
export const DURATION = dockerSteps.length * FRAMES_PER_STEP;
export const getStepFromFrame = (frame:number) => Math.min(dockerSteps.length-1,Math.max(0,Math.floor(frame/FRAMES_PER_STEP)));
