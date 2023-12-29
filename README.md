# Tên dự án : Intern Management
Đây là trang wed quản lý thực sinh , nơi mà admin có thể quản lý danh sách intern và giao các bài tập cho thực tập sinh.

## Hướng Dẫn Cài Đặt
1. Clone dự án từ GitHub.
2. Cài đặt các dependencies bằng lệnh `npm install`.
3. Chạy ứng dụng với lệnh `npm start`.
4. Quản lý databasse của thực tập sinh và database của bài tập bằng Mockapi.io: https://653b7ef32e42fd0d54d534ff.mockapi.io/intern và https://653b7ef32e42fd0d54d534ff.mockapi.io/exercise
   Trong trường hợp có lỗi xin hãy lên Mockapi.io và làm theo hướng dẫn sau
   + Tạo project mới
   + new resource và đặt tên lần lượt là intern và exercise
   + nhấn edit intern và chọn : id: Object ID, 
                                name: String, 
                                email: String, 
                                sdt: String, 
                                position: String, 
                                startday: Date, 
                                end: Date, 
                                status: String, 
      sau đó add data của intern: [{"name":"Nguyen Van A","email":"vana@gmail.com","sdt":"023456789","position":"BE","id":"1","startDate":"2023-11-29T17:00:00.000Z","endDate":"2024-12-29T17:00:00.000Z","status":"đang thực tập"},{"name":"Tran Thi B","email":"thib@gmail.com","sdt":"087654321","position":"FE","id":"2","startDate":"2023-12-01T04:41:16.506Z","endDate":"2023-12-24T17:00:00.000Z","status":"done"},{"name":"Le Van C","email":"vanc@gmail.com","sdt":"011222333","position":"BE","id":"3","startDate":"2023-12-01T04:47:46.216Z","endDate":"2023-12-31T04:47:48.186Z","status":"done"},{"name":"Pham Thi D","email":"thid@gmail.com","sdt":"044555666","position":"FE","id":"4","startDate":"2023-12-01T04:53:29.131Z","endDate":"2023-12-12T04:53:31.409Z","status":"done"},{"name":"Ho Van E","email":"vane@gmail.com","sdt":"077888999","position":"BE","id":"5","startDate":"2023-12-01T05:01:03.322Z","endDate":"2023-12-13T05:01:04.875Z","status":"done"},{"name":"Kalen cage","email":"kalen@gmail.com","sdt":"0115831444","position":"FE","id":"6","startDate":"2023-12-07T05:02:24.231Z","endDate":"2023-12-07T05:02:25.550Z","status":"thiếu hồ sơ"},{"name":"Asian golden cat ","email":"duc@gmail.com","sdt":"0115831448","position":"BE","startday":1703481042,"end":1703481042,"status":"đang thực tập","id":"8","startDate":"2023-12-01","endDate":"2023-12-31"}]
   + Tương tự với exercise :  id: Object ID, 
                              exercise: String, 
                              start: Date, 
                              end: Date, 
                              InternID: Number, 
                              status: String, 
      sau đó add data của exercise : [{"exercise":"Thiết kế giao diện","start":"2023-12-24","end":"2023-12-31","InternID":["4","6","8"],"status":"chưa làm xong","id":"3"},{"exercise":"Tạo web bán hàng","start":"2023-12-01","end":"2023-12-14","InternID":["1","2"],"status":" done","id":"4"},{"exercise":"Thêm thanh search","start":"2023-12-01","end":"2023-12-02","InternID":["1","3"],"status":" done","id":"5"}]
*5.  Lưu ý sửa Api trong code lại nếu có tạo mới nhá!!

## Hướng Dẫn Sử Dụng
1. Đăng nhập tài khoản Admin:
     Email: admin@gmail.com
     Password: 0964810760
   Đăng nhập tài khoản User(Email và sdt của tất các intern)
   VD:  Email: vana@gmai.com
     Password: 023456789
2. Trong mục Quản lý intern: có các field để điền thông tin để tạo mới và tìm kiếm
3. Trong mục Quản lý bài tập : Khi chọn edit lưu ý nhấn chọn Intern để giao task cho thực tập sinh
4. Trong mục Thời gian thực tập : edit để ghi trang thái hoặc tình trạng của thực tập sinh (đang làm , bị đuổi, thiếu hồ sơ ...)
5. Log out để đăng nhập tài khoản
         
## Tính Năng Chính
- Đăng nhập và phân quyền theo role
- Với role admin có thể sử dụng hết các chức năng có trong wed như :
 . Quản lý thực tập sinh, CRUD cơ bản, view thông tin thực tập sinh.
 . Giao task cho thực tập sinh, CRUD cơ bản , có thể chọn nhiều thực tập sinh khi giao task.
 . Quản lý thời gian thực tập của thực tập sinh , chỉnh trạng thái thực tập của thực tập sinh.
- Với role thực tập sinh chỉ có thể sử dụng trang Home.

## Trạng Thái Dự Án
Hiện tại, dự án đang trong giai đoạn phát triển và có nhiều thiếu sót mong mọi người có thể góp ý thêm ạ.

## Ngôn Ngữ Lập Trình và Công Nghệ
- JavaScript
- React.js

## Liên Hệ
- Nếu bạn có bất kỳ câu hỏi hoặc phản hồi, hãy liên hệ tôi qua gia2532000@gmail.com

