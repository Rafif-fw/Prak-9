// Data penjualan
const salesData = [150, 123, 180, 240, 350, 210, 190];
const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

// Membuat grafik batang
const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: days,
        datasets: [{
            label: 'Penjualan Produk',
            data: salesData,
            backgroundColor: 'rgba(255, 105, 180, 0.2)', // Warna pink dengan transparansi
            borderColor: 'rgba(255, 105, 180, 1)', // Warna pink penuh
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Fungsi untuk menghitung pendapatan
const calculateRevenue = (sales) => sales * 1000; // Contoh: harga produk adalah 1000

// Fungsi untuk membuat dan mengunduh PDF
document.getElementById('downloadPDF').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;

    // Buat dokumen jsPDF baru
    const doc = new jsPDF();

    // Tentukan ukuran font dan judul
    const title = 'Laporan Penjualan Produk Mingguan';
    const fontSize = 18;

    // Set ukuran font
    doc.setFontSize(fontSize);

    // Hitung posisi x untuk teks agar berada di tengah halaman
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const textX = (pageWidth - textWidth) / 2;

    // Tambahkan teks judul di posisi yang telah dihitung
    doc.text(title, textX, 22);

    // Tambahkan grafik
    const chartDataUrl = document.getElementById('salesChart').toDataURL('image/png');
    doc.addImage(chartDataUrl, 'PNG', 15, 30, 180, 90);

    // Tambahkan tabel
    const tableData = days.map((day, index) => [day, salesData[index], calculateRevenue(salesData[index])]);
    doc.autoTable({
        head: [['Hari', 'Produk Terjual', 'Pendapatan']],
        body: tableData,
        startY: 130,
        theme: 'grid',
        styles: {
            halign: 'center',
            fillColor: [255, 182, 193] // Warna pink untuk latar belakang sel
        },
        headStyles: {
            fillColor: [255, 105, 180] // Warna pink lebih gelap untuk header tabel
        }
    });

    // Unduh PDF
    doc.save('penjualan_produk.pdf');
});
