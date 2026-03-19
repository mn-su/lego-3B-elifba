
# Elifba - 3D Oyun Atölyesi

Bu depo, Three.js kullanarak hazırlanmış tek sayfalık bir statik uygulama içerir: `elifba.html`.
Uygulama, Elifba'daki harfleri renkli 3B bloklar olarak sahneye yerleştirmeye odaklanan küçük ve çocuk dostu bir oyun atölyesidir.

**Kısa Özeti**
- Dosya: `elifba.html` — tüm HTML, CSS ve JavaScript tek dosyada (Three.js modülleri importmap/CDN üzerinden yüklenir).
- `index.html` (opsiyonel) — kök URL için yönlendirici (varsa) `elifba.html` dosyasına yönlendirir.

**Canlı**
- https://mn-su.github.io/lego-3B-elifba/elifba.html

**Özellikler**
- Çocuk dostu rehber mesajları ve daha sıcak, oyuncu bir arayüz.
- Mobilde taşmayan, güvenli alan uyumlu açılır palet.
- Renk paleti ile blok rengi seçme.
- Harf paleti (Arapça harfler) ve hareke seçimi.
- Zemine dokunarak blok ekleme; silme modu ile blok silme.
- Geri al / ileri al, kaydet / yükle ve yardım kartı.
- OrbitControls ile 3B kamera kontrolü (fare / dokunmatik destekli).


**Bağımlılıklar ve Notlar**
- Three.js modülleri importmap veya CDN üzerinden yüklendiği için internet bağlantısı gerektirebilir.
- Proje tamamen istemci taraflıdır; sunucu tarafı kodu içermez.


**Katkıda Bulunma**
- Hatalar veya öneriler için issue açabilirsiniz veya pull request gönderin.

**İpuçları / Sorun Giderme**
- Eğer sayfa boş görünüyorsa: tarayıcı konsolunu (DevTools) açın; importmap ile yüklenen modüllerin CORS veya ağ hatalarını kontrol edin.
- Performans düşerse sahnedeki fazla objeleri silin veya tarayıcıyı yenileyin.
