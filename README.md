# AAMstore Midtrans Integration

## Cara Deploy
1. Upload semua file ke GitHub repo.
2. Hubungkan repo ke Vercel.
3. Tambahkan Environment Variable di Vercel:
   - Name: MIDTRANS_SERVER_KEY
   - Value: (Server Key Production dari Midtrans)
4. Edit `index.html`:
   - Ganti data-client-key="" dengan Client Key dari Midtrans.
5. Deploy dan tes tombol "Bayar Sekarang".
