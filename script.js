function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function validateForm() {
    var maBN = document.getElementById("maBN").value;
    var matKhau = document.getElementById("matKhau").value;
    var ngayKham = document.getElementById("ngayKham").value;
    var loaiDichVu = document.querySelectorAll('input[name="loaiDichVu"]:checked');
    var chuyenKhoa = document.getElementById("chuyenKhoa").value;

    // Kiểm tra mã bệnh nhân
    var maBNRegex = /^BN-\d{5}$/;
    if (!maBNRegex.test(maBN)) {
        alert("Mã bệnh nhân không đúng định dạng (BN-YYYYY)!");
        return false;
    }

    // Kiểm tra mật khẩu
    if (matKhau.length < 6) {
        alert("Mật khẩu phải chứa ít nhất 6 ký tự!");
        return false;
    }

    // Kiểm tra ngày khám
    var today = new Date();
    var ngayKhamDate = new Date(ngayKham);
    if (ngayKhamDate <= today) {
        alert("Ngày khám phải sau ngày hiện tại!");
        return false;
    }

    // Tính giá trị phụ thu
    var phuThu = 0;
    for (var i = 0; i < loaiDichVu.length; i++) {
        phuThu += 500000;
    }

    // Tính giá trị chiết khấu
    var chietKhau = 0;
    switch (chuyenKhoa) {
        case "ngoaiTongQuat":
            chietKhau = 0.1;
            break;
        case "nhi":
            chietKhau = 0.2;
            break;
        case "noiTongQuat":
            chietKhau = 0.15;
            break;
        default:
            break;
    }

    // Tính giá trị đơn hàng
    var donHang = 1000000 + phuThu - 1000000 * chietKhau;

    // Thêm dữ liệu vào bảng
    var table = document.querySelector("table");
    var newRow = table.insertRow(-1);
    var sttCell = newRow.insertCell(0);
    var maBNCell = newRow.insertCell(1);
    var matKhauCell = newRow.insertCell(2);
    var ngayKhamCell = newRow.insertCell(3);
    var phuThuCell = newRow.insertCell(4);
    var chuyenKhoaCell = newRow.insertCell(5);
    sttCell.innerHTML = table.rows.length - 1;
    maBNCell.innerHTML = maBN;
    matKhauCell.innerHTML = matKhau;
    ngayKhamCell.innerHTML = ngayKham;
    phuThuCell.innerHTML = phuThu;
    chuyenKhoaCell.innerHTML = chuyenKhoa;

    // Đóng modal
    closeModal();

    return true;
}

function validateForm() {
    var patientCode = document.forms["bookingForm"]["patientCode"].value;
    if (!/^BN-\d{5}$/.test(patientCode)) {
        alert("Mã bệnh nhân không đúng định dạng BN-YYYYY!");
        return false;
    }

    var password = document.forms["bookingForm"]["password"].value;
    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return false;
    }

    var date = document.forms["bookingForm"]["date"].value;
    var today = new Date().toISOString().split("T")[0];
    if (date <= today) {
        alert("Ngày khám phải sau ngày hiện tại!");
        return false;
    }

    var services = document.forms["bookingForm"]["services"];
    var serviceCount = 0;
    for (var i = 0; i < services.length; i++) {
        if (services[i].checked) {
            serviceCount++;
        }
    }
    if (serviceCount == 0) {
        alert("Bạn phải chọn ít nhất một loại dịch vụ!");
        return false;
    }

    var totalPrice = 0;
    if (document.getElementById("specialty").value == "ngoai-tong-quat") {
        totalPrice = 1000000;
    } else if (document.getElementById("specialty").value == "nhi") {
        totalPrice = 900000;
    } else if (document.getElementById("specialty").value == "noi-tong-quat") {
        totalPrice = 800000;
    }
    totalPrice += serviceCount * 500000;
    alert("Tổng tiền: " + totalPrice + " VNĐ");

    var table = document.getElementById("bookingTable");
    var row = table.insertRow(-1);
    var countCell = row.insertCell(0);
    var patientCodeCell = row.insertCell(1);
    var dateCell = row.insertCell(2);
    var servicesCell = row.insertCell(3);
    var specialtyCell = row.insertCell(4);
    var totalPriceCell = row.insertCell(5);
    countCell.innerHTML = table.rows.length - 1;
    patientCodeCell.innerHTML = patientCode;
    dateCell.innerHTML = date;
    var servicesText = "";
    for (var i = 0; i < services.length; i++) {
        if (services[i].checked) {
            servicesText += services[i].value + "<br>";
        }
    }
    servicesCell.innerHTML = servicesText;
    specialtyCell.innerHTML = document.getElementById("specialty").value;
    totalPriceCell.innerHTML = totalPrice;

    document.getElementById("bookingModal").style.display = "none";
    return true;
}