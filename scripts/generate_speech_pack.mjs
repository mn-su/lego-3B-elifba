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
    { key: 'preset.kule', text: 'Kule', voice: 'Yelda', lang: 'tr-TR', rate: 155 },
    { key: 'preset.merdiven', text: 'Merdiven', voice: 'Yelda', lang: 'tr-TR', rate: 155 },
    { key: 'preset.kopru', text: 'Köprü', voice: 'Yelda', lang: 'tr-TR', rate: 155 },
    { key: 'preset.piramit', text: 'Piramit', voice: 'Yelda', lang: 'tr-TR', rate: 155 },
    { key: 'preset.duvar', text: 'Duvar', voice: 'Yelda', lang: 'tr-TR', rate: 155 },
    { key: 'preset.kale', text: 'Kale', voice: 'Yelda', lang: 'tr-TR', rate: 155 },
    { key: 'preset.evkesit', text: 'Ev kesiti', voice: 'Yelda', lang: 'tr-TR', rate: 150 },
    { key: 'preset.odakesit', text: 'Oda kesiti', voice: 'Yelda', lang: 'tr-TR', rate: 150 },
    { key: 'preset.bab.tr', text: 'Kapı', voice: 'Yelda', lang: 'tr-TR', rate: 150 },
    { key: 'preset.bab.ar', text: 'باب', voice: 'Majed', lang: 'ar-SA', rate: 142 },
    { key: 'preset.nur.tr', text: 'Işık', voice: 'Yelda', lang: 'tr-TR', rate: 150 },
    { key: 'preset.nur.ar', text: 'نور', voice: 'Majed', lang: 'ar-SA', rate: 142 },
    { key: 'preset.beyt.tr', text: 'Ev', voice: 'Yelda', lang: 'tr-TR', rate: 150 },
    { key: 'preset.beyt.ar', text: 'بيت', voice: 'Majed', lang: 'ar-SA', rate: 142 },

    { key: 'mission.three-blocks.tr', text: '3 blokluk minik bir yapı kur.', voice: 'Yelda', lang: 'tr-TR', rate: 148 },
    { key: 'mission.orange-pair.tr', text: '2 turuncu blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 148 },
    { key: 'mission.letter-be.tr', text: '2 tane Be harfli blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 148 },
    { key: 'mission.height-two.tr', text: '2 katlı bir yapı kur.', voice: 'Yelda', lang: 'tr-TR', rate: 148 },
    { key: 'mission.three-colors.tr', text: '3 farklı renk kullan.', voice: 'Yelda', lang: 'tr-TR', rate: 148 },
    { key: 'mission.fatha-block.tr', text: 'Üstünlü bir blok ekle.', voice: 'Yelda', lang: 'tr-TR', rate: 148 },
    { key: 'mission.seven-blocks.tr', text: '7 blokluk biraz daha büyük bir yapı kur.', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.orange-trio.tr', text: '3 turuncu blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 148 },
    { key: 'mission.mim-pair.tr', text: '2 tane Mim harfli blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 148 },
    { key: 'mission.height-three.tr', text: '3 katlı bir yapı kur.', voice: 'Yelda', lang: 'tr-TR', rate: 148 },
    { key: 'mission.marked-pair.tr', text: '2 harekeli blok ekle.', voice: 'Yelda', lang: 'tr-TR', rate: 148 },
    { key: 'mission.blue-pair.tr', text: '2 mavi blok yerleştir.', voice: 'Yelda', lang: 'tr-TR', rate: 148 },
    { key: 'mission.wide-base.tr', text: 'Yerde 5 blokluk geniş bir taban kur.', voice: 'Yelda', lang: 'tr-TR', rate: 145 },

    { key: 'mission.name-mustafa.tr', text: 'Mustafa adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.name-mustafa.ar', text: 'مصطفي', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.name-fatima.tr', text: 'Fatima adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.name-fatima.ar', text: 'فاطمه', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.name-emine.tr', text: 'Emine adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.name-emine.ar', text: 'امينه', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.name-ali.tr', text: 'Ali adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.name-ali.ar', text: 'علي', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.name-hasan.tr', text: 'Hasan adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.name-hasan.ar', text: 'حسن', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.name-yusuf.tr', text: 'Yusuf adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.name-yusuf.ar', text: 'يوسف', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.name-meryem.tr', text: 'Meryem adını yaz. Arapça yazılışı', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.name-meryem.ar', text: 'مريم', voice: 'Majed', lang: 'ar-SA', rate: 140 },

    { key: 'mission.fruit-muz.tr', text: 'Muz yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.fruit-muz.ar', text: 'موز', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.fruit-uzum.tr', text: 'Üzüm yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.fruit-uzum.ar', text: 'عنب', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.fruit-elma.tr', text: 'Elma yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.fruit-elma.ar', text: 'تفاح', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.fruit-nar.tr', text: 'Nar yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.fruit-nar.ar', text: 'رمان', voice: 'Majed', lang: 'ar-SA', rate: 140 },

    { key: 'mission.veg-havuc.tr', text: 'Havuç yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.veg-havuc.ar', text: 'جزر', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.veg-sogan.tr', text: 'Soğan yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.veg-sogan.ar', text: 'بصل', voice: 'Majed', lang: 'ar-SA', rate: 140 },

    { key: 'mission.thing-ev.tr', text: 'Ev yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.thing-ev.ar', text: 'بيت', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.thing-kapi.tr', text: 'Kapı yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.thing-kapi.ar', text: 'باب', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.thing-isik.tr', text: 'Işık yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.thing-isik.ar', text: 'نور', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.thing-kitap.tr', text: 'Kitap yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.thing-kitap.ar', text: 'كتاب', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.thing-kalem.tr', text: 'Kalem yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.thing-kalem.ar', text: 'قلم', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.thing-balik.tr', text: 'Balık yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.thing-balik.ar', text: 'سمك', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.thing-gul.tr', text: 'Gül yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.thing-gul.ar', text: 'ورد', voice: 'Majed', lang: 'ar-SA', rate: 140 },
    { key: 'mission.thing-bulut.tr', text: 'Bulut yaz. Arapçası', voice: 'Yelda', lang: 'tr-TR', rate: 145 },
    { key: 'mission.thing-bulut.ar', text: 'سحاب', voice: 'Majed', lang: 'ar-SA', rate: 140 },

    { key: 'celebration.bravo', text: 'Bravo minik usta.', voice: 'Yelda', lang: 'tr-TR', rate: 150 },
    { key: 'celebration.yildiz', text: 'Şahane. Bir yıldız daha kazandın.', voice: 'Yelda', lang: 'tr-TR', rate: 150 },
    { key: 'celebration.harika', text: 'Harika gidiyorsun.', voice: 'Yelda', lang: 'tr-TR', rate: 150 },
    { key: 'celebration.cokguzel', text: 'Çok güzel oldu.', voice: 'Yelda', lang: 'tr-TR', rate: 150 }
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

        fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
        fs.writeFileSync(manifestScriptPath, `window.ELIFBA_AUDIO_PACK = ${JSON.stringify(manifest, null, 2)};\n`, 'utf8');
        console.log(`Wrote ${manifestPath}`);
        console.log(`Wrote ${manifestScriptPath}`);
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
}

main();
