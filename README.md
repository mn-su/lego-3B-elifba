# lego-3B-elifba

Bu depo `elifba.html` dosyasını içerir. Aşağıdaki adımları izleyerek GitHub'a yükleyebilir ve sayfayı GitHub Pages ile barındırabilirsiniz.

Yerel olarak test etmek için:

```bash
# Proje dizinine girin
cd /path/to/lego-3B-elifba

# Basit bir statik sunucu (Python 3)
python3 -m http.server 8000

# Tarayıcıda açın: http://localhost:8000/
```

GitHub'a yüklemek için (iki seçenek):

1) `gh` CLI ile (önerilir):

```bash
gh repo create <kullaniciadi>/lego-3B-elifba --public --source=. --remote=origin --push
```

2) Elle (GitHub web arayüzü):

```bash
git remote add origin git@github.com:<kullaniciadi>/lego-3B-elifba.git
git branch -M main
git push -u origin main
```

GitHub Pages ayarı:
- Depo sayfasına gidin -> Settings -> Pages
- Branch olarak `main` ve `root` seçin (veya `gh-pages` branch'i kullanın)
- URL genelde: `https://<kullaniciadi>.github.io/lego-3B-elifba/`

Alternatifler:
- Netlify veya Vercel ile doğrudan GitHub bağlantısı kurarak otomatik dağıtım yapabilirsiniz.
