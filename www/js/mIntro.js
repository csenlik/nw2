var glbtimer = 1;
var glblinearr = [];
var glblinearrind = 0;
var glbBaslaImgWidth;
var glbdivRek = 0;
$(document).on("pagecreate", "#pageintro", function () {
    if (glbOyunTur == 'en') {
        $(".clsbg").css('background', 'url(img/girisbg_eng.png) no-repeat top left');
        $(".clsbg").css('-webkit-background-size', 'contain');
        $(".clsbg").css('-moz-background-size', 'contain');
        $(".clsbg").css('-o-background-size', 'contain');
        $(".clsbg").css('background-size', 'contain');

        $("#hrfBas").attr('src', 'img/baslabtn_eng.png');

        $("#divRek").html('Record');
    }
    //alert('do it');
    $("#divRekor").html(GetCookie("KullaniciLevel"));
    
    //setTimeout(
    //    function () {
    //        $(".progress-bar").loading();
    //    }, 1000);

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

    function CountKelime(lines) {
        //alert(lines);

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
    function DosyayiYukle() {
        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE Kelime');
        });
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Sonuclar (Id integer,DogruCevapSayi integer,CevaplamaSayi integer)');
        });
        var sqlstr = 'CREATE TABLE IF NOT EXISTS Kelime (Id integer,Kelime text,Soru text,Seviye integer)';
        db.transaction(function (tx) {
            tx.executeSql(sqlstr, [], function (tx, results) {
                //alert('yükleme basliyor:' + glbOyunTur);
                if (glbOyunTur == 'en') 
                    readTextFile('insert_eng.txt');
                else
                    readTextFile('insert.txt');
            });
        }, null);
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
                        SetCookie('DosyaYuklemeBitti', 1)
                        //alert('bitti :' + glblinearr.length);
                    }
                    
                },
                function (tx, res) {
                    alert('error: ' + res.message);
                });
        }, null);
    }
    //readTextFile('insert.txt');

    

    //function Timer() {
    //    $("#spntimer").html(Number($("#spntimer").html())+1);
    //}
    

    //$(".progress-bar").attr("data-percent", "10");
    //$("#divPb").html('<div class="progress-bar" data-percent="5" data-duration="1000"></div>');
    
    
    //glbSureCounter = setInterval(Timer, 1000); //1000 will  run it every 1 second
    function EkranAyarla() {
        //1124/1760
        var screenwidth = $(window).width();
        var screenheight = $(window).height();
        var bgimgheight = (1760 * screenwidth / 1124).toFixed(0);
        var footerheight = screenheight - bgimgheight;
        //alert(screenheight);
        //alert(bgimgheight);
        var ikonsep = "20px";
        var ikonwid = (footerheight * 3 / 5).toFixed(0);

        //alert('EkranAyarla:'+glbScreenType);
        if (glbScreenType == 'IPhone5') { //320
            $("#divPB").css('left', '200px');
            $("#divPB").css('top', '25px');
            $("#divBasla").css('left', '30px');
            $("#divBasla").css('top', '400px');
            glbBaslaImgWidth = '180';
            
            $("#divRek").css('font-size', "1.1em");
        }
        else if (glbScreenType == 'Galaxy') { //360
            $("#divPB").css('left', '240px');
            $("#divPB").css('top', '25px');
            $("#divBasla").css('left', '30px');
            $("#divBasla").css('top', '450px');
            glbBaslaImgWidth = '180';
            $("#divRek").css('font-size', "1.2em");
            bgimgheight = Number(bgimgheight) + 5;
        }
        else if (glbScreenType == 'IPhone6') {//375
            $("#divPB").css('left', '250px');
            $("#divPB").css('top', '30px');
            $("#divBasla").css('left', '40px');
            $("#divBasla").css('top', '480px');
            glbBaslaImgWidth = '200';
            ikonsep = "22px";
            ikonwid = "38";
            $("#divRek").css('font-size', "1.3em");
            bgimgheight = Number(bgimgheight) + 5;
        }
        else if (glbScreenType == 'Phone395') {//395
            $("#divPB").css('left', '250px');
            $("#divPB").css('top', '32px');
            $("#divBasla").css('left', '42px');
            $("#divBasla").css('top', '500px');
            glbBaslaImgWidth = '210';
            ikonsep = "22px";
            ikonwid = "38";
            $("#divRek").css('font-size', "1.3em");
            bgimgheight = Number(bgimgheight) + 5;
        }
        else if (glbScreenType == 'IPhone6P') {//414
            $("#divPB").css('left', '263px');
            $("#divPB").css('top', '33px');
            $("#divBasla").css('left', '44px');
            $("#divBasla").css('top', '530px');
            glbBaslaImgWidth = '220';
            ikonsep = "25px";
            ikonwid = "42";

            $(".progress-bar").css('height', "120px");
            $(".progress-bar").css('width', "120px");
            $(".progress-bar div").css('height', "120px");
            $(".progress-bar div").css('width', "120px");
            $(".progress-bar div span").css('height', "109px");
            $(".progress-bar div span").css('width', "109px");
            $(".progress-bar div span").css('font-size', "3.2em");

            $(".progress-bar .rotate").css('clip', "rect(0 60px 120px 0)");
            $(".progress-bar .left").css('clip', "rect(0 60px 120px 0)");
            $(".progress-bar .right").css('clip', "rect(0 60px 120px 0)");
            $("#divRek").css('font-size', "1.5em");

            bgimgheight = Number(bgimgheight) + 10;
        }
        else if (glbScreenType == 'LGLexus') {//432
            $("#divPB").css('left', '280px');
            $("#divPB").css('top', '33px');
            $("#divBasla").css('left', '44px');
            $("#divBasla").css('top', '530px');
            glbBaslaImgWidth = '230';

            $(".progress-bar").css('height', "120px");
            $(".progress-bar").css('width', "120px");
            $(".progress-bar div").css('height', "120px");
            $(".progress-bar div").css('width', "120px");
            $(".progress-bar div span").css('height', "109px");
            $(".progress-bar div span").css('width', "109px");
            $(".progress-bar div span").css('font-size', "3.2em");
            ikonsep = "26px";
            ikonwid = "45";
            $("#divRek").css('font-size', "1.6em");
            bgimgheight = Number(bgimgheight) + 10;
        }
        else if (glbScreenType == 'IPhone455') {//455
            $("#divPB").css('left', '280px');
            $("#divPB").css('top', '33px');
            $("#divBasla").css('left', '44px');
            $("#divBasla").css('top', '530px');
            glbBaslaImgWidth = '230';

            $(".progress-bar").css('height', "120px");
            $(".progress-bar").css('width', "120px");
            $(".progress-bar div").css('height', "120px");
            $(".progress-bar div").css('width', "120px");
            $(".progress-bar div span").css('height', "109px");
            $(".progress-bar div span").css('width', "109px");
            $(".progress-bar div span").css('font-size', "3.2em");
            ikonsep = "26px";
            ikonwid = "45";
            $("#divRek").css('font-size', "1.7em");
            bgimgheight = Number(bgimgheight) + 10;
        }
        else if (glbScreenType == 'IPhone500') {//500
            $("#divPB").css('left', '280px');
            $("#divPB").css('top', '33px');
            $("#divBasla").css('left', '48px');
            $("#divBasla").css('top', '580px');
            glbBaslaImgWidth = '250';

            $(".progress-bar").css('height', "120px");
            $(".progress-bar").css('width', "120px");
            $(".progress-bar div").css('height', "120px");
            $(".progress-bar div").css('width', "120px");
            $(".progress-bar div span").css('height', "109px");
            $(".progress-bar div span").css('width', "109px");
            $(".progress-bar div span").css('font-size', "3.2em");
            ikonsep = "30px";
            ikonwid = "50";
            $("#divRek").css('font-size', "1.7em");
            bgimgheight = Number(bgimgheight) + 10;
        }
        else if (glbScreenType == 'Bigger1') {//600
            $("#divPB").css('left', '400px');
            $("#divPB").css('top', '40px');
            $("#divBasla").css('left', '60px');
            $("#divBasla").css('top', '750px');
            glbBaslaImgWidth = '350';

            $(".progress-bar").css('height', "120px");
            $(".progress-bar").css('width', "120px");
            $(".progress-bar div").css('height', "120px");
            $(".progress-bar div").css('width', "120px");
            $(".progress-bar div span").css('height', "109px");
            $(".progress-bar div span").css('width', "109px");
            $(".progress-bar div span").css('font-size', "3.2em");
            ikonsep = "30px";
            ikonwid = "50";
            $("#divRek").css('font-size', "1.8em");
        }
        else if (glbScreenType == 'ipad') {//750
            $("#divPB").css('left', '550px');
            $("#divPB").css('top', '50px');
            $("#divBasla").css('left', '60px');
            $("#divBasla").css('top', '780px');
            glbBaslaImgWidth = '340';

            $(".progress-bar").css('height', "140px");
            $(".progress-bar").css('width', "140px");
            $(".progress-bar div").css('height', "140px");
            $(".progress-bar div").css('width', "140px");
            $(".progress-bar div span").css('height', "128px");
            $(".progress-bar div span").css('width', "128px");
            $(".progress-bar div span").css('font-size', "3.5em");
            ikonsep = "30px";
            ikonwid = "50";

            $(".progress-bar .rotate").css('clip', "rect(0 70px 140px 0)");
            $(".progress-bar .left").css('clip', "rect(0 70px 140px 0)");
            $(".progress-bar .right").css('clip', "rect(0 70px 140px 0)");
            $("#divRek").css('font-size', "2em");

            bgimgheight = 20;

            $(".clsbg").css('-webkit-background-size', "cover");
            $(".clsbg").css('-moz-background-size', "cover");
            $(".clsbg").css('-o-background-size', "cover");
            $(".clsbg").css('background-size', "cover");
        }
        else if (glbScreenType == 'ipadpro') {//1000
            $("#divPB").css('left', '750px');
            $("#divPB").css('top', '80px');
            $("#divBasla").css('left', '70px');
            $("#divBasla").css('top', '1100px');
            glbBaslaImgWidth = '400';

            $(".progress-bar").css('height', "140px");
            $(".progress-bar").css('width', "140px");
            $(".progress-bar div").css('height', "140px");
            $(".progress-bar div").css('width', "140px");
            $(".progress-bar div span").css('height', "128px");
            $(".progress-bar div span").css('width', "128px");
            $(".progress-bar div span").css('font-size', "3.5em");
            ikonsep = "30px";
            ikonwid = "50";

            $(".progress-bar .rotate").css('clip', "rect(0 70px 140px 0)");
            $(".progress-bar .left").css('clip', "rect(0 70px 140px 0)");
            $(".progress-bar .right").css('clip', "rect(0 70px 140px 0)");
            $("#divRek").css('font-size', "2.2em");
            bgimgheight = 30;
            $(".clsbg").css('-webkit-background-size', "cover");
            $(".clsbg").css('-moz-background-size', "cover");
            $(".clsbg").css('-o-background-size', "cover");
            $(".clsbg").css('background-size', "cover");
        }
        $("#divFooter").css('top', bgimgheight + "px");
        $("#divFooter").css('margin-left', (ikonwid / 2).toFixed(0) + "px");
        $("#hrfBas").attr("width", glbBaslaImgWidth);

        $("#imgAnaIkon1").css('padding-right', ikonsep);
        $("#imgAnaIkon2").css('padding-left', ikonsep);
        $("#imgAnaIkon2").css('padding-right', ikonsep);
        $("#imgAnaIkon3").css('padding-left', ikonsep);
        $("#imgAnaIkon3").css('padding-right', ikonsep);
        $("#imgAnaIkon4").css('padding-left', ikonsep);

        $("#imgAnaIkon1").attr('width', ikonwid);
        $("#imgAnaIkon2").attr('width', ikonwid);
        $("#imgAnaIkon3").attr('width', ikonwid);
        $("#imgAnaIkon4").attr('width', ikonwid);  
    }
    function InitIntro() {
        $(".ui-loader").hide();
        //alert('InitIntro:'+$(window).width());
        EkranAyarla();
        $("#divWholePage").fadeIn(500);

        
        //DropCreateTable();
        if (GetCookie('DosyaYuklemeBitti') == 0) {
            DosyayiYukle();
        }
        setTimeout(
            function () {
                $(".progress-bar").loading();
                $("#spntimer").html(GetCookie("KullaniciRekor"));
            }, 1000);
        setTimeout(
            function () {
                $("#hrfBas").animate({
                    width: (glbBaslaImgWidth * 110 / 100).toFixed(0),
                    //height: "96"
                }, 200, function () {
                    $("#hrfBas").animate({
                        width: glbBaslaImgWidth,
                        //height: "96"
                    }, 100)
                });
            }, 3000);
    }
    $(document).on("tap", "#divWholePage", function (e) {
        e.preventDefault();
    });
    $(document).on("tap", "#pageintro", function (e) {
        e.preventDefault();
    });
    
    $(document).on("tap", "#imgAnaIkon2", function (e) { //puan ver
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        if (isAndroid) {
            window.open('market://details?id=com.studywords.enwo', '_system');
        }
        else {
            window.open('itms-apps://itunes.apple.com/us/app/new-word/id1378603202?mt=8');
        }
    });
    $(document).on("tap", "#imgAnaIkon4", function (e) { //paylas
        var msgbody = unescape('Do not miss this game! http://www.studywords.net/newword.html');
        window.plugins.socialsharing.share(
            msgbody,
            unescape('New Word'),
            null,
            null
        );
    });
    $(document).on("tap", "#hrfBas", function (e) {
        SetCookie('IpucuHarfAl', GetCookie('DEFIpucuHarfAl'));
        SetCookie('IpucuIlkHarfAl', GetCookie('DEFIpucuIlkHarfAl'));
        SetCookie('IpucuFazlalariAt', GetCookie('DEFIpucuFazlalariAt'));
        SetCookie('IpucuSureAl', GetCookie('DEFIpucuSureAl'));

        SetCookie('CevapSure', GetCookie('DEFCevapSure'));

        
        SetCookie('KalanCan', glbLevelSayi);
        SetCookie('KullaniciLevel', 0);
        //window.location = "test.html";
        window.location = "mSoruCevap.html";
    });

    $(document).on("tap", "#divRek", function (e) {
        glbdivRek++;
        var d = new Date();
        if (glbdivRek == 4)
            alert('SonGuncellemeFark,SonGucellemeId:' + String(Number(d.getTime()) - Number(GetCookie('SonGuncellemeZaman'))) + ',' + GetCookie('SonGucellemeId'));
        else if (glbdivRek == 5)
            alert('DosyaYuklemeBitti:' + GetCookie('DosyaYuklemeBitti'));
        else if (glbdivRek == 6)
            alert('DEFIpucuHarfAl,DEFIpucuIlkHarfAl:' + GetCookie('DEFIpucuHarfAl') + ',' + + GetCookie('DEFIpucuIlkHarfAl'));
        else if (glbdivRek == 7)
            alert('DEFIpucuFazlalariAt,DEFIpucuSureAl:' + GetCookie('DEFIpucuFazlalariAt') + ',' + + GetCookie('DEFIpucuSureAl') );
        else if (glbdivRek == 8)
            alert('DEFCevapSure:' + GetCookie('DEFCevapSure'));
        else if (glbdivRek == 9)
            alert('DEFGuncellemeZamanAralik:' + GetCookie('DEFGuncellemeZamanAralik'));   
    });
    
    function EkranTipi() {
        var scrwdth = $(window).width();
        //alert($(window).width());
        //alert($(window).height());


        if (scrwdth >= 320 && scrwdth < 360) {
            glbScreenType = 'IPhone5';
            glbHeaderHeight = 60;
        }
        else if (scrwdth >= 360 && scrwdth < 375) {
            glbScreenType = 'Galaxy';
            glbHeaderHeight = 64;
        }
        else if (scrwdth >= 375 && scrwdth < 395) {
            glbScreenType = 'IPhone6';
            glbHeaderHeight = 68;
        }
        else if (scrwdth >= 395 && scrwdth < 414) {
            glbScreenType = 'Phone395';
            glbHeaderHeight = 72;
        }
        else if (scrwdth >= 414 && scrwdth < 432) {
            glbScreenType = 'IPhone6P';
            glbHeaderHeight = 76;
        }
        else if (scrwdth >= 432 && scrwdth < 455) {
            glbScreenType = 'LGLexus';
            glbHeaderHeight = 82;
        }
        else if (scrwdth >= 455 && scrwdth < 600) {
            glbScreenType = 'IPhone455';
            glbHeaderHeight = 84;
        }
        else if (scrwdth >= 500 && scrwdth < 600) {
            glbScreenType = 'IPhone500';
            glbHeaderHeight = 84;
        }
        else if (scrwdth >= 600 && scrwdth < 750) {
            glbScreenType = 'Bigger1';
            glbHeaderHeight = 86;
        }
        else if (scrwdth >= 750 && scrwdth < 1000) {
            glbScreenType = 'ipad';
            glbHeaderHeight = 110;
        }
        else if (scrwdth >= 1000 && scrwdth < 2000) {
            glbScreenType = 'ipadpro';
            glbHeaderHeight = 130;
        }
    }
    function onPhoneReady() {
        //if ((0 == 0) && (AdMob)) {
        //    alert('admob');
        //    AdMob.prepareRewardVideoAd(
        //        {
        //            adId: 'ca-app-pub-5365950586235992/9300143067'
        //        },
        //        function (msg) {
        //            //alert("Prepared, you can now show it")
        //        },
        //        function (msg) {
        //            //alert("prepareInterstitial failed: " + msg)
        //        }
        //    );
        //}
        //if ((0 == 0) && (AdMob)) {
        //    AdMob.prepareInterstitial(
        //        {
        //            adId: 'ca-app-pub-5365950586235992/9300143067',
        //            autoShow: false,
        //            isTesting: false
        //        },
        //        function (msg) {
        //            //alert("Prepared, you can now show it")
        //        },
        //        function (msg) {
        //            //alert("prepareInterstitial failed: " + msg)
        //        }
        //    );
        //}


        //var ua = navigator.userAgent.toLowerCase();
        ////alert(ua);
        //var isIphone = ua.indexOf("iphone") > -1; //&& ua.indexOf("mobile");
        //if (isIphone) {
        //    //alert('iphone');
        //    StatusBar.overlaysWebView(false);
        //    StatusBar.backgroundColorByName('gray');
        //}
        EkranTipi();

        db = window.sqlitePlugin.openDatabase(
            // options
            {
                name: "nw.db",
                location: 1 // for iOS (0=Documents (default, visible in iTunes, backed up by iCloud), 1=Library (not visible in iTunes, backed up by iCloud, 2=Library/LocalDatabase (not visible in iTunes, not backed up by iCloud))
            },
            function (msg) {
                //alert('onPhoneReady');
                InitIntro();
            },
            function (msg) {
                alert("error: " + msg);
            }
        );
    }
    if (glbisphone == 1) {
        //alert('glbisphone');
        document.addEventListener("deviceready", onPhoneReady, false);
    }
    else {
        db = openDatabase('nwdb', '1.0', 'nw', 20 * 1024 * 1024);
        InitIntro();
    }
});