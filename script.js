$(document).ready(function() {
    const leftList = $('#left-list');
    const mainList = $('#main-list');

    displaySurah();

    $('#quran-button').click(function() {
        if (!leftList.hasClass('quran-active')) {
            leftList.addClass('quran-active');
            leftList.removeClass('doa-active');
            displaySurah();
        }
    });
    $('#doa-button').click(function() {
        if (!leftList.hasClass('doa-active')) {
            leftList.addClass('doa-active');
            leftList.removeClass('quran-active');
            displayDoa();
        }
    });

    function displaySurah() {
        leftList.empty();
        $.ajax({
            url: 'https://api.npoint.io/99c279bb173a6e28359c/data',
            method: 'GET',
            success: function(data) {
                data.forEach(surah => {
                    const surahItem = $('<div>').addClass('surah-item').html(`<strong>${surah.nomor}.</strong> ${surah.nama} (${surah.arti})`);
                    surahItem.click(function() {
                        displayAyat(surah.nomor);
                    });
                    leftList.append(surahItem);
                });
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }

    function displayAyat(surahNumber) {
        $.ajax({
            url: `https://api.npoint.io/99c279bb173a6e28359c/surat/${surahNumber}`,
            method: 'GET',
            success: function(data) {
                mainList.empty();
                if(surahNumber == 1 || surahNumber == 9) {
                    data.forEach(ayat => {
                        const ayatItem = $('<div>').addClass('ayat-item').html(` <div class="ayat-arab">${ayat.ar}</div> <br> ${ayat.tr} <br> <i class= "terjemah">${ayat.id}</i><strong>(${ayat.nomor})</strong>`);
                        mainList.append(ayatItem);
                    });
                } else {
                    const basmalah = $('<div>').addClass('ayat-item intro').html(`<div class="ayat-arab basmalah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`);
                    mainList.append(basmalah)
                    data.forEach(ayat => {
                        let arabText = ayat.ar;
                        if (ayat.nomor == "1") {
                            arabText = arabText.slice(38); 
                        }
                        const ayatItem = $('<div>').addClass('ayat-item').html(` <div class="ayat-arab">${arabText}</div> <br> <div class="ltn">${ayat.tr}</div> <i class= "terjemah">${ayat.id}</i><strong>(${ayat.nomor})</strong>`);
                        mainList.append(ayatItem);
                    });
    
                }
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }

    function displayDoa() {
        leftList.empty();
        $.ajax({
            url: 'https://open-api.my.id/api/doa',
            method: 'GET',
            success: function(data) {
                data.forEach(doa => {
                    const doaItem = $('<div>').addClass('surah-item').html(`<strong>${doa.id}.</strong> ${doa.judul}`);
                    doaItem.click(function() {
                        displayIsiDoa(doa.id);
                    });
                    leftList.append(doaItem);
                });
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }
    
    function displayIsiDoa(doaNumber) {
        $.ajax({
            url: `https://open-api.my.id/api/doa/${doaNumber}`,
            method: 'GET',
            success: function(data) {
                mainList.empty();
                const ayatItem = $('<div>').addClass('ayat-item').html(`<div class="ayat-arab">${data.arab}</div> <br> ${data.latin} <br> (${data.terjemah})`);
                mainList.append(ayatItem);
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }
});
