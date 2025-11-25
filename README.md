
# Elifba - 3D LEGO Editör

Bu depo, Three.js kullanarak hazırlanmış tek sayfalık bir statik uygulama içerir: `elifba.html`.
Uygulama, Elifba'daki harfleri bloklar şeklinde sahneye yerleştirip düzenlemeye olanak sağlar — LEGO tarzı 3B bloklarla etkileşim için tasarlanmıştır.

**Kısa Özeti**
- Dosya: `elifba.html` — tüm HTML, CSS ve JavaScript tek dosyada (Three.js modülleri importmap/CDN üzerinden yüklenir).
- `index.html` (opsiyonel) — kök URL için yönlendirici (varsa) `elifba.html` dosyasına yönlendirir.

**Özellikler**
- Renk paleti ile blok rengi seçme.
- Harf paleti (Arapça harfler) ve diakritik/işaret(üstün, cezim, vb.) seçimi.
- Zemine tıklayarak blok ekleme; silme modu ile blok silme.
- "Hepsini Sil" butonu ile sahneyi temizleme.
- OrbitControls ile 3B kamera kontrolü (fare/ dokunmatik destekli).


**Bağımlılıklar ve Notlar**
- Three.js modülleri importmap veya CDN üzerinden yüklendiği için internet bağlantısı gerektirebilir.
- Proje tamamen istemci taraflıdır; sunucu tarafı kodu içermez.


**Katkıda Bulunma**
- Hatalar veya öneriler için issue açabilirsiniz veya pull request gönderin.

**İpuçları / Sorun Giderme**
- Eğer sayfa boş görünüyorsa: tarayıcı konsolunu (DevTools) açın; importmap ile yüklenen modüllerin CORS veya ağ hatalarını kontrol edin.
- Performans düşerse sahnedeki fazla objeleri silin veya tarayıcıyı yenileyin.

