var glbEkranWidth = $(window).width();
var glbDagitilmisArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var glbCevapIndex = 0;
var glbKelime;
var glbSoru;
var glbCevapArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var glbKelimedeVar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var glbatmajokerikullanildi = 0;
var glbCevapKalanSure;
var glbSureCounter;
var glbDogruCevapVerildi = 0;
var glbfazlaharfvar;
var GuncellemeArr = [];
var glbguncellemesayi = 0;
var glbguncellemeindex = 0;
var glbKelimeId;
var glblw;
var glbAudioToggleCorrectBd = 0;
var glbEkranKontrol = 0; //0: zaman butonuna bas?labiliyor, 
                         //1: zaman butonu d???nda basilabiliyor
                         //2: sonuc mesaj? gösteriliyor (hicbir seye basilamiyor)
var glblinearr = [];
var glbCikmisSorular = [];
var glblinearrind = 0;
$(document).on("pagecreate", "#pagesorucevap", function () {
    $(".ui-loader").hide();
    if (glbOyunTur == 'en') {
        $("#imgYeniKelimeButon").attr('src', 'img/yenikelimebtn_eng.png');
   
        $("#infharfal").html('letter');
        $("#infilkharfal").html('first letter');
        $("#inffazlalariat").html('remove letter');
        $("#infsureal").html('extra time');
    }
    function GoSonucEkran() {
        $("#divwholepage").animate({
            opacity: '0.6'
        }, 200);
        setTimeout(
            function () {              
                $("#afterdivwholepage").fadeIn(500);
            }, 300);
        //$("#divwholepage").animate({
        //    opacity: '0.6'
        //}, 500, function () {
        //    $("#divwholepage").fadeOut(500);
        //    $("#afterdivwholepage").fadeIn(500);
        //}); 
    }
    function LevelAyarla(ilk) {
        //alert('ayarl?yorum');
        $("#divKalanCan").html(GetCookie('KalanCan'));
        //if (Number(GetCookie('KullaniciLevel'))!=0)

        for (i = 1; i <= glbLevelSayi; i++) {
            if (i<=Number(GetCookie('KullaniciLevel')))
                $(".spnlevel").eq(i-1).css("background-color", "#D27216");
        }

        var lefti = (glblw - 2) * (Number(GetCookie('KullaniciLevel'))-11)+2;
        //$("#imgOwl").css('left', left + 'px');
      
        $("#imgOwl").animate({
            left: lefti,
        }, 500, function () {
            //alert('gosoek');
            if (ilk!=1)
                GoSonucEkran();
        });
    }
    function CountKelime(lines) {       
        //alert(lines);
        var seviye = Math.ceil(Number(GetCookie('KullaniciLevel')) / 5);
        //alert(seviye);
        var sqlstr = "SELECT COUNT(*) sayi FROM Kelime";

        db.transaction(function (tx) {
            tx.executeSql(sqlstr,
                [], function (tx, results) {
                    for (i = 0; i < results.rows.length; i++) {
                        glblinearrind = results.rows.item(0).sayi;
                        //alert(glblinearrind);
                        glblinearr = lines.split('&');
                        var itemarray;
                        itemarray = glblinearr[glblinearrind].split('#');

                        InsertTable(itemarray[0], itemarray[1], itemarray[2], itemarray[3]);
                    }
                });
        }, null);
    }
    function readTextFile(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    CountKelime(allText);
                }
            }
        }
        rawFile.send(null);
    }
    function InsertTable(id, kelime, soru, seviye) {
        glblinearrind++;
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO Kelime (Id,Kelime,Soru,Seviye) VALUES (?,?,?,?)',
                //[3, 'pkelime', 'psoru', 1],
                [id, kelime, soru, seviye],
                function (tx, res) {
                    //alert(glblinearrind);
                    //alert(glblinearr.length);
                    if (glblinearrind < glblinearr.length-1) {

                        var itemarray;
                        itemarray = glblinearr[glblinearrind].split('#');
                        InsertTable(itemarray[0], itemarray[1], itemarray[2], itemarray[3]);
                    }
                    else {
                        SetCookie('DosyaYuklemeBitti',1)
                        //alert('bitti :' + glblinearr.length);
                    }

                },
                function (tx, res) {
                    alert('error: ' + res.message);
                });
        }, null);
    }

    function CevapBuyuklukAyarla() {
        if (glbScreenType == 'IPhone5') { //320
            if (glbKelime.length > 8) {
                $(".maincevap").css('width', '29px');
                $(".maincevap").css('height', '26px');
            }
            else if (glbKelime.length > 6) {
                $(".maincevap").css('width', '35px');
                $(".maincevap").css('height', '32px');
            }
            else {
                $(".maincevap").css('width', '40px');
                $(".maincevap").css('height', '36px');
            }
        }
        else if (glbScreenType == 'Galaxy') { //360
            if (glbKelime.length > 8) {
                $(".maincevap").css('width', '34px');
                $(".maincevap").css('height', '31px');
            }
            else if (glbKelime.length > 6) {
                $(".maincevap").css('width', '40px');
                $(".maincevap").css('height', '36px');
            }
            else {
                $(".maincevap").css('width', '45px');
                $(".maincevap").css('height', '41px');
            }
        }
        else if (glbScreenType == 'IPhone6') {//375
            $("#spnSoru").css('font-size', '1.3em');
            if (glbKelime.length > 8) {
                $(".maincevap").css('width', '34px');
                $(".maincevap").css('height', '31px');
            }
            else if (glbKelime.length > 6) {
                $(".maincevap").css('width', '40px');
                $(".maincevap").css('height', '36px');
            }
            else {
                $(".maincevap").css('width', '46px');
                $(".maincevap").css('height', '42px');
            }
        }
        else if (glbScreenType == 'Phone395') {//395
            $("#spnSoru").css('font-size', '1.4em');
            if (glbKelime.length > 8) {
                $(".maincevap").css('width', '36px');
                $(".maincevap").css('height', '33px');
            }
            else if (glbKelime.length > 6) {
                $(".maincevap").css('width', '42px');
                $(".maincevap").css('height', '38px');
            }
            else {
                $(".maincevap").css('width', '48px');
                $(".maincevap").css('height', '44px');
            }
        }
        else if (glbScreenType == 'IPhone6P') {//414
            $("#spnSoru").css('font-size', '1.5em');
            if (glbKelime.length > 8) {
                $(".maincevap").css('width', '37px');
                $(".maincevap").css('height', '34px');
            }
            else if (glbKelime.length > 6) {
                $(".maincevap").css('width', '44px');
                $(".maincevap").css('height', '40px');
            }
            else {
                $(".maincevap").css('width', '50px');
                $(".maincevap").css('height', '46px');
            }
        }
        else if (glbScreenType == 'LGLexus') {//432
            $("#spnSoru").css('font-size', '1.6em');
            if (glbKelime.length > 8) {
                $(".maincevap").css('width', '39px');
                $(".maincevap").css('height', '36px');
            }
            else if (glbKelime.length > 6) {
                $(".maincevap").css('width', '46px');
                $(".maincevap").css('height', '42px');
            }
            else {
                $(".maincevap").css('width', '52px');
                $(".maincevap").css('height', '48px');
            }
        }
        else if (glbScreenType == 'IPhone455') {//455
            $("#spnSoru").css('font-size', '1.6em');
            if (glbKelime.length > 8) {
                $(".maincevap").css('width', '41px');
                $(".maincevap").css('height', '38px');
            }
            else if (glbKelime.length > 6) {
                $(".maincevap").css('width', '48px');
                $(".maincevap").css('height', '44px');
            }
            else {
                $(".maincevap").css('width', '54px');
                $(".maincevap").css('height', '50px');
            }
        }
        else if (glbScreenType == 'IPhone500') {//500
            $("#spnSoru").css('font-size', '1.7em');
            if (glbKelime.length > 8) {
                $(".maincevap").css('width', '45px');
                $(".maincevap").css('height', '42px');
            }
            else if (glbKelime.length > 6) {
                $(".maincevap").css('width', '53px');
                $(".maincevap").css('height', '49px');
            }
            else {
                $(".maincevap").css('width', '59px');
                $(".maincevap").css('height', '55px');
            }
        }
        else if (glbScreenType == 'Bigger1') {//600
            $("#spnSoru").css('font-size', '1.8em');
            if (glbKelime.length > 8) {
                $(".maincevap").css('width', '55px');
                $(".maincevap").css('height', '51px');
            }
            else if (glbKelime.length > 6) {
                $(".maincevap").css('width', '60px');
                $(".maincevap").css('height', '56px');
            }
            else {
                $(".maincevap").css('width', '70px');
                $(".maincevap").css('height', '65px');
            }
        }
        else if (glbScreenType == 'ipad') {//750
            $("#spnSoru").css('font-size', '1.8em');
            if (glbKelime.length > 8) {
                $(".maincevap").css('width', '65px');
                $(".maincevap").css('height', '61px');
            }
            else if (glbKelime.length > 6) {
                $(".maincevap").css('width', '70px');
                $(".maincevap").css('height', '65px');
            }
            else {
                $(".maincevap").css('width', '75px');
                $(".maincevap").css('height', '70px');
            }
        }
        else if (glbScreenType == 'ipadpro') {//1000
            $("#spnSoru").css('font-size', '2em');
            if (glbKelime.length > 8) {
                $(".maincevap").css('width', '90px');
                $(".maincevap").css('height', '85px');
            }
            else if (glbKelime.length > 6) {
                $(".maincevap").css('width', '95px');
                $(".maincevap").css('height', '90px');
            }
            else {
                $(".maincevap").css('width', '100px');
                $(".maincevap").css('height', '93px');
            }
        }
    }
    function YeniSoruGetir(seviye) {
        SetCookie("KalanCan", Number(GetCookie("KalanCan")) - 1);
        $(".gamestart").get(0).play();
        //alert(GetCookie('KullaniciLevel'));
        var seviye = Math.ceil((Number(GetCookie('KullaniciLevel')) + 1) / 4);
        //alert(seviye);
        var sqlstr = "SELECT Id,Kelime,Soru,Seviye FROM Kelime "
            + " where Seviye= " + seviye;
        db.transaction(function (tx) {
            tx.executeSql(sqlstr,
                [], function (tx, results) {
                    for (i = 0; i < results.rows.length; i++) {
                        //alert(results.rows.length);

                        rdnindex = Math.floor(Math.random() * results.rows.length);
                        //glbKelime = "a=qk sxzl+"
                        glbKelime = results.rows.item(rdnindex).Kelime;
                        glbSoru = results.rows.item(rdnindex).Soru;
                        glbKelimeId = results.rows.item(rdnindex).Id;
                        sorucikmis = 0;
                        for (j = 0; j < glbCikmisSorular.length; j++) {
                            if (glbCikmisSorular[j] == glbKelimeId) {
                                j = glbCikmisSorular.length;
                                sorucikmis = 1;
                            }
                        }
                        if (sorucikmis == 0) {
                            glbCikmisSorular[glbCikmisSorular.length] = glbKelimeId;
                            i = results.rows.length;
                        }
                    }

                    if (glbOyunTur == "tr") {
                        glbSoru = glbSoru.replace(/q/gi, "%u0131");
                        glbSoru = glbSoru.replace(/w/gi, "%u015F");
                        glbSoru = glbSoru.replace(/x/gi, "%F6");
                        glbSoru = glbSoru.replace(/!/gi, "%FC");
                        glbSoru = glbSoru.replace(/_/gi, "%u011F");
                        glbSoru = glbSoru.replace(/-/gi, "%E7");
                    }

                    //alert(results.rows.item(rdnindex).Kelime);
                    //glbKelime = 'ned nedir';
                    //glbKelime = 'qwx=';
                    //glbKelime = "ned";
                    YeniSoruDagit(glbKelime, glbSoru);
                    CevapYap();
                });
        }, null);
    }
    function SonIsler(sonuc) {
        var kalancan = GetCookie('KalanCan');
        if (Number(GetCookie('KullaniciLevel')) > Number(GetCookie('KullaniciRekor')))
            SetCookie('KullaniciRekor', GetCookie('KullaniciLevel'));
        if (sonuc == 1) {
            $(".levelup").get(0).play();
            $("#imgYeniKelime").attr('src', 'img/bravobg.png');
            //$("#spnPlusTen").html("Bravo!");
        }
        else {
            $(".wrongbest").get(0).play();
            if (glbOyunTur == 'en') 
                $("#imgYeniKelime").attr('src', 'img/suredoldubg_eng.png');
            else
                $("#imgYeniKelime").attr('src', 'img/suredoldubg.png');
        }
        EkranReset();
        LevelAyarla(0);
        //var yenikelimebtnwidth = $("#imgYeniKelimeButon").attr('width');
        //var yenikelimebtnwidthbig = (Number(yenikelimebtnwidth) * 1.1).toFixed(0);
        //$("#afterdivwholepage").fadeIn(500); 
    }
    function SonucKaydet(sonuc) {
        var cevaplamasayi;
        var dogrucevapsayisi;
        var dogrucevap = Number(sonuc);
        db.transaction(function (tx) {
            tx.executeSql('SELECT DogruCevapSayi,CevaplamaSayi FROM Sonuclar where Id=' + glbKelimeId, [], function (tx, results) {
                if (results.rows.length > 0) {

                    cevaplamasayi = Number(results.rows.item(0).CevaplamaSayi) + 1;
                    if (sonuc == 1)
                        dogrucevapsayisi = Number(results.rows.item(0).DogruCevapSayi) + 1;
                    else
                        dogrucevapsayisi = Number(results.rows.item(0).DogruCevapSayi);
                    //updatestr = "UPDATE Sonuclar SET DogruCevapSayi=" + dogrucevapsayisi
                    //    + ", CevaplamaSayi=" + cevaplamasayi
                    //    + " where Id=" + glbKelimeId;
                    updatestr = "UPDATE Sonuclar SET DogruCevapSayi=?,CevaplamaSayi=?"
                        + " where Id=?";
                    //alert(updatestr);
                    //alert('updating');
                    tx.executeSql(updatestr, [dogrucevapsayisi, cevaplamasayi, glbKelimeId], function (tx, result) {
                        //alert('updated son isler');
                        SonIsler(sonuc);
                    },
                        function (error) {
                            //alert('Error occurred');
                    });
                }
                else {
                    tx.executeSql('INSERT INTO Sonuclar (Id,DogruCevapSayi,CevaplamaSayi) VALUES (?,?,?)'
                        , [glbKelimeId, dogrucevap, 1], function (tx, result) {
                            //alert('inserted ');
                            SonIsler(sonuc);
                        },
                        function (error) {
                            //alert('Error occurred');
                        });
                }
            });
        }, null);
    }
    function SonucMesaj(sonuc) {
        $(".countdown").get(0).pause();
        $(".countdown").get(0).currentTime = 0;
        SonucKaydet(sonuc);     
    }
    function timer() {
        if (glbCevapKalanSure > 0)
            glbCevapKalanSure = glbCevapKalanSure - 1;
        //if (glbCevapKalanSure == 5) {
        //    if (glbSesAcik == '1') {
        //        $(".countdown").get(0).play();
        //    }
        //}
        if (glbCevapKalanSure == 10) {
            $(".countdown").get(0).play();
        }
        if (glbCevapKalanSure <= 0) {
            glbEkranKontrol = 2;
            clearInterval(glbSureCounter);
            $("#timer").html(glbCevapKalanSure);
            if (glbDogruCevapVerildi == 0) {                
                $("#divwholepage").animate({
                    opacity: '0.6'
                }, 500, function () {
                    $("#divwholepage").fadeOut(500);
                });               
                setTimeout(function () {
                    SonucMesaj(0);
                }, 1000);
                               
            }
        }
        else {
            $("#timer").html(glbCevapKalanSure);
        }
    }
    function GetImg(i) {
        if (i == 0)
            img = $(".img1");
        else if (i == 1)
            img = $(".img2");
        else if (i == 2)
            img = $(".img3");
        else if (i == 3)
            img = $(".img4");
        else if (i == 4)
            img = $(".img5");
        else if (i == 5)
            img = $(".img6");
        else if (i == 6)
            img = $(".img7");
        else if (i == 7)
            img = $(".img8");
        else if (i == 8)
            img = $(".img9");
        else if (i == 9)
            img = $(".img10");
        else if (i == 10)
            img = $(".img11");
        return img;
    }
    function DisplayHarf(i, harf, harfek) {
        var img;
        var imgurl;
        var harfyeni;
        // q : ?
        // w : ?
        // x : ö
        // + : ü
        // _ : ?
        // % : ç
        //alert('harf:'+harf);
        //alert(glbOyunTur);
        if (glbOyunTur == "tr") {
            if (harf == "w")
                harfyeni = "ss";
            else if (harf == "x")
                harfyeni = "oo";
            else if (harf == "q")
                harfyeni = "ii";
            else if (harf == "!")
                harfyeni = "uu";
            else if (harf == "_")
                harfyeni = "gg";
            else if (harf == "-")
                harfyeni = "cc";
            else
                harfyeni = harf;
        }
        else {
            //alert('harfyeni1:' + harfyeni);
            harfyeni = harf;
        }
        //alert('harfyeni:'+harfyeni);
        if (harf == " "){
            harfyeni = "space";
        }
        img = GetImg(i);
        if (harfek=="bos")
            imgurl = 'url("img/alfabe/bos.png")';
        else
            imgurl = 'url("img/alfabe/' + harfyeni + harfek + '.png")';
        img.css('background-image', imgurl);
        //img.css('background-image', 'url("a.png")');
    }

    function YeniSoruDagit(kelime, soru) {
        //alert('ysd:')
        $("#spnSoru").html(unescape(soru));
        glbfazlaharfvar = 0;
        glbDogruCevapVerildi = 0;
        glbatmajokerikullanildi = 0;
        glbCevapKalanSure = GetCookie('CevapSure');
        glbSureCounter = setInterval(timer, 1000); //1000 will  run it every 1 second
        //}
        var harf = "";
        var hexind;
        var hexagonsayi;
        //if (kelime.length <= 7)
        //    hexagonsayi = 7;
        //else
        hexagonsayi = 11;

        var hexagonarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var engalp = "abcdefghijklmnopqrstuvwxyz"; //26
        if (glbOyunTur == "tr")
            engalp = "abcdefghijklmnopqrstuvwxyz!_-";
        
        var kelimedevar;
        for (i = 0; i < hexagonsayi; i++) {
            if (kelime.length > 0) {
                rndkelimeind = Math.floor(Math.random() * kelime.length);
                harf = kelime[rndkelimeind];
                kelime = kelime.substring(0, rndkelimeind) + kelime.substring(rndkelimeind + 1, kelime.length); 
                kelimedevar = 1;
                //alert(kelime);
            }
            else {
                rndind = Math.floor(Math.random() * engalp.length);
                harf = engalp[rndind];
                kelimedevar = 0;
                glbfazlaharfvar = 1;
            }
            hexind = Math.floor(Math.random() * (hexagonsayi - i));

            goind = hexagonarr[hexind];
            hexagonarr.splice(hexind, 1);
            glbDagitilmisArray[goind] = harf;
            //alert('dh:' + harf)
            DisplayHarf(goind, harf, ''); 
            glbKelimedeVar[goind] = kelimedevar;
        }
    }
    function EkranReset() {
        $("#spnSoru").html('');
        glbCevapIndex = 0;
        for (i = 0; i < 11; i++) {
            var imgurl = 'url("img/alfabe/bos.png")';
            $(".imgbos").eq(i).css('background-image', imgurl);
            glbCevapArray[i] = "0";
        }
        for (i = 0; i < 11; i++) {
            DisplayHarf(i, '', 'bos');
        }
    }
    function CheckWord() {
        var dogru = 1;
        //alert(glbCevapArray);
        for (i = 0; i < glbKelime.length; i++) {
            //alert(glbCevapArray[i] + glbKelime[i]);
            if (glbCevapArray[i] != glbKelime[i]) {
                dogru = 0;
                i = 30;
            }
        }

        if (dogru == 1) {    
            glbEkranKontrol = 2;
            SetCookie("KullaniciLevel", Number(GetCookie("KullaniciLevel")) + 1);
            glbDogruCevapVerildi = 1;
            clearInterval(glbSureCounter);

            //$("#divwholepage").animate({
            //    opacity: '0.6'
            //}, 500, function () {
            //    $("#divwholepage").fadeOut(500);
            //});
            setTimeout(function () {
                SonucMesaj(1);
            }, 1000);
       
        }
    }
    function HexResize() {
        
        var scrwdth = $(window).width();
        var leveltop;
        var ipucupaddingtop;
        var ikonsep1 = "0px";
        var ikonsep2 = "0px";
        var ikonwid = "25";
        var eksi = 20;
        var owleksi = 0;
        //alert(scrwdth);
        if (glbScreenType == 'IPhone5') { //320
            $(".margin-left").css('margin-left', '83px');
            $(".margin-left2").css('margin-left', '28px');
            $(".main").css('width', '55px');
            $(".main").css('height', '50px');
            $("#divHarfler").css('padding-left', '48px');
            leveltop = '40';
            ipucupaddingtop = 2;
        }
        else if (glbScreenType == 'Galaxy') { //360
            $(".margin-left").css('margin-left', '92px');
            $(".margin-left2").css('margin-left', '31px');
            $(".main").css('width', '60px');
            $(".main").css('height', '55px');
            $("#divHarfler").css('padding-left', '60px');
            leveltop = '40';
            ipucupaddingtop = 2;
            $(".imgClass").css('width', '35');
            $(".imgClass").css('padding-top', '5px');
            $(".ipucusayi").css('width', '70px');
            
        }
        else if (glbScreenType == 'IPhone6') {//375
            $(".margin-left").css('margin-left', '96px');
            $(".margin-left2").css('margin-left', '33px');
            $(".main").css('width', '63px');
            $(".main").css('height', '57px');
            $("#divHarfler").css('padding-left', '65px');
            leveltop = '47';
            ipucupaddingtop = 4;
            $(".imgClass").css('width', '40');
            $(".imgClass").css('padding-top', '0px');
            $(".ipucusayi").css('width', '75px');
            $(".ipucusayi").css('font-size', '0.8em');

            $(".ikon").css('width', '20px');
            $(".ikon").css('height', '20px');
            $(".ikon").css('font-size', '1em');
        }
        else if (glbScreenType == 'Phone395') {//395
            $(".margin-left").css('margin-left', '101px');
            $(".margin-left2").css('margin-left', '35px');
            $(".main").css('width', '67px');
            $(".main").css('height', '60px');
            $("#divHarfler").css('padding-left', '64px');
            leveltop = '49';
            ipucupaddingtop = 5;
            $(".imgClass").css('width', '42');
            $(".imgClass").css('padding-top', '0px');
            $(".ipucusayi").css('width', '80px');
            $(".ipucusayi").css('font-size', '0.8em');
            $(".ikon").css('width', '20px');
            $(".ikon").css('height', '20px');
            $(".ikon").css('font-size', '1em');
        }
        else if (glbScreenType == 'IPhone6P') {//414
            $(".margin-left").css('margin-left', '106px');
            $(".margin-left2").css('margin-left', '37px');
            $(".main").css('width', '70px');
            $(".main").css('height', '63px');
            $("#divHarfler").css('padding-left', '68px');
            leveltop = '53';
            ipucupaddingtop = 6;
            $(".imgClass").css('width', '44');
            $(".imgClass").css('padding-top', '0px');
            $(".ipucusayi").css('width', '82px');
            $(".ipucusayi").css('font-size', '0.9em');

            $("#divCanSure").css('font-size', '1.4em');
            $(".ikon").css('width', '22px');
            $(".ikon").css('height', '22px');
            $(".ikon").css('font-size', '1.1em');
        }
        else if (glbScreenType == 'LGLexus') {//432
            $(".margin-left").css('margin-left', '70px');
            $(".margin-left2").css('margin-left', '35px');
            $(".main").css('width', '66px');
            $(".main").css('height', '60px');
            $("#divHarfler").css('padding-left', '78px');
            leveltop = '56';
            ipucupaddingtop = 6;

            $(".imgClass").css('width', '46');
            $(".imgClass").css('padding-top', '5px');
            $(".ipucusayi").css('width', '85px');
            $(".ipucusayi").css('font-size', '0.9em');

            $("#divCanSure").css('font-size', '1.5em');

            $(".ikon").css('width', '23px');
            $(".ikon").css('height', '23px');
            $(".ikon").css('font-size', '1.1em');
        }
        else if (glbScreenType == 'IPhone455') {//455
            $(".margin-left").css('margin-left', '73px');
            $(".margin-left2").css('margin-left', '37px');
            $(".main").css('width', '70px');
            $(".main").css('height', '63px');
            $("#divHarfler").css('padding-left', '88px');
            leveltop = '59';
            ipucupaddingtop = 8;
            $(".imgClass").css('width', '48');
            $(".imgClass").css('padding-top', '5px');
            $(".ipucusayi").css('width', '89px');
            $(".ipucusayi").css('font-size', '1em');
            $("#divCanSure").css('font-size', '1.5em');

            $(".ikon").css('width', '23px');
            $(".ikon").css('height', '23px');
            $(".ikon").css('font-size', '1.1em');
        }
        else if (glbScreenType == 'IPhone500') {//500
            $(".margin-left").css('margin-left', '80px');
            $(".margin-left2").css('margin-left', '40px');
            $(".main").css('width', '92px');
            $(".main").css('height', '82px');
            $("#divHarfler").css('padding-left', '140px');
            leveltop = '63';
            ipucupaddingtop = 10;
            $(".imgClass").css('width', '53');
            $(".imgClass").css('padding-top', '5px');
            $(".ipucusayi").css('width', '97px');
            $(".ipucusayi").css('font-size', '1em');

            $("#divCanSure").css('font-size', '1.6em');

            $(".ikon").css('width', '28px');
            $(".ikon").css('height', '28px');
            $(".ikon").css('font-size', '1.2em');
        }
        else if (glbScreenType == 'Bigger1') {//600
            $(".margin-left").css('margin-left', '80px');
            $(".margin-left2").css('margin-left', '40px');
            $(".main").css('width', '92px');
            $(".main").css('height', '82px');
            $("#divHarfler").css('padding-left', '120px');
            leveltop = '66';
            ipucupaddingtop = 12;
            $(".imgClass").css('width', '63');
            $(".imgClass").css('padding-top', '0px');
            $(".ipucusayi").css('width', '110px');
            $(".ipucusayi").css('font-size', '1.1em');

            $("#divCanSure").css('font-size', '1.6em');
            $("#divKalanCan").css('padding-left', '30px'); 
            $("#timer").css('padding-right', '30px');

            $(".ikon").css('width', '30px');
            $(".ikon").css('height', '30px');
            $(".ikon").css('font-size', '1.3em');
            
        }
        else if (glbScreenType == 'ipad') {//750
            $(".margin-left").css('margin-left', '80px');
            $(".margin-left2").css('margin-left', '40px');
            $(".main").css('width', '92px');
            $(".main").css('height', '82px');
            $("#divHarfler").css('padding-left', '200px');
            leveltop = '66';
            ipucupaddingtop = 12;

            eksi = 150;
            owleksi = 40;
            $("#divHarfler").css('height', '250px');
            $("#divSoru").css('margin-top', 70 + 'px');

            $(".imgClass").css('width', '50');
            $(".imgClass").css('padding-top', '0px');
            $(".ipucusayi").css('width', '140px');
            $(".ipucusayi").css('font-size', '1.1em');

            $("#divCanSure").css('font-size', '1.8em');
            $("#divKalanCan").css('padding-left', '30px');
            $("#timer").css('padding-right', '30px');

            $(".ikon").css('width', '28px');
            $(".ikon").css('height', '28px');
            $(".ikon").css('font-size', '1.3em');
            $("#imgYeniKelime").css('position', 'relative');
            $("#divimgYeniKelime").css('position', 'absolute');
            $("#divimgYeniKelime").css('top', (Number($(window).height()) - 250) + 'px');
        }
        else if (glbScreenType == 'ipadpro') {//1000
            $(".margin-left").css('margin-left', '90px');
            $(".margin-left2").css('margin-left', '45px');
            $(".main").css('width', '122px');
            $(".main").css('height', '112px');
            $("#divHarfler").css('padding-left', '300px');
            leveltop = '66';
            ipucupaddingtop = 12;

            eksi = 150;
            owleksi = 60;
            $("#divHarfler").css('height', '250px');
            $("#divSoru").css('margin-top', 100 + 'px');

            $(".imgClass").css('width', '60');
            $(".imgClass").css('padding-top', '20px');
            $(".ipucusayi").css('width', '180px');
            $(".ipucusayi").css('font-size', '1.2em');

            $("#divCanSure").css('font-size', '2em');
            $("#divKalanCan").css('padding-left', '30px');
            $("#timer").css('padding-right', '30px');

            $(".ikon").css('width', '28px');
            $(".ikon").css('height', '28px');
            $(".ikon").css('font-size', '1.3em');

            $("#imgYeniKelime").css('position', 'relative');
            $("#divimgYeniKelime").css('position', 'absolute');
            $("#divimgYeniKelime").css('top', (Number($(window).height()) - 350) + 'px');
        }
        $("#divIpucuHarfAl").css('padding-right', ikonsep1);
        $("#divIlkHarfAl").css('padding-left', ikonsep1);
        $("#divIlkHarfAl").css('padding-right', ikonsep2);
        $("#divFazlaliklariAt").css('padding-left', ikonsep2);
        $("#divFazlaliklariAt").css('padding-right', ikonsep1);
        $("#divSureAl").css('padding-left', ikonsep1);

        $("#imgAnaIkon1").attr('width', ikonwid);
        $("#imgAnaIkon2").attr('width', ikonwid);
        $("#imgAnaIkon3").attr('width', ikonwid);
        $("#imgAnaIkon4").attr('width', ikonwid);  

        $("#divLevel").css('top', leveltop + 'px');
        var ekrangenislik = $(window).width();
        var ekranyukseklik = $(window).height();
        //alert(ekrangenislik);
        //alert($("#imdiv").css('height'));

        $("#divSoru").css('height', ((ekrangenislik) / 4 ).toFixed(0) + 'px');
        $("#divSoru").css('margin-left', ((ekrangenislik) / 10 + 10 + owleksi).toFixed(0) + 'px');
        $("#divSoru").css('margin-right', ((ekrangenislik) / 10 + owleksi).toFixed(0) + 'px');

        var divHaHey = (ekrangenislik - eksi);
        $("#divHa").css('height', divHaHey+'px');

        //$("#divHa").css('height', '650px');
        
        //$(".container").css('padding-left', '500px');

        $("#imgYeniKelime").attr('width', ekrangenislik);
        $("#imgYeniKelimeButon").attr('width', (ekrangenislik * 3 / 4).toFixed(0));


        glblw = (glbEkranWidth - 20 / 20) / glbLevelSayi;
        glblw = glblw.toFixed(0)
        $("#imgOwl").attr('width', glblw * 26 / 10 - owleksi);

        glblw = Math.floor(glblw);
        var usthey = 10;
        var owlhey = $("#imgOwl").css('height').replace('px', '');

        var strhtml = "";
        var renk = "kahve";
        for (i = 1; i <= glbLevelSayi; i++) {
            if (i > GetCookie("KullaniciLevel"))
                renk = "mavi";
            if (i == 1)
                strhtml = strhtml + "<div class='spnlevel ilk' style='width:" + glblw + "px;'>&nbsp;</div>";
            else if (i == glbLevelSayi)
                strhtml = strhtml + "<div class='spnlevel son' style='width:" + glblw + "px;'>&nbsp;</div>";
            else
                strhtml = strhtml + "<div class='spnlevel' style='width:" + glblw + "px;'>&nbsp;</div>";
        }
        $("#divLevel").html(strhtml);
        

        var kalanhey = Number(ekranyukseklik) - (Number(divHaHey) + Number(usthey) + Number(owlhey) + Number(leveltop)); 
        //alert(ekrangenislik);
        $("#divCanSure").css('height', (kalanhey * 2 / 7).toFixed(0) + 'px');
        $("#divCevap").css('height', (kalanhey * 2 / 7).toFixed(0) + 'px');
        $("#divIpucu").css('padding-top', ipucupaddingtop + 'px');
        
        $("#divCanSure").css('padding-top', (Number(usthey) + Number(owlhey)) + 'px');
    }
    function NextAudioToggleCorrectBd(a) {
        a++;
        if (a > 3)
            a = 0;
        return a;
    }
    $(document).on("tap", ".insert", function (e) {
        if (glbEkranKontrol == 1) {
            if (glbAudioToggleCorrectBd % 4 == 0)
                $(".correctefekt0bd").get(0).play();
            else if (glbAudioToggleCorrectBd % 4 == 1)
                $(".correctefekt1bd").get(0).play();
            else if (glbAudioToggleCorrectBd % 4 == 2)
                $(".correctefekt2bd").get(0).play();
            else if (glbAudioToggleCorrectBd % 4 == 3)
                $(".correctefekt3bd").get(0).play();
            glbAudioToggleCorrectBd = NextAudioToggleCorrectBd(glbAudioToggleCorrectBd);
            //alert(glbDagitilmisArray);
            var ilkboscevap;
            for (i = 0; i < 11; i++) {
                if (glbCevapArray[i] == "0") {
                    ilkboscevap = i;
                    i = 99;
                }
            }
            var arrayind = $(this).attr('name');

            var img2 = GetImg(arrayind - 1);
            var dummy = img2.css('background-image');
            //alert(dummy);
            var n = dummy.indexOf("1.png");
            if (n == -1) {
                n = dummy.indexOf("bos.png");
            }
            //alert(n);
            if (n == -1) {
                //alert($(this).attr('name'));
                //harf = "a";
                harf = glbDagitilmisArray[arrayind - 1];
                // q : ?
                // w : ?
                // x : ö
                // [ : ü
                // ] : ?
                // = : ç
                if (glbOyunTur == "tr") {
                    if (harf == "w")
                        harfyeni = "ss";
                    else if (harf == "x")
                        harfyeni = "oo";
                    else if (harf == "q")
                        harfyeni = "ii";
                    else if (harf == "!")
                        harfyeni = "uu";
                    else if (harf == "_")
                        harfyeni = "gg";
                    else if (harf == "-")
                        harfyeni = "cc";
                    else
                        harfyeni = harf;
                }
                else {
                    harfyeni = harf;
                }
                if (harf == " ") {
                    harfyeni = "space";
                    harfek = "";
                }
                var imgurl = 'url("img/alfabe/' + harfyeni + '.png")';
                $(".imgbos").eq(ilkboscevap).css('background-image', imgurl);
                glbCevapArray[ilkboscevap] = harf;
                DisplayHarf(arrayind - 1, harf, '1');
                CheckWord();
                glbCevapIndex++;
            }
        }
        e.preventDefault();
    });
    $(document).on("tap", "#imgYeniKelimeButon", function (e) {
        //$("#afterdivwholepage").css('display', 'none');
        $("#afterdivwholepage").fadeOut(500, function () {
            $("#divwholepage").fadeIn(10);
            $("#divwholepage").animate({
                opacity: '1'
            }, 500);
        });
        //$("#divwholepage").css('opacity', '1');

        glbEkranKontrol = 1;
        if (Number(GetCookie("KalanCan")) > 0) {
            YeniSoruGetir(1);
        }
        else {
            //Mesaj(5, '', 'Can kalmad? hic!', 4);
            window.location = "mIntro.html";
        }
        e.preventDefault();
    });    
    function TekrarBasla() {
        if (glbEkranKontrol == 1) {
            glbCevapIndex = 0;
            for (i = 0; i < 11; i++) {
                var imgurl = 'url("img/alfabe/bos.png")';
                $(".imgbos").eq(i).css('background-image', imgurl);
                glbCevapArray[i] = "0";
            }
            for (i = 0; i < 11; i++) {
                if (glbKelimedeVar[i] == 1 || glbatmajokerikullanildi == 0) {
                    DisplayHarf(i, glbDagitilmisArray[i], '');
                }
            }
        }
    }
    $(document).on("tap", ".insertcevap", function (e) {
        TekrarBasla();
        e.preventDefault();
    });
    $(document).on("tap", "#divHarfler", function (e) {
        e.preventDefault();
    });   
    $(document).on("tap", "#divHa", function (e) {
        e.preventDefault();
    }); 
    $(document).on("tap", "#divSoru", function (e) {
        e.preventDefault();
    });    
    $(document).on("tap", "#divwholepage", function (e) {
        e.preventDefault();
    }); 
    $(document).on("tap", "#divIpucu", function (e) {
        e.preventDefault();
    }); 
    
    $(document).on("tap", "#divIpucuHarfAl", function (e) {
        if (glbEkranKontrol == 1 && GetCookie('IpucuHarfAl') > 0) {
            SetCookie('IpucuHarfAl', Number(GetCookie('IpucuHarfAl')) - 1);
            $("#divIpucuHarfAlSayi").html(GetCookie('IpucuHarfAl'));
            var kelimekalan = "";
            //alert(glbCevapArray);
            for (i = 0; i < glbKelime.length; i++) {
                if (glbCevapArray[i] == "0")
                    kelimekalan = kelimekalan + glbKelime[i];
            }
            //alert('kelimekalan:'+kelimekalan);
            //var kelimekalan = glbKelime.substring(glbCevapIndex, glbKelime.length);
            var rndkelimeind = Math.floor(Math.random() * kelimekalan.length);
            var harf = kelimekalan[rndkelimeind];

            
            for (i = 0; i < glbKelime.length; i++) {
                if (glbKelime[i] == harf && glbCevapArray[i]=='0') {
                    //alert('harf:' + harf);
                    var harfyeni;
                    if (glbOyunTur == "tr") {
                        if (harf == "w")
                            harfyeni = "ss";
                        else if (harf == "x")
                            harfyeni = "oo";
                        else if (harf == "q")
                            harfyeni = "ii";
                        else if (harf == "!")
                            harfyeni = "uu";
                        else if (harf == "_")
                            harfyeni = "gg";
                        else if (harf == "-")
                            harfyeni = "cc";
                        else
                            harfyeni = harf;
                    }
                    else {
                        harfyeni = harf;
                    }
                    var imgurl = 'url("img/alfabe/' + harfyeni + '.png")';
                    $(".imgbos").eq(i).css('background-image', imgurl);
                    glbCevapArray[i] = harf;
                    CheckWord();
                }
            }
            for (i = 0; i < 11; i++) {
                if (glbDagitilmisArray[i] == harf) {
                    //alert(glbDagitilmisArray[i]);
                    var img2 = GetImg(i);
                    var dummy = img2.css('background-image');
                    //alert(dummy);
                    var n = dummy.indexOf("1.png");
                    if (n == -1) {
                        DisplayHarf(i, harf, '1');
                        i = 11;
                    }
                }
            }
            //DisplayHarf(arrayind-1, harf, '1');
        }
        e.preventDefault();
    });
    $(document).on("tap", "#divIlkHarfAl", function (e) {
        if (glbEkranKontrol == 1 && GetCookie('IpucuIlkHarfAl') > 0) {
            SetCookie('IpucuIlkHarfAl', Number(GetCookie('IpucuIlkHarfAl')) - 1);
            $("#divIlkHarfAlSayi").html(GetCookie('IpucuIlkHarfAl'));
            var ilkbos = -1;
            for (i = 0; i < glbKelime.length; i++) {
                if (glbCevapArray[i] == "0") {
                    ilkbos = i;
                    i = 30;
                }
            }
            //alert(ilkbos);
            glbCevapIndex++;
            //DisplayHarf(ilkbos, glbKelime[ilkbos], '1');

            for (i = 0; i < 11; i++) {
                if (glbDagitilmisArray[i] == glbKelime[ilkbos]) {
                    //alert(glbDagitilmisArray[i]);
                    //alert(i);
                    var img2 = GetImg(i);
                    var dummy = img2.css('background-image');
                    //alert(dummy);
                    var n = dummy.indexOf("1.png");
                    if (n == -1) {
                        DisplayHarf(i, glbKelime[ilkbos], '1');
                        i = 11;
                    }                   
                }
            }
            var harf = glbKelime[ilkbos];
            var harfyeni;
            if (glbOyunTur == "tr") {
                if (harf == "w")
                    harfyeni = "ss";
                else if (harf == "x")
                    harfyeni = "oo";
                else if (harf == "q")
                    harfyeni = "ii";
                else if (harf == "!")
                    harfyeni = "uu";
                else if (harf == "_")
                    harfyeni = "gg";
                else if (harf == "-")
                    harfyeni = "cc";
                else
                    harfyeni = harf;
            }
            else {
                harfyeni = harf;
            }
            var imgurl = 'url("img/alfabe/' + harfyeni + '.png")';
            $(".imgbos").eq(ilkbos).css('background-image', imgurl);
            glbCevapArray[ilkbos] = glbKelime[ilkbos];
            CheckWord();
        }
        e.preventDefault();
    });
    $(document).on("tap", "#divFazlaliklariAt", function (e) {
        TekrarBasla();
        if (glbEkranKontrol == 1 && Number(GetCookie('IpucuFazlalariAt')) > 0 && glbfazlaharfvar == 1) {
            glbfazlaharfvar = 0;
            SetCookie('IpucuFazlalariAt', Number(GetCookie('IpucuFazlalariAt')) - 1);
            $("#divFazlaliklariAtSayi").html(GetCookie('IpucuFazlalariAt'));
            glbatmajokerikullanildi = 1;
            for (i = 0; i < 11; i++) {
                if (glbKelimedeVar[i] == 0)
                    DisplayHarf(i, "", "bos");
            }
        }
        e.preventDefault();
    });
    $(document).on("tap", "#divSureAl", function (e) {
        $(".countdown").get(0).pause();
        $(".countdown").get(0).currentTime = 0;
        if (glbEkranKontrol == 1 && Number(GetCookie('IpucuSureAl')) > 0) {
            //alert('sureal2');
            SetCookie('IpucuSureAl', Number(GetCookie('IpucuSureAl')) - 1);
            $("#divSureAlSayi").html(GetCookie('IpucuSureAl'));
            glbCevapKalanSure = Number(glbCevapKalanSure) + Number(glbCevapSure);
        }    
        e.preventDefault();
    });
    function CevapYap() {
        var vhtml = '<div class="clear">';
        for (i = 0; i < glbKelime.length; i++) {
            vhtml = vhtml + '<div class="maincevap">';
            vhtml = vhtml + '    <div class="insertcevap">';
            vhtml = vhtml + '        <div class="imgbos" name="bos"></div>';
            vhtml = vhtml + '    </div>';
            vhtml = vhtml + '</div>';
        }
        vhtml = vhtml + '</div>';
        //alert(vhtml);
        $("#divCevap").html(vhtml);
        CevapBuyuklukAyarla();
    }

    function InitSoruCevap() {
        $("#divwholepage").fadeIn(1000);
        //$("#divwholepage").css('display','none');
        HexResize();

        if (GetCookie('DosyaYuklemeBitti') == 0){
            if (glbOyunTur == 'en')
                readTextFile('insert_eng.txt');
            else
                readTextFile('insert.txt');
        }
        
        $("#divIpucuHarfAlSayi").html(GetCookie('IpucuHarfAl'));
        $("#divIlkHarfAlSayi").html(GetCookie('IpucuIlkHarfAl'));
        $("#divFazlaliklariAtSayi").html(GetCookie('IpucuFazlalariAt'));
        $("#divSureAlSayi").html(GetCookie('IpucuSureAl'));

        EkranReset();
        LevelAyarla(1);
        YeniSoruGetir(1);
        
        glbEkranKontrol = 1;
        var d = new Date();
        //if (Number(d.getTime()) - Number(GetCookie('SonGuncellemeZaman')) > 172800000) {         //1 gun 86400000
        if (Number(d.getTime()) - Number(GetCookie('SonGuncellemeZaman')) > Number(GetCookie('DEFGuncellemeZamanAralik'))) {         //1 gun 86400000
            setTimeout(
                function () {
                    ajax_sel_Genel(20, GetCookie('SonGucellemeId'), '0', '0', '0', '0', '0', '0', '0', 'GenelMBL2', 0);
                }, 3000);    
        }
        //glbKelime = 'kafes';
        //glbKelimeId = 100;
        //CevapYap();
        //YeniSoruDagit(glbKelime,glbSoru);
    }
    function Insert(id, kelime, soru, seviye) {
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO Kelime (Id,Kelime,Soru,Seviye) VALUES (?,?,?,?)',
                [id, kelime, soru, seviye],
                function (tx, res) {
                    glbguncellemeindex++;
                    KelimeGuncelle();
                },
                function (tx, res) {
                    //alert('error: ' + res.message);
                });
        }, null);
    }
    function Update(id, kelime, soru, seviye) {
        //alert('id:' + id);
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM Kelime where Id=' + id, [], function (tx, results) {
                if (results.rows.length > 0) {
                    //alert('buldum');
                    updatestr = 'UPDATE Kelime SET Kelime=?, Soru=?, Seviye=? where Id=?';

                    tx.executeSql(updatestr, [kelime, soru, seviye, id], function (tx, result) {
                        //alert('updated');
                        glbguncellemeindex++;
                        KelimeGuncelle();
                    },
                    function (error) {
                        alert('Error occurred');
                    });
                }
            });
        }, null);
    }
    function KelimeGuncelle() {    
        //alert('glbguncellemeindex:' + glbguncellemeindex);
        if (glbguncellemeindex < glbguncellemesayi) {
            //alert('glbguncellemeindex:' + glbguncellemeindex);
            SetCookie('SonGucellemeId', GuncellemeArr[glbguncellemeindex].Id);
            if (GuncellemeArr[glbguncellemeindex].Tur=='I'){
                Insert(GuncellemeArr[glbguncellemeindex].KelimeId, GuncellemeArr[glbguncellemeindex].Kelime,
                        GuncellemeArr[glbguncellemeindex].Soru, GuncellemeArr[glbguncellemeindex].Seviye);      
            }
            else if (GuncellemeArr[glbguncellemeindex].Tur == 'U') {
                Update(GuncellemeArr[glbguncellemeindex].KelimeId, GuncellemeArr[glbguncellemeindex].Kelime,
                    GuncellemeArr[glbguncellemeindex].Soru, GuncellemeArr[glbguncellemeindex].Seviye);
            }
            else if (GuncellemeArr[glbguncellemeindex].Tur == 'T') {
                SetCookie(GuncellemeArr[glbguncellemeindex].Kelime, GuncellemeArr[glbguncellemeindex].Soru);
                glbguncellemeindex++;
                setTimeout(function () {
                    KelimeGuncelle();
                }, 500);           
            }
        }
    }
    function ajax_sel_Genel(f_kriter, f_id, f_ky, f_en, f_tr, f_fr, f_es, f_it, f_de, f_adres, f_newlabelid) {
        //ShowLoading();
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            timeout: 10000,
            url: glbURL + f_adres,
            data: {
                p_kriter: JSON.stringify(f_kriter),
                p_id: JSON.stringify(f_id),
                p_ky: JSON.stringify(glbOyunTur),
                p_en: JSON.stringify(f_en),
                p_tr: JSON.stringify(f_tr),
                p_fr: JSON.stringify(f_fr),
                p_es: JSON.stringify(f_es),
                p_it: JSON.stringify(f_it),
                p_de: JSON.stringify(f_de),
                p_kanal: JSON.stringify(glbUstGrupId),
            },
            crossDomain: true,
            dataType: "jsonp",
            error: function (jqXHR) {
                //Uyar('jqXHR:' + jqXHR.status);
            },
            success: function (msg) {
                if (f_kriter == 20) {
                    //alert(msg.d);
                    GuncellemeArr = JSON.parse(unescape(msg.d));
                    if (msg.d.length > 10) {
                        glbguncellemesayi = GuncellemeArr.length;
                        KelimeGuncelle();
                        var d = new Date();
                        var n = Number(d.getTime());
                        SetCookie('SonGuncellemeZaman', n)
                    }

                        
                    //alert(glbkelimeguncellemeler[0].Tur);
                }
            }
        }).error(function (msg) {

        }).success(function () {
            //alert('ba?ar?l?');
        }).complete(function () {
            //setTimeout(function () {
            //    HideLoading(); 
            //}, 100);
        })
    }
    function onPhoneReady() {
        //var ua = navigator.userAgent.toLowerCase();
        ////alert(ua);
        //var isIphone = ua.indexOf("iphone") > -1; //&& ua.indexOf("mobile");
        //if (isIphone) {
        //    //alert('iphone');
        //    StatusBar.overlaysWebView(false);
        //    StatusBar.backgroundColorByName('gray');
        //}
        db = window.sqlitePlugin.openDatabase(
            // options
            {
                name: "nw.db",
                location: 1 // for iOS (0=Documents (default, visible in iTunes, backed up by iCloud), 1=Library (not visible in iTunes, backed up by iCloud, 2=Library/LocalDatabase (not visible in iTunes, not backed up by iCloud))
            },
            function (msg) {
                InitSoruCevap();
            },
            function (msg) {
                alert("error: " + msg);
            }
        );
    }
    if (glbisphone == 1) {
        document.addEventListener("deviceready", onPhoneReady, false);
    }
    else {
        db = openDatabase('nwdb', '1.0', 'nw', 20 * 1024 * 1024);
        InitSoruCevap();
    }
});