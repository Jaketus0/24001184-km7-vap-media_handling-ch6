    buatlah satu aplikasi yang dalamnya mempunyai fitur upload foto profil. Fitur ini akan menyimpan data pengguna (nama, imageFieldId dan URL foto profil) ke database menggunakan Prisma serta mengunggah file gambar ke imageKit

Buat endpoint POST /users/upload-profile yang: 
1. menerima data name(string) dan profileImage (file gambar) dari request form-data
2. mengungah file gambar ke imageKit dan mendapatkan URL gambar serta fileId
3. menyimpan informasi berikut ke dalam database user: 
    name (nama pengguna)
    profileImageUrl (URL dari gambar yang diunggah ke imageKit)

mengembalikan respons JSON berisi data pengguna yang disimpan, yaitu name dan profileImageUrl

untuk endpoint menambahkan image : POST "/add-image"
untuk endpoint menambahkan user : POST "/add-user"
untuk melihat daftar gambar : GET "/get-all-images"
untuk get detail image : GET "/getData/:id"
untuk remove : DELETE "/delete-image/:id"
untuk edit : PUT "/edit-data/:id"

let inputUser = { 
    title: "Lukisan Davinci",
    description: "this is about Davinci", 
    image: file //ini diambil dari req.file
}

1. harus upload ke imagekit dulu, nanti url dari imagekit disimpan ke database
2. harus buat fitur untuk melihat daftar gambar, ini ambilnya dari database 
3. fitur untuk melihat detail, harus pakai req.params.findUnique berdsrkn id
4. fitur hapus gambar, hard delete
5. edit judul dan deskripsi (/+ edit gambar)

table allImage
column: 
1. title
2. description
3. imageUrl
4. imageFieldId


optional : kalau mau tambahin soft delete, harus kasih flagging, dihapus tapi diedit di kolom isActive. Jika value isActivenya true maka akan ditampilkan jika false tidak akan ditampilkan 