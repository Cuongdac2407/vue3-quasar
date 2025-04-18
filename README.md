## Video demo em để ở phần public/data video của bài nào em để trong folder public/data của các ex đó ạ.

## Bài 1: lập trình để highlight từng từ khi file âm thanh được phát như hình dưới đây.
Mục tiêu: khi video file ogg chạy thì file các từ trong hội thoại file json hiển thị theo giọng nói.
-sử dụng Hàm load dữ liệu transcript từ JSON.
-Hàm cập nhật câu hiển thị dựa trên currentWordIndex.
-Hàm đồng bộ highlight theo thời gian audio.
-Hàm xử lý phím tắt.
Screenshot:
https://github.com/user-attachments/assets/f65576de-f135-400c-9b0e-61f7fe282090
Mô tả:
Đoạn mã Vue3 và Quasar tối giản sử dụng fetch/axios để gửi yêu cầu và in kết quả trả về. Video Demo

## Bài 2: Ứng dụng ChatBot cơ bản
Mục tiêu: Xây dựng giao diện ChatBot cơ bản với ô nhập prompt và hiển thị kết quả AI.

Screenshot:
Video Demo
Mô tả:
https://github.com/user-attachments/assets/5a0c2d17-48fd-426e-90f0-40dabbf6a9f2


Ứng dụng được xây dựng bằng Vue.js 3 và Quasar. Yêu cầu gọi API và hiển thị phản hồi trên giao diện.

## Bài 3: Cải tiến ChatBot
Mục tiêu: Tích hợp lịch sử chat, hỗ trợ Markdown, công thức toán học, highlight code và tùy chọn "Show Think".

Screenshot:

Video demo:
[Video Demo]

https://github.com/user-attachments/assets/0d8ca8cb-1ce6-477d-8a3e-8c720510a5c2

Mô tả chi tiết:

Lịch sử chat: Khi người dùng bấm "New Chat", phiên chat hiện tại được lưu vào lịch sử. Lịch sử được sắp xếp từ mới đến cũ và hiển thị ở khung bên trái.
Hiển thị hội thoại: Hội thoại hiện tại hiển thị ở khung bên phải, có ô nhập prompt ở dưới cùng khi nội dung chat dài ra.
Markdown và highlight code: Sử dụng marked và highlight.js để chuyển đổi nội dung chat thành HTML với định dạng Markdown và highlight code.
Checkbox "Show Think": Cho phép người dùng bật/tắt hiển thị các bước suy nghĩ của AI. Khi tắt, các đoạn "THINK" sẽ bị loại bỏ.
Nhận xét & bài học:
Qua quá trình thực hành, tôi đã học được cách chia nhỏ dự án, tích hợp các thư viện bên ngoài và xử lý giao diện người dùng phức tạp.
