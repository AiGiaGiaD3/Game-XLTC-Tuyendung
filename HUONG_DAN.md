# Đừng vội chốt! — 5 tuyến, 30 nấc sự nghiệp

## Chơi ngay
Mở index.html ở thư mục ngoài cùng bằng Chrome, Edge hoặc Safari. Không cần cài đặt, API hay mạng. Trên điện thoại, nên dùng bản web được host thay vì trình xem trước file trong ứng dụng Files.

← → / A D: chạy. Space / ↑ / W: nhảy; giữ để nhảy cao. P / Esc: tạm dừng. Điện thoại có nút cảm ứng.

Âm nhạc chỉ phát sau tương tác đầu tiên. Bật/tắt nhạc và hiệu ứng riêng trong Cài đặt hoặc Tạm nghỉ. Có chế độ Thảnh thơi và Arcade; đồng hồ áp dụng cho câu hỏi nguồn, mini-game không đếm giờ.

## Hành trình
| Checkpoint | Bối cảnh | Nhiệm vụ | Trang phục |
|---|---|---|---|
| 01–06 | Quán cà phê | Lật thẻ, chọn hai manh mối động lực | Smart casual |
| 07–12 | Ngày hội tuyển dụng | Gắn huy hiệu tiềm năng vào bằng chứng | Áo khoác, thẻ sự kiện |
| 13–18 | Văn phòng | Hội thoại hỏi sâu hai lượt | Blazer, cặp tối màu |
| 19–24 | Xây đội nhóm | Phân loại kỳ vọng trên bảng đội | Suit xanh, cà vạt |
| 25–30 | Không gian lãnh đạo | Chọn người theo tiêu chí, phân bổ ba buổi hỗ trợ | Suit tối, cà vạt và ghim vàng |

Mỗi tuyến có một cấu trúc đi cảnh đặc trưng kết hợp các đoạn chướng ngại khác nhau. Cuối mỗi checkpoint có bốn bậc thang thật. Camera đi theo độ cao. Qua checkpoint lưu tiến độ; qua sáu checkpoint chuyển tuyến và trang phục. Tiến độ lưu trên trình duyệt, không đồng bộ thiết bị. Bản offline và bản web có vùng lưu riêng.

30 tình huống và 120 bước gốc giữ nguyên trong cases.json và Sổ tay. Các micro-challenge trong missions.js là nội dung giả định bổ sung, không phải nguyên văn tài liệu. Danh hiệu và điểm chỉ để chơi vui, không đánh giá năng lực hay cam kết nghề nghiệp/thu nhập.

## Đưa lên GitHub Pages
Upload index.html ở thư mục ngoài cùng vào repository, bật Pages cho nhánh đang dùng. Không cần thư mục source để chạy. Không có khóa bí mật hay dịch vụ backend.

## Chỉnh sửa mã nguồn
Thư mục source chứa template.html, routes.js, scenery.js, missions.js, audio.js, refine.css, dữ liệu JSON và font Noto Sans kèm giấy phép. Chạy python3 build.py để tạo dist/index.html; node --check check.js và node test-game.cjs để kiểm tra. Sau đó thay index.html ngoài cùng bằng source/dist/index.html mới.

## Kiểm tra bản này
Kiểm tra tự động: 30 đường đi vượt được bằng mô phỏng vật lý; 120 biến thể đáp án; thử sai, khiên, hồi sinh, hết giờ; 30 mini-game với xử lý nút thật; giới hạn phân bổ 3 buổi; tiến độ đủ 30 trạm. Kiểm tra trình duyệt: màn chính, văn phòng, tầng lãnh đạo và hội thoại hai lượt. Phiên trình duyệt bị mất kết nối trước khi hoàn tất toàn bộ kiểm tra hình ảnh; chưa xác nhận giao diện trên thiết bị di động thật.

## V5 — Laptop và smartphone
Nút điều khiển nằm ngoài canvas ở điện thoại dọc/ngang. Vùng chạm điều khiển 64px ở dọc, 52px ở ngang; nút thông thường tối thiểu 44px. Chữ nhiệm vụ/đáp án 16px, bảng có thể cuộn và giữ vị trí sau khi chọn. Màn chơi laptop co theo chiều cao cửa sổ. Tự tạm dừng khi đổi chiều rộng/xoay máy, không tạm dừng vì thanh trình duyệt co giãn. Hỗ trợ safe-area và reduced-motion.
Kiểm tra Chromium trong iframe viewport 320×568, 390×844, 844×390 và 1366×768: không tràn ngang; canvas và controls không đè nhau; chọn thẻ giữ focus và scroll; đổi kích thước tạm dừng; 30 checkpoint và 30 nhiệm vụ qua bộ kiểm tra logic. Chưa kiểm tra trên phần cứng iOS/Android thật.
