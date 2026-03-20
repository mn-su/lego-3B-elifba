#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const audioDir = path.join(rootDir, 'audio');
const generatedDir = path.join(audioDir, 'generated');
const manifestPath = path.join(audioDir, 'speech-pack.json');
const manifestScriptPath = path.join(audioDir, 'speech-pack.js');

const cues = [
    { key: 'preset.kule', text: 'Kule', voice: 'Yelda', lang: 'tr-TR', rate: 115 },
    { key: 'preset.merdiven', text: 'Merdiven', voice: 'Yelda', lang: 'tr-TR', rate: 115 },
    { key: 'preset.kopru', text: 'Köprü', voice: 'Yelda', lang: 'tr-TR', rate: 115 },
    { key: 'preset.piramit', text: 'Piramit', voice: 'Yelda', lang: 'tr-TR', rate: 115 },
    { key: 'preset.duvar', text: 'Duvar', voice: 'Yelda', lang: 'tr-TR', rate: 115 },
    { key: 'preset.kale', text: 'Kale', voice: 'Yelda', lang: 'tr-TR', rate: 115 },
    { key: 'preset.evkesit', text: 'Ev kesiti', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.odakesit', text: 'Oda kesiti', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.bab.tr', text: 'Kapı', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.bab.ar', text: 'باب', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.nur.tr', text: 'Işık', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.nur.ar', text: 'نور', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.beyt.tr', text: 'Ev', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.beyt.ar', text: 'بيت', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.arz.tr', text: 'Yer', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.arz.ar', text: 'أرض', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.sema.tr', text: 'Gök', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.sema.ar', text: 'سماء', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.kamer.tr', text: 'Ay', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.kamer.ar', text: 'قمر', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.sems.tr', text: 'Güneş', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.sems.ar', text: 'شمس', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.kalb.tr', text: 'Kalp', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.kalb.ar', text: 'قلب', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.ilm.tr', text: 'İlim', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.ilm.ar', text: 'علم', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.kitab.tr', text: 'Kitap', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.kitab.ar', text: 'كتاب', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.kalem.tr', text: 'Kalem', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.kalem.ar', text: 'قلم', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.verd.tr', text: 'Gül', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.verd.ar', text: 'ورد', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.ayn.tr', text: 'Göz', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.ayn.ar', text: 'عين', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.ehl.tr', text: 'Aile', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.ehl.ar', text: 'أهل', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.yed.tr', text: 'El', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.yed.ar', text: 'يد', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.hubb.tr', text: 'Sevgi', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.hubb.ar', text: 'حب', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.selam.tr', text: 'Selam', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.selam.ar', text: 'سلام', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.hayr.tr', text: 'Hayır', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.hayr.ar', text: 'خير', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.hakk.tr', text: 'Hak', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.hakk.ar', text: 'حق', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'preset.balik.tr', text: 'Balık', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'preset.balik.ar', text: 'سمك', voice: 'Majed', lang: 'ar-SA', rate: 105 },

    { key: 'mission.three-blocks.tr', text: '3 blokluk minik bir yapı kur.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.orange-pair.tr', text: '2 turuncu blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.letter-be.tr', text: '2 tane Be harfli blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.height-two.tr', text: '2 katlı bir yapı kur.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.three-colors.tr', text: '3 farklı renk kullan.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.fatha-block.tr', text: 'Üstünlü bir blok ekle.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.seven-blocks.tr', text: '7 blokluk biraz daha büyük bir yapı kur.', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.orange-trio.tr', text: '3 turuncu blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.letter-mim.tr', text: '2 tane Mim harfli blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.letter-elif.tr', text: '3 tane Elif harfli blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.letter-lam.tr', text: '2 tane Lam harfli blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.letter-sin.tr', text: '2 tane Sin harfli blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.height-three.tr', text: '3 katlı bir yapı kur.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.marked-pair.tr', text: '2 harekeli blok ekle.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.blue-pair.tr', text: '2 mavi blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.green-pair.tr', text: '2 yeşil blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'mission.wide-base.tr', text: 'Yerde 5 blokluk geniş bir taban kur.', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.word-arz.tr', text: 'Yer yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.word-arz.ar', text: 'ارض', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.word-sema.tr', text: 'Gök yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.word-sema.ar', text: 'سما', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.word-kamer.tr', text: 'Ay yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.word-kamer.ar', text: 'قمر', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.word-sems.tr', text: 'Güneş yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.word-sems.ar', text: 'شمس', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.word-kalb.tr', text: 'Kalp yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.word-kalb.ar', text: 'قلب', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.word-ilm.tr', text: 'İlim yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.word-ilm.ar', text: 'علم', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.word-verd.tr', text: 'Gül yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.word-verd.ar', text: 'ورد', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.word-selam.tr', text: 'Selam yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.word-selam.ar', text: 'سلام', voice: 'Majed', lang: 'ar-SA', rate: 105 },

    { key: 'mission.name-mustafa.tr', text: 'Mustafa adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.name-mustafa.ar', text: 'مصطفي', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.name-fatima.tr', text: 'Fatima adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.name-fatima.ar', text: 'فاطمه', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.name-emine.tr', text: 'Emine adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.name-emine.ar', text: 'امينه', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.name-ali.tr', text: 'Ali adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.name-ali.ar', text: 'علي', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.name-hasan.tr', text: 'Hasan adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.name-hasan.ar', text: 'حسن', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.name-yusuf.tr', text: 'Yusuf adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.name-yusuf.ar', text: 'يوسف', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.name-meryem.tr', text: 'Meryem adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.name-meryem.ar', text: 'مريم', voice: 'Majed', lang: 'ar-SA', rate: 105 },

    { key: 'mission.fruit-muz.tr', text: 'Muz yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.fruit-muz.ar', text: 'موز', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.fruit-uzum.tr', text: 'Üzüm yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.fruit-uzum.ar', text: 'عنب', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.fruit-elma.tr', text: 'Elma yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.fruit-elma.ar', text: 'تفاح', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.fruit-nar.tr', text: 'Nar yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.fruit-nar.ar', text: 'رمان', voice: 'Majed', lang: 'ar-SA', rate: 105 },

    { key: 'mission.veg-havuc.tr', text: 'Havuç yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.veg-havuc.ar', text: 'جزر', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.veg-sogan.tr', text: 'Soğan yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.veg-sogan.ar', text: 'بصل', voice: 'Majed', lang: 'ar-SA', rate: 105 },

    { key: 'mission.thing-ev.tr', text: 'Ev yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.thing-ev.ar', text: 'بيت', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.thing-kapi.tr', text: 'Kapı yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.thing-kapi.ar', text: 'باب', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.thing-isik.tr', text: 'Işık yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.thing-isik.ar', text: 'نور', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.thing-kitap.tr', text: 'Kitap yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.thing-kitap.ar', text: 'كتاب', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.thing-kalem.tr', text: 'Kalem yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.thing-kalem.ar', text: 'قلم', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.thing-balik.tr', text: 'Balık yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.thing-balik.ar', text: 'سمك', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.thing-gul.tr', text: 'Gül yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.thing-gul.ar', text: 'ورد', voice: 'Majed', lang: 'ar-SA', rate: 105 },
    { key: 'mission.thing-bulut.tr', text: 'Bulut yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 108 },
    { key: 'mission.thing-bulut.ar', text: 'سحاب', voice: 'Majed', lang: 'ar-SA', rate: 105 },

    { key: 'celebration.bravo', text: 'Bravo minik usta.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'celebration.yildiz', text: 'Şahane. Bir yıldız daha kazandın.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'celebration.harika', text: 'Harika gidiyorsun.', voice: 'Yelda', lang: 'tr-TR', rate: 110 },
    { key: 'celebration.cokguzel', text: 'Çok güzel oldu.', voice: 'Yelda', lang: 'tr-TR', rate: 110 }
];

function runCommand(command, args) {
    const result = spawnSync(command, args, { stdio: 'inherit' });
    if (result.status !== 0) {
        throw new Error(`${command} failed with exit code ${result.status}`);
    }
}

function slugify(key) {
    return key.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
}

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function main() {
    ensureDir(audioDir);
    ensureDir(generatedDir);

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'elifba-speech-pack-'));
    const manifest = {
        generatedAt: new Date().toISOString(),
        engine: 'macos-say',
        format: 'mp3',
        cues: {}
    };

    try {
        for (const cue of cues) {
            const baseName = `${slugify(cue.key)}.mp3`;
            const tempAiff = path.join(tempDir, `${slugify(cue.key)}.aiff`);
            const outputPath = path.join(generatedDir, baseName);

            console.log(`Generating ${cue.key}`);
            runCommand('/usr/bin/say', ['-v', cue.voice, '-r', String(cue.rate), '-o', tempAiff, cue.text]);
            runCommand('ffmpeg', ['-y', '-i', tempAiff, '-ac', '1', '-codec:a', 'libmp3lame', '-q:a', '4', outputPath]);

            manifest.cues[cue.key] = {
                src: `audio/generated/${baseName}`,
                text: cue.text,
                lang: cue.lang,
                voice: cue.voice
            };
        }

        // ─── Gerçek harf sesleri: audio/letters/letter-*.mp3 ──────────────
        // Bu dosyalar download_arabic_letters.py ile indirilir.
        // Her dosya için manifest'e bir `letter.X` key eklenir.
        const letterDir = path.join(audioDir, 'letters');
        const letterMap = {
            'alif':  '\u0627',
            'ba':    '\u0628',
            'ta':    '\u062a',
            'tha':   '\u062b',
            'jeem':  '\u062c',
            'haa':   '\u062d',
            'khaa':  '\u062e',
            'dal':   'د',
            'dhal':  '\u0630',
            'ra':    '\u0631',
            'zay':   '\u0632',
            'seen':  '\u0633',
            'sheen': '\u0634',
            'saad':  '\u0635',
            'dhaad': '\u0636',
            'toa':   '\u0637',
            'dhaa':  '\u0638',
            'ain':   '\u0639',
            'ghain': '\u063a',
            'faa':   '\u0641',
            'qaaf':  '\u0642',
            'kaaf':  '\u0643',
            'laam':  '\u0644',
            'meem':  '\u0645',
            'noon':  '\u0646',
            'ha':    '\u0647',
            'waw':   '\u0648',
            'yaa':   '\u064a',
        };

        if (fs.existsSync(letterDir)) {
            for (const [name, unicode] of Object.entries(letterMap)) {
                const filePath = path.join(letterDir, `letter-${name}.mp3`);
                if (fs.existsSync(filePath)) {
                    manifest.cues[`letter.${unicode}`] = {
                        src: `audio/letters/letter-${name}.mp3`,
                        text: unicode,
                        lang: 'ar-SA',
                        voice: 'real-recording'
                    };
                }
            }
            const letterCount = Object.keys(manifest.cues).filter(k => k.startsWith('letter.')).length;
            console.log(`Harf sesleri eklendi: ${letterCount} / ${Object.keys(letterMap).length}`);
        }

        fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
        fs.writeFileSync(manifestScriptPath, `window.ELIFBA_AUDIO_PACK = ${JSON.stringify(manifest, null, 2)};\n`, 'utf8');
        console.log(`Wrote ${manifestPath}`);
        console.log(`Wrote ${manifestScriptPath}`);
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
}

main();
