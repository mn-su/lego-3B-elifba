
# Elifba - 3D LEGO Editör

Bu depo, Three.js kullanarak hazırlanmış tek sayfalık bir statik uygulama içerir: `elifba.html`.
Uygulama, Arap alfabesindeki harfleri bloklar şeklinde sahneye yerleştirip düzenlemeye olanak sağlar — LEGO tarzı 3B bloklarla etkileşim için tasarlanmıştır.

**Kısa Özeti**
- Dosya: `elifba.html` — tüm HTML, CSS ve JavaScript tek dosyada (Three.js modülleri importmap/CDN üzerinden yüklenir).
- `index.html` (opsiyonel) — kök URL için yönlendirici (varsa) `elifba.html` dosyasına yönlendirir.

**Özellikler**
- Renk paleti ile blok rengi seçme.
- Harf paleti (Arapça harfler) ve diakritik/işaret seçimi.
- Zemine tıklayarak blok ekleme; silme modu ile blok silme.
- "Hepsini Sil" butonu ile sahneyi temizleme.
- OrbitControls ile 3B kamera kontrolü (fare/ dokunmatik destekli).

**Yerel Çalıştırma (hızlı)**
1. Depoyu klonlayın:
	```bash
	git clone https://github.com/<kullaniciadi>/lego-3B-elifba.git
	cd lego-3B-elifba
	```
2. Basit bir HTTP sunucusu ile serve edin (tarayıcıda importmap/ESM düzgün çalışması için gereklidir):
	```bash
	python3 -m http.server 8000
	```
	Ardından tarayıcıda `http://localhost:8000/elifba.html` adresini açın.

Alternatif olarak VS Code kullanıyorsanız `Live Server` uzantısını kurup `elifba.html` üzerinde "Open with Live Server" seçeneğini kullanabilirsiniz.

**Bağımlılıklar ve Notlar**
- Three.js modülleri importmap veya CDN üzerinden yüklendiği için internet bağlantısı gerektirebilir.
- Proje tamamen istemci taraflıdır; sunucu tarafı kodu içermez.

**GitHub Pages ile Yayınlama**
1. Repoyu GitHub'a push edin (örnek):
	```bash
	git remote add origin git@github.com:<kullaniciadi>/lego-3B-elifba.git
	git branch -M main
	git push -u origin main
	```
2. GitHub'da repo sayfasından `Settings` → `Pages` kısmına gidip `Source` olarak `main` branch ve `root` seçin.
3. Kısa sürede sayfanız `https://<kullaniciadi>.github.io/lego-3B-elifba/` adresinde yayınlanır. `index.html` bulunduğunda kök URL otomatik çalışacaktır.

**Lisans**
Varsa lisans bilgilerini ekleyin (ör. `LICENSE` dosyası). Eğer özel bir lisans yoksa bu depo için açık bir lisans eklemeyi düşünün (örn. MIT).

**Katkıda Bulunma**
- Hatalar veya öneriler için issue açabilirsiniz veya pull request gönderin.

**İpuçları / Sorun Giderme**
- Eğer sayfa boş görünüyorsa: tarayıcı konsolunu (DevTools) açın; importmap ile yüklenen modüllerin CORS veya ağ hatalarını kontrol edin.
- Performans düşerse sahnedeki fazla objeleri silin veya tarayıcıyı yenileyin.

