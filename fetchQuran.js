// import fs from 'fs';
// import fetch from 'node-fetch';

// async function getQuranData() {
//     try {
//         // Fetch Quran data from multiple APIs
//         const arabicResponse = await fetch("https://api.alquran.cloud/v1/quran/quran-uthmani");
//         const banglaResponse = await fetch("https://api.alquran.cloud/v1/quran/bn.bengali");
//         const englishResponse = await fetch("https://api.alquran.cloud/v1/quran/en.yusufali");
//         const audioResponse = await fetch("https://api.alquran.cloud/v1/quran/ar.alafasy");

//         const arabicData = await arabicResponse.json();
//         const banglaData = await banglaResponse.json();
//         const englishData = await englishResponse.json();
//         const audioData = await audioResponse.json();
 
//         // Check if all responses are successful
//         if (arabicData.code !== 200 || banglaData.code !== 200 || englishData.code !== 200 || audioData.code !== 200) {
//             throw new Error("Failed to fetch one or more data sets");
//         }

//         // Surah-wise ayahs extraction
//         const formattedData = arabicData.data.surahs.map((surah, surahIndex) => ({
//             number: surah.number,
//             name: surah.name,
//             englishName: surah.englishName,
//             englishNameTranslation: surah.englishNameTranslation,
//             revelationType: surah.revelationType,
//             ayahs: surah.ayahs.map((ayah, ayahIndex) => ({
//                 number: ayah.number,
//                 numberInSurah: ayah.numberInSurah,
//                 juz: ayah.juz,
//                 manzil: ayah.manzil,
//                 page: ayah.page,
//                 ruku: ayah.ruku,
//                 sajda: ayah.sajda,
//                 textArabic: ayah.text,
//                 textBangla: banglaData.data.surahs[surahIndex].ayahs[ayahIndex].text,
//                 textEnglish: englishData.data.surahs[surahIndex].ayahs[ayahIndex].text,
//                 audioLink: audioData.data.surahs[surahIndex]?.ayahs[ayahIndex]?.audio || null // Check if audio exists
//             }))
//         }));

//         // Write combined data to JSON file
//         fs.writeFileSync("combine.json", JSON.stringify(formattedData, null, 2), "utf-8");

//         console.log("✅ JSON file created successfully: combine.json");

//     } catch (error) {
//         console.error("❌ Error fetching Quran data:", error);
//     }
// }

// getQuranData();

const responses=fetch('http://localhost:3000/FortyRabbanaDua')