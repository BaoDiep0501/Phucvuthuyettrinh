BINGO GAME — HTML / CSS / JAVASCRIPT

Cách chạy:
1. Giải nén thư mục bingo-game.
2. Mở thư mục bằng VS Code.
3. Dùng extension Live Server: nhấp phải index.html → Open with Live Server.
   Hoặc chạy: python -m http.server 8000
   rồi mở http://localhost:8000 trong trình duyệt.

Các file:
- index.html: trang random và lịch sử câu đã chơi.
- question.html: trang câu hỏi, timer và đáp án.
- style.css: giao diện, màu sắc và responsive.
- game.js: random không trùng, chuyển trang, timer, lưu tiến độ, hiện đáp án.
- questions.js: 20 câu hỏi và đáp án; 1–10 từ file DOCX, 11–20 từ tin nhắn.
- favicon.svg: biểu tượng trang.

Chỉnh câu hỏi trong questions.js:
question: nội dung câu hỏi.
options: bốn lựa chọn; dùng [] nếu là trả lời ngắn.
answer: chữ A/B/C/D nếu là trắc nghiệm; nội dung đáp án nếu là trả lời ngắn.

Tiến độ lưu trong localStorage của trình duyệt ở cùng địa chỉ trang web.
Không có nút reset theo yêu cầu. Nếu muốn xóa tiến độ để thử lại,
mở DevTools → Console và chạy:
localStorage.removeItem('bingo-classroom-v1'); location.reload();

Không cần npm, backend hay database.

Code: thêm thuộc tính code vào câu hỏi để hiển thị trong khung code riêng.
Câu 5, 9, 10 đã sửa theo bài giảng middleware.

Trắc nghiệm: click lựa chọn, tối đa 2 lượt; lượt được giữ khi refresh.
Trả lời ngắn: nút Hiện đáp án.
