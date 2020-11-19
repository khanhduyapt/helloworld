module.exports = {
  users: [
    { id: "Am01", name: "DuyDk", role: ROLE.ADMIN },
    { id: "TC60", name: "Đỗ Trọng Nghĩa", role: ROLE.TEACHER },
    { id: "TC61", name: "Hoàng Lê Hải Yến", role: ROLE.TEACHER },
    { id: "HS06", name: "Nguyễn Ngọc Bảo Hân", role: ROLE.STUDENT },
  ],
  Courses: [
    {
      id: 1,
      name: "Thêm/sửa/xóa phân công giáo viên & học viên",
      userId: "Am01",
    },
    { id: 2, name: "Lớp PK509", userId: "TC61" },
    { id: 3, name: "Lớp PK747", userId: "TC61" },
    { id: 4, name: "Lớp PK439 UPSALE", userId: "TC61" },
    { id: 5, name: "Lớp PK810 UPSALE", userId: "TC61" },
    { id: 6, name: "Lớp PK1113 UPSALE", userId: "TC61" },
    { id: 7, name: "Lớp PK509", userId: "TC61" },
    { id: 8, name: "Danh sách lớp của Gv>Đỗ Trọng Nghĩa", userId: "TC60" },
    { id: 9, name: "Hs>Hân's Project", userId: "HS06" },
  ],
};
