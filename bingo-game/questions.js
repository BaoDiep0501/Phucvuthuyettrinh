const questions = {
  "1": {
    "question": "Vai trò chính của Node Runtime là gì?",
    "options": [
      "Thiết kế giao diện website",
      "Cho phép JavaScript chạy bên ngoài trình duyệt, ví dụ trên server",
      "Thay thế hoàn toàn JavaScript",
      "Chỉ dùng để kết nối database"
    ],
    "answer": "B"
  },
  "2": {
    "question": "Non-blocking I/O trong Node.js có nghĩa gần đúng nhất là gì?",
    "options": [
      "Node.js không bao giờ phải chờ bất kỳ tác vụ nào",
      "Khi một tác vụ I/O đang chờ, Node.js có thể tiếp tục xử lý công việc khác",
      "Mọi tác vụ đều chạy cùng lúc trên main thread",
      "Node.js chỉ xử lý được một request tại một thời điểm"
    ],
    "answer": "B"
  },
  "3": {
    "question": "Đoạn code sau sẽ in ra theo thứ tự nào?",
    "options": [],
    "answer": "A → C → B",
    "code": "console.log(\"A\");\n\nsetTimeout(() => {\n  console.log(\"B\");\n}, 0);\n\nconsole.log(\"C\");"
  },
  "4": {
    "question": "Trong Express Middleware, req, res, next lần lượt là gì?",
    "options": [
      "Request – Server – Route",
      "Request – Response – chuyển quyền xử lý sang middleware tiếp theo",
      "Response – Request – Route",
      "Request – Route – Response"
    ],
    "answer": "B"
  },
  "5": {
    "question": "Ba middleware áp dụng cho cùng một request được đăng ký theo thứ tự: Middleware 1 → Middleware 2 → Middleware 3. Cả ba đều gọi next(). Thứ tự thực thi là gì?",
    "options": [
      "Middleware 3 → Middleware 2 → Middleware 1",
      "Middleware 1 → Middleware 2 → Middleware 3",
      "Express tự sắp xếp theo chức năng",
      "Các middleware chạy đồng thời"
    ],
    "answer": "B"
  },
  "6": {
    "question": "Nếu middleware không gọi next() và cũng không gửi response thì điều gì xảy ra với request?",
    "options": [],
    "answer": "Request bị dừng tại middleware đó; nếu middleware không gọi next() và cũng không gửi response thì request có thể bị treo."
  },
  "7": {
    "question": "Bạn muốn ghi lại HTTP method và URL của mọi request đi vào server. Logic này phù hợp nhất để đặt ở đâu?",
    "options": [
      "Middleware",
      "Database",
      "HTML",
      "res.json()"
    ],
    "answer": "A"
  },
  "8": {
    "question": "Trong đoạn code sau, res.json() làm gì?",
    "options": [
      "Đọc file JSON trong máy",
      "Gửi dữ liệu JSON về client",
      "Lưu dữ liệu vào database",
      "Chuyển request thành JSON"
    ],
    "answer": "B",
    "code": "app.get(\"/users\", (req, res) => {\n  res.json({\n    name: \"An\",\n    age: 20\n  });\n});"
  },
  "9": {
    "question": "Request đi qua Middleware 1 → Middleware 2 → Route Handler. Middleware 1 gọi next(); Middleware 2 gửi response và không gọi next(). Điều gì xảy ra?",
    "options": [
      "Route Handler tiếp tục chạy",
      "Request quay lại Middleware 1",
      "Response được trả về client; Route Handler không chạy",
      "Express tự gọi next()"
    ],
    "answer": "C"
  },
  "10": {
    "question": "Middleware 1 thêm req.message = \"Xin chào\" rồi gọi next(). Middleware 2 có thể đọc req.message không? Vì sao?",
    "options": [],
    "answer": "Có. Middleware có thể đọc hoặc thay đổi thông tin trên req. Middleware 2 nhận cùng đối tượng req nên có thể đọc giá trị \"Xin chào\" đã được Middleware 1 thêm vào."
  },
  "11": {
    "question": "Cú pháp tổng quát của một route trong Express.js là gì?",
    "options": [
      "express.ROUTE(PATH, HANDLER)",
      "app.METHOD(PATH, HANDLER)",
      "app.LISTEN(PATH, METHOD)",
      "router.GET(PATH, RES, REQ)"
    ],
    "answer": "B"
  },
  "12": {
    "question": "Phương thức HTTP nào thường được dùng để tạo dữ liệu mới?",
    "options": [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],
    "answer": "B"
  },
  "13": {
    "question": "Để lấy dữ liệu dạng Query String từ URL (ví dụ: /search?name=An), ta sử dụng thuộc tính nào của object req?",
    "options": [
      "req.params.name",
      "req.body.name",
      "req.query.name",
      "req.headers.name"
    ],
    "answer": "C"
  },
  "14": {
    "question": "Với đường dẫn động app.get('/users/:id', ...), làm thế nào để lấy giá trị id khi client truy cập /users/5?",
    "options": [
      "req.params.id",
      "req.query.id",
      "req.body.id",
      "req.id"
    ],
    "answer": "A"
  },
  "15": {
    "question": "Bắt buộc phải khai báo middleware nào ở đầu ứng dụng để Express đọc được dữ liệu dạng JSON trong req.body?",
    "options": [
      "app.use(express.static())",
      "app.use(express.json())",
      "app.use(express.urlencoded())",
      "app.use(express.router())"
    ],
    "answer": "B"
  },
  "16": {
    "question": "Hàm xử lý (HANDLER) trong cú pháp routing của Express mặc định nhận vào 2 tham số chính là gì?",
    "options": [
      "(request, response) viết tắt là (req, res)",
      "(get, post)",
      "(path, handler)",
      "(status, json)"
    ],
    "answer": "A"
  },
  "17": {
    "question": "Mã trạng thái HTTP 500 có ý nghĩa là gì?",
    "options": [
      "Request thành công (OK)",
      "Không tìm thấy tài nguyên (Not Found)",
      "Lỗi phía máy chủ (Internal Server Error)",
      "Tạo mới thành công (Created)"
    ],
    "answer": "C"
  },
  "18": {
    "question": "Điền vào chỗ trống: Mã trạng thái HTTP (Status Code) nào chuẩn REST API thường dùng khi tạo mới thành công một tài nguyên?",
    "options": [],
    "answer": "201 (Created)."
  },
  "19": {
    "question": "Biến môi trường .env được ví giống cái gì của ứng dụng?",
    "options": [],
    "answer": ".env là két sắt của ứng dụng."
  },
  "20": {
    "question": "Điền vào chỗ trống để trả về mã lỗi 404 kèm thông báo \"Không tìm thấy\":",
    "options": [],
    "answer": "Điền số 404.",
    "code": "res.status(____).send('Không tìm thấy');"
  }
};
