# Quasar App (ex3-chatbox)

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).


## Bài 3: Cải tiến ChatBot
- **Mục tiêu:** Tích hợp lịch sử chat, hỗ trợ Markdown, công thức toán học, highlight code và tùy chọn "Show Think".
- **Screenshot:**  
  
- **Video demo:**  
  [![Video Demo](/ex3-chatbox/public/data/b3.mp4)]
- **Mô tả chi tiết:**  
  - **Lịch sử chat:** Khi người dùng bấm "New Chat", phiên chat hiện tại được lưu vào lịch sử. Lịch sử được sắp xếp từ mới đến cũ và hiển thị ở khung bên trái.  
  - **Hiển thị hội thoại:** Hội thoại hiện tại hiển thị ở khung bên phải, có ô nhập prompt ở dưới cùng khi nội dung chat dài ra.  
  - **Markdown và highlight code:** Sử dụng `marked` và `highlight.js` để chuyển đổi nội dung chat thành HTML với định dạng Markdown và highlight code.  
  - **Checkbox "Show Think":** Cho phép người dùng bật/tắt hiển thị các bước suy nghĩ của AI. Khi tắt, các đoạn "THINK" sẽ bị loại bỏ.
- **Nhận xét & bài học:**  
  Qua quá trình thực hành, tôi đã học được cách chia nhỏ dự án, tích hợp các thư viện bên ngoài và xử lý giao diện người dùng phức tạp.