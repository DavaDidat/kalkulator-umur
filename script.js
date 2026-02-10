// mengimpor library flatpickr dan luxon
const { DateTime } = luxon;

// menginisialisasi flatpickr pada input dengan id "birthdate"
flatpickr("#birthdate", {
  dateFormat: "Y-m-d",
  maxDate: "today",
});

// untuk mengambil elemen-elemen dari html
const form = document.getElementById("ageForm");
const birthdateInput = document.getElementById("birthdate");
const errorMessage = document.getElementById("errorMessage");
const result = document.getElementById("result");

// menambahkan event listener pada form saat disubmit
form.addEventListener("submit", function (e) {
  e.preventDefault(); // mencegah reload halaman saat submit

  const birthdateValue = birthdateInput.value;

  // untuk meriset tampilan error dan hasil
  errorMessage.textContent = "";
  birthdateInput.style.borderColor = "";
  result.textContent = "";

  // error handling jika input tanggal lahir kosong
  if (!birthdateValue) {
    errorMessage.textContent = "Tanggal lahir wajib diisi.⚠️";
    birthdateInput.style.borderColor = "red";

    // Restart animasi
    errorMessage.classList.remove("error");
    void errorMessage.offsetWidth;
    errorMessage.classList.add("error");

    return;
  }

  // menghitung umur menggunakan luxon
  const birthdate = DateTime.fromISO(birthdateValue);
  const today = DateTime.now();

  // untuk menghitung umur dalam tahun, bulan, dan hari
  const age = today.diff(birthdate, ["years", "months", "days"]).toObject();

  // menampilkan hasil umur
  result.textContent = `Umur kamu: ${age.years} tahun, ${age.months} bulan, ${Math.floor(age.days)} hari`;
});
