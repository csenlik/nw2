// q : ı
// w : ş
// x : ö
// ! : ü
// _ : ğ
// - : ç

//gri :#c4c4c4
//progresskahve : #D27216
//progressacikmavi : #C3D4F9
glbOyunTur = "en"; //en ingilizce, tr türkçe
glbisphone = 1;

//var glbIpucuIlkHarfAlSayi;;
//var glbIpucuHarfAlSayi;
//var glbIpucuFazlalariAtSayi;
//var glbIpucuSureAlSayi;

var glbLevelSayi = 20;

var glbYuzde = (Number(GetCookie("KullaniciRekor")) * 100 / Number(glbLevelSayi)).toFixed(0);

//http://www.0to255.com/8A8A8A
//orange: rgba(255, 201, 78, 1); /* #FFC94E b47d00*/
//purple: rgba(135, 149, 244, 1); /* #8795F4 #1228c0*/  
//green: rgba(107, 222, 80, 1); /* #6BDE50 266f15*/
//aqua: rgba(47, 208, 242, 1); /* #2FD0F2 075e70*/
//gri #8A8A8A 353535

glbMaviDark = "#ffb40a";
glbSariDark = "#3a51ed";
glbYesilDark = "#3eb623";
glbKirmiziDark = "#0ca1c0";
glbGriDark = "#5f5f5f";

//top1026
//bgyesil : #6bde50
//1turuncu #ffc94e
//2eflatun #b7b7b7
//3kiremit #de9266
//yildizsarisi #ffc94e 255 201 78

//sessin completed yeşili #6BDE50
//home button bordo #F34545

//oyun sonu mavi kutu #4551C1 69 81 193

//glbFont = "Verdana";
//glbFont = "Arial";
//-webkit if for safari
//ios cordova 4.0.0, webview : default uiwebview
//window.plugins.spinnerDialog.hide();
//window.plugins.spinnerDialog.show();
//word 1
//meaning 2
//spelling 3
//video -sentence 4
//easy sentence 5
var bilMesaj = [];
bilMesaj[0] = "Yeni kelime seti yaratmak için \"kelimeler\" ekranındaki şu ikona tıklayın.";
bilMesaj[1] = "Bilgilerinizin kaybolmaması için üyelik blgilerinizi tamamlayın.";
bilMesaj[2] = "Kendinize bir kullanıcı adı belirleyin.";
bilMesaj[11] = "Alistirma1 yardim";
bilMesaj[12] = "Alistirma2 yardim";
bilMesaj[13] = "Alistirma3 yardim";
bilMesaj[14] = "Alistirma4 yardim";
bilMesaj[15] = "Alistirma5 yardim";
bilMesaj[3] = "Ipucu kullan mesaji";
bilMesaj[4] = "videoyu sonra da yapabilirsiniz mesaji";
bilMesaj[5] = "videoyu sonra da yapabilirsiniz mesaji";
//glbLinkMavi = "#0645AD";
glbKGMavi = "#FFC94E";// "#00A2E8";
glbKGSari = "#8795F4 ";// "#FFC90E";
glbKGYesil = "#6BDE50"; // "#8AE037";
glbKGKirmizi = "#2FD0F2"; // "#FF2C2B";
glbKGKirmiziSedeceVideo = "#2FD0F2";
glbKGNext = "#8A8A8A"; 
glbATName1 = "Word";
glbATName2 = "Meaning";
glbATName3 = "Spelling";
glbATName4 = "Listening";
glbATNameNext = "Next Set";
glbATNameNextPacket = "Next Packet";
glbATNameOver = "Over"
glbATNameTryAgain = "Try Again";


//alert(GetCookie('DiziChKelimeGrubu'));
//SetCookie('Internet', 1);
//SetCookie('PaketId', 24);
//SetCookie('PaketRank', 24);
//SetCookie('PaketNo', 24);
//SetCookie('KelimeGrubuNo', 20);
//SetCookie('KelimeGrubuRank', 20);
//SetCookie('AlistirmaTipiRank', 3);
//SetCookie('VideoTamamlanma', '11111111111111111110');  //5.kelime grubu haric tum videolar bitmis


//SetCookie('LabelMBL','');
//SetCookie('ChKelimeler', '');

//SetCookie('PaketVS', 0);
//SetCookie('LabelVS', 0);
//SetCookie('KelimeGrubuVS', '00000000000000000000');
//SetCookie('ChPaketGrubu', '');
//SetCookie('DiziChKelimeGrubu', '');

var glbtoplamkgsayi = 20;
var glbtoplampaketsayi = 25;
var glbtoplamatsayi = 4;
var glbUstGrupId = 2;
var glbUstGrupAdi = "enwo";
//var glbUstGrupId = 0;
//var glbUstGrupAdi = "studywords";

function Uyar(mesaj) {
    //alert(mesaj);
}
function IsBilgilendirmeSeen(p_no) {
    var bilstr = [];
    bilstr = GetCookie('Bilgilendirme');
    if (bilstr[p_no] == 0)
        return false;
    else
        return true;
}
function SetBilgilendirmeSeen(p_no) {
    var bilstr = [];
    bilstr = GetCookie('Bilgilendirme');
    bilstr = setCharAt(bilstr, p_no, '1');
    SetCookie('Bilgilendirme', bilstr);
}
//KullaniciDurum	
//2 : normal üye (kullanıcı adı ve email adresi var)
//1 : başkası tarafından email adresi girilerek üye yapıldı, hiç giriş yapmadı kullanıcı adı yok
//0 : üyelik iptal edilmiş
//3 : misafir uye
//4 : yeni geldi


function IsLoggedIn() {
    if (GetCookie("Kullanici").length > 1)
        return 1
    else
        return 0
}
//var glbURL = "http://www.teogingilizcekelimeler.com/KOService.asmx/";
//var glbURL = "http://www.studyteog.com/KOService.asmx/";
var glbURL = "http://www.studywords.net/KOService.asmx/";
//var glbURL = "http://www.enwopl.com/KOService.asmx/";
var glbVideoRoot = "http://www.studywords.net/v2/";
var glbAudioRoot = "http://www.studywords.net/a2/";
//var glbURL = "http://localhost/ProjectKelimeOgreniyorum/KOService.asmx/"
//var glbURL = "KOService.asmx/"
var glbcumleroot = 'http://sentence.yourdictionary.com/';

//iphone5 320
//android htc one 360
//iphone 6 375
//phone395 395
//iphone 6+: 415
//lg lexus 5 432
//ipad 768
//ipad pro 1024

//alert($(window).width());
var glbScreenType = 1;
var scrwdth = $(window).width();
//alert($(window).width());
//alert($(window).height());


if (scrwdth >= 320 && scrwdth < 360) {
    glbScreenType = 'IPhone5';
    glbHeaderHeight = 60;
}
else if (scrwdth >= 360 && scrwdth < 375){
    glbScreenType = 'Galaxy';
    glbHeaderHeight = 64;
}
else if (scrwdth >= 375 && scrwdth < 395){
    glbScreenType = 'IPhone6';
    glbHeaderHeight = 68;
}
else if (scrwdth >= 395 && scrwdth < 414){
    glbScreenType = 'Phone395';
    glbHeaderHeight = 72;
}
else if (scrwdth >= 414 && scrwdth < 432){
    glbScreenType = 'IPhone6P';
    glbHeaderHeight = 76;
}
else if (scrwdth >= 432 && scrwdth < 455){
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
else if (scrwdth >= 600 && scrwdth < 750){
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
function ShowLoading() {
    if (glbisphone == 0)
        $.mobile.loading('show');
    else
        window.plugins.spinnerDialog.show();
}
function HideLoading() {
    if (glbisphone == 0)
        $.mobile.loading('hide');
    else
        window.plugins.spinnerDialog.hide();
}
function GetURLParameter(param) {
    var sonuc;
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == param) {
            sonuc = sParameterName[1];
        }
    }
    if (typeof sonuc == 'undefined')
        return 0;
    else
        return sonuc;
}

function GetCookie(cook) {
    var deger;
    switch (cook) {
        
        case 'SonGuncellemeZaman':
            if ((typeof localStorage.SonGuncellemeZaman) == 'undefined')
                deger = 0;
            else
                deger = localStorage.SonGuncellemeZaman;
            break;
        case 'SonGucellemeId':
            if ((typeof localStorage.SonGucellemeId) == 'undefined')
                deger = 0;
            else
                deger = localStorage.SonGucellemeId;
            break;
        case 'DosyaYuklemeBitti':
            if ((typeof localStorage.DosyaYuklemeBitti) == 'undefined')
                deger = 0;
            else
                deger = localStorage.DosyaYuklemeBitti;
            break;
        case 'KullaniciLevel':
            if ((typeof localStorage.KullaniciLevel) == 'undefined')
                deger = 1;
            else
                deger = localStorage.KullaniciLevel;
            break;
        case 'KalanCan':
            if ((typeof localStorage.KalanCan) == 'undefined')
                deger = glbLevelSayi;
            else
                deger = localStorage.KalanCan;
            break;
        case 'IpucuHarfAl':
            if ((typeof localStorage.IpucuHarfAl) == 'undefined')
                deger = 3;
            else
                deger = localStorage.IpucuHarfAl;
            break;
        case 'IpucuIlkHarfAl':
            if ((typeof localStorage.IpucuIlkHarfAl) == 'undefined')
                deger = 1;
            else
                deger = localStorage.IpucuIlkHarfAl;
            break;
        case 'IpucuFazlalariAt':
            if ((typeof localStorage.IpucuFazlalariAt) == 'undefined')
                deger = 1;
            else
                deger = localStorage.IpucuFazlalariAt;
            break;
        case 'IpucuSureAl':
            if ((typeof localStorage.IpucuSureAl) == 'undefined')
                deger = 1;
            else
                deger = localStorage.IpucuSureAl;
            break;  
        case 'CevapSure':
            if ((typeof localStorage.CevapSure) == 'undefined')
                deger = 25;
            else
                deger = localStorage.CevapSure;
            break;
        case 'KullaniciRekor':
            if ((typeof localStorage.KullaniciRekor) == 'undefined')
                deger = 0;
            else
                deger = localStorage.KullaniciRekor;
            break;
        case 'PremiumUye':
            if ((typeof localStorage.PremiumUye) == 'undefined')
                deger = 0;
            else
                deger = localStorage.PremiumUye;
            break;
        case 'DEFIpucuHarfAl':
            if ((typeof localStorage.DEFIpucuHarfAl) == 'undefined')
                if (glbOyunTur=='tr')
                    deger = 4;
                else
                    deger = 8;
            else
                deger = localStorage.DEFIpucuHarfAl;
            break;
        case 'DEFIpucuIlkHarfAl':
            if ((typeof localStorage.DEFIpucuIlkHarfAl) == 'undefined')
                if (glbOyunTur == 'tr')
                    deger = 1;
                else
                    deger = 2;
            else
                deger = localStorage.DEFIpucuIlkHarfAl;
            break;
        case 'DEFIpucuFazlalariAt':
            if ((typeof localStorage.DEFIpucuFazlalariAt) == 'undefined')
                if (glbOyunTur == 'tr')
                    deger = 1;
                else
                    deger = 2;
            else
                deger = localStorage.DEFIpucuFazlalariAt;
            break;
        case 'DEFIpucuSureAl':
            if ((typeof localStorage.DEFIpucuSureAl) == 'undefined')
                if (glbOyunTur == 'tr')
                    deger = 1;
                else
                    deger = 2;
            else
                deger = localStorage.DEFIpucuSureAl;
            break;
        case 'DEFCevapSure':
            if ((typeof localStorage.DEFCevapSure) == 'undefined')
                if (glbOyunTur == 'tr')
                    deger = 30;
                else
                    deger = 40;
            else
                deger = localStorage.DEFCevapSure;
            break;
        case 'DEFReklamVar':
            if ((typeof localStorage.DEFReklamVar) == 'undefined')
                deger = 0;
            else
                deger = localStorage.DEFReklamVar;
            break;
        case 'DEFRemoveAddsVar':
            if ((typeof localStorage.DEFRemoveAddsVar) == 'undefined')
                deger = 0;
            else
                deger = localStorage.DEFRemoveAddsVar;
            break;
        case 'DEFAndroidLink':
            if ((typeof localStorage.DEFAndroidLink) == 'undefined')
                deger = 0;
            else
                deger = localStorage.DEFAndroidLink;
            break;
        case 'DEFIOSLink':
            if ((typeof localStorage.DEFIOSLink) == 'undefined')
                deger = 0;
            else
                deger = localStorage.DEFIOSLink;
            break;
        case 'DEFPaylasText':
            if ((typeof localStorage.DEFPaylasText) == 'undefined')
                deger = 0;
            else
                deger = localStorage.DEFPaylasText;
            break;
        case 'DEFGuncellemeZamanAralik':
            if ((typeof localStorage.DEFGuncellemeZamanAralik) == 'undefined')
                deger = 86400000; // 1 gün
            else
                deger = localStorage.DEFGuncellemeZamanAralik;
            break;
       //////////////////////////////////////////////////////////
        case 'SesAcik':
            if ((typeof localStorage.SesAcik) == 'undefined')
                deger = 1;
            else
                deger = localStorage.SesAcik;
            break;
        case 'VibAcik':
            if ((typeof localStorage.VibAcik) == 'undefined')
                deger = 1;
            else
                deger = localStorage.VibAcik;
            break;
        case 'KullaniciId':
            if ((typeof localStorage.KullaniciId) == 'undefined')
                deger = 0;
            else
                deger = localStorage.KullaniciId;
            break;
        case 'Kullanici':
            if ((typeof localStorage.Kullanici) == 'undefined')
                deger = '';
            else
                deger = localStorage.Kullanici;
            break;
        case 'KullaniciGrubuId':
            if ((typeof localStorage.KullaniciGrubuId) == 'undefined')
                deger = 0;
            else
                deger = localStorage.KullaniciGrubuId;
            break;
        case 'KullaniciGrubu':
            if ((typeof localStorage.KullaniciGrubu) == 'undefined')
                deger = '';
            else
                deger = localStorage.KullaniciGrubu;
            break;
        case 'Anahtar':
            if ((typeof localStorage.Anahtar) == 'undefined')
                deger = '';
            else
                deger = localStorage.Anahtar;
            break;
        case 'KullaniciDurum':
            if ((typeof localStorage.KullaniciDurum) == 'undefined')
                deger = '';
            else
                deger = localStorage.KullaniciDurum;
            break;
        case 'Mobil':
            if ((typeof localStorage.Mobil) == 'undefined')
                deger = '';
            else
                deger = localStorage.Mobil;
            break;
        case 'Label':
            if ((typeof localStorage.Label) == 'undefined')
                deger = '';
            else
                deger = JSON.parse(localStorage.Label);
            break;
        case 'Dil':
            if ((typeof localStorage.Dil) == 'undefined')
                deger = '';
            else
                deger = JSON.parse(localStorage.Dil);
            break;
        case 'Internet':
            if ((typeof localStorage.internet) == 'undefined')
                deger = 0;
            else
                deger = localStorage.internet;
            break;
        case 'LabelSonGuncelleme':
            if ((typeof localStorage.LabelSonGuncelleme) == 'undefined')
                deger = 0;
            else
                deger = localStorage.LabelSonGuncelleme;
            break;
        case 'SpinStarted':
            if ((typeof localStorage.SpinStarted) == 'undefined')
                deger = 0;
            else
                deger = localStorage.SpinStarted;
            break;

        default:
            alert('böyle bir cookie bulamadımm:' + cook);
    }
    
    if (typeof deger === 'undefined')
        return 0;
    else
        return deger;
}
function SetCookie(cook, deger) {
    switch (cook) {     
        case 'SonGuncellemeZaman':
            localStorage.SonGuncellemeZaman = deger;
            break;
        case 'SonGucellemeId':
            localStorage.SonGucellemeId = deger;
            break;  
        case 'DosyaYuklemeBitti':
            localStorage.DosyaYuklemeBitti = deger;
            break;
        case 'KullaniciLevel':
            localStorage.KullaniciLevel = deger;
            break;
        case 'KalanCan':
            localStorage.KalanCan = deger;
            break;
        case 'IpucuHarfAl':
            localStorage.IpucuHarfAl = deger;
            break;
        case 'IpucuIlkHarfAl':
            localStorage.IpucuIlkHarfAl = deger;
            break;
        case 'IpucuFazlalariAt':
            localStorage.IpucuFazlalariAt = deger;
            break;
        case 'IpucuSureAl':
            localStorage.IpucuSureAl = deger;
            break;
        case 'CevapSure':
            localStorage.CevapSure = deger;
            break;
        case 'KullaniciRekor':
            localStorage.KullaniciRekor = deger;
            break;
        case 'DEFIpucuHarfAl':
            localStorage.DEFIpucuHarfAl = deger;
            break;
        case 'DEFIpucuIlkHarfAl':
            localStorage.DEFIpucuIlkHarfAl = deger;
            break;
        case 'DEFIpucuFazlalariAt':
            localStorage.DEFIpucuFazlalariAt = deger;
            break;
        case 'DEFIpucuSureAl':
            localStorage.DEFIpucuSureAl = deger;
            break;
        case 'DEFCevapSure':
            localStorage.DEFCevapSure = deger;
            break;
        case 'DEFReklamVar':
            localStorage.DEFReklamVar = deger;
            break;
        case 'DEFRemoveAddsVar':
            localStorage.DEFRemoveAddsVar = deger;
            break;
        case 'DEFPaylasText':
            localStorage.DEFPaylasText = deger;
            break;
        case 'DEFIOSLink':
            localStorage.DEFIOSLink = deger;
            break;
        case 'DEFAndroidLink':
            localStorage.DEFAndroidLink = deger;
            break;
        case 'DEFGuncellemeZamanAralik':
            localStorage.DEFGuncellemeZamanAralik = deger;
            break;
            
       ////////////////////////////////////////////////////////////////////////////////////
        case 'PremiumUye':
            localStorage.PremiumUye = deger;
            break;
        case 'SesAcik':
            localStorage.SesAcik = deger;
            break;
        case 'VibAcik':
            localStorage.VibAcik = deger;
            break;
        case 'KullaniciId':
            localStorage.KullaniciId = deger;
            break;
        case 'Kullanici':
            localStorage.Kullanici = deger;
            break;
        case 'Anahtar':
            localStorage.Anahtar = deger;
            break;
        case 'Label':
            localStorage.Label = JSON.stringify(deger);
            break;
        case 'Dil':
            localStorage.Dil = JSON.stringify(deger);
            break;
        case 'LabelMBL':
            localStorage.LabelMBL = JSON.stringify(deger);
            break;
        case 'Internet':
            localStorage.internet = deger;
            break;
        case 'LabelSonGuncelleme':
            localStorage.LabelSonGuncelleme = deger;
            break;
        case 'DeviceLang':
            localStorage.DeviceLang = deger;
            break;
        case 'SpinStarted':
            localStorage.SpinStarted = deger;
            break;
        default:
            alert('böyle bir cookie bulamadım2:' + cook);
    }
}
function RemoveCookie(cook) {
    var sonuc;
    switch (cook) {
        case 'KullaniciId':
            sonuc = localStorage.removeItem("KullaniciId");
            break;
        case 'Kullanici':
            localStorage.removeItem("Kullanici");
            break;
        case 'KelimeGrubuId':
            sonuc = localStorage.removeItem("KelimeGrubuId");
            break;
        case 'KelimeGrubu':
            sonuc = localStorage.removeItem("KelimeGrubu");
            break;
        case 'KullaniciGrubuId':
            sonuc = localStorage.removeItem("KullaniciGrubuId");
            break;
        case 'KullaniciGrubu':
            sonuc = localStorage.removeItem("KullaniciGrubu");
            break;
        case 'Anahtar':
            sonuc = localStorage.removeItem("Anahtar");
            break;
        case 'KullaniciDurum':
            sonuc = localStorage.removeItem("KullaniciDurum");
            break;
        case 'Bilgilendirme':
            sonuc = localStorage.removeItem("Bilgilendirme");
            break;
        case 'Mobil':
            sonuc = localStorage.removeItem("Mobil");
            break;
        case 'Label':
            sonuc = localStorage.removeItem("Label");
            break;
        case 'Dil':
            sonuc = localStorage.removeItem("Dil");
            break;
        case 'SonSayfa':
            sonuc = localStorage.removeItem("SonSayfa");
            break;
        case 'SonAktifTabNo':
            sonuc = localStorage.removeItem("SonAktifTabNo");
            break;
        case 'SonKelimeGrubuId':
            sonuc = localStorage.removeItem("SonKelimeGrubuId");
            break;
        case 'SonKelimeGrubuAdi':
            sonuc = localStorage.removeItem("SonKelimeGrubuAdi");
            break;
        case 'SonCalismaTuruAdi':
            sonuc = localStorage.removeItem("SonCalismaTuruAdi");
            break;
        case 'IsAdmin':
            sonuc = localStorage.removeItem("IsAdmin");
            break;
        case 'IllShowYorumMesaj':
            sonuc = localStorage.removeItem("IllShowYorumMesaj");
            break;
        case 'TamamlananOturumSayisi':
            sonuc = localStorage.removeItem("TamamlananOturumSayisi");
            break;
        case 'PaketId':
            sonuc = localStorage.removeItem("PaketId");
            break;
        case 'PaketNo':
            sonuc = localStorage.removeItem("PaketNo");
            break;
        case 'PaketAdi':
            sonuc = localStorage.removeItem("PaketAdi");
            break;
        case 'ChPaketGrubu':
            sonuc = localStorage.removeItem("ChKelimeGrubu");
            break;
        case 'ChTLang':
            sonuc = localStorage.removeItem("ChTLang");
            break;
        case 'ChKelimeGrubu':
            sonuc = localStorage.removeItem("ChKelimeGrubu");
            break;
        case 'ChKelimeler':
            sonuc = localStorage.removeItem("ChKelimeler");
            break;
        case 'Internet':
            sonuc = localStorage.removeItem("internet");
            break;
        case 'KelimeGrubuVS':
            sonuc = localStorage.removeItem("KelimeGrubuVS");
            break;
        case 'PaketVS':
            sonuc = localStorage.removeItem("PaketVS");
            break;
        case 'LabelVS':
            sonuc = localStorage.removeItem("LabelVS");
            break;
        case 'EskiPuanlarIndi':
            sonuc = localStorage.removeItem("EskiPuanlarIndi");
            break;
        case 'GamePuan':
            sonuc = localStorage.removeItem("GamePuan");
            break;
        case 'StudyPuan':
            sonuc = localStorage.removeItem("StudyPuan");
            break;
        case 'VideoPuan':
            sonuc = localStorage.removeItem("VideoPuan");
            break;
        case 'PaketRank':
            sonuc = localStorage.removeItem("PaketRank");
            break;
        case 'KelimeGrubuRank':
            sonuc = localStorage.removeItem("KelimeGrubuRank");
            break;
        case 'AlistirmaTipiRank':
            sonuc = localStorage.removeItem("AlistirmaTipiRank");
            break;
        case 'VideoTamamlanma':
            sonuc = localStorage.removeItem("VideoTamamlanma");
            break;
        case 'Level':
            sonuc = localStorage.removeItem("Level");
            break;
        case 'AvatarNo':
            sonuc = localStorage.removeItem("AvatarNo");
            break;
        default:
            alert('böyle bir cookie bulamadım:' + cook);
    }
    return sonuc;
}
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}


function BilgilendirmeReset() {
    SetCookie('Bilgilendirme', '00000000000000000000000000000000000000000000000000');
}
function Bilgilendirme(p_no,p_ikon2) {    
    var bilstr = [];
    bilstr = GetCookie('Bilgilendirme');
    if (bilstr[p_no] == 0) {
        Mesaj(3, '', bilMesaj[p_no], 0, p_ikon2);
        bilstr = setCharAt(bilstr, p_no, '1');
        SetCookie('Bilgilendirme', bilstr);
    }
}
function Mesaj(p_tur, p_title, p_text, p_sure, p_icon2) {
    //$("#popClose").css('width', (4 * $(window).width() / 5).toFixed(0));
    //$("#pPopAp").addClass('addClass');
    $("#popap").removeClass('hidden');
    //$("#popap").css('width', (5 * $(window).width() / 5).toFixed(0));
    //$("#popap").css('width', '100%');
    $("#popap").popup();
    $("#popap").popup({ history: false });
    $("#popap").popup('open');
    if (glbScreenType == 'IPhone5') {
        $("#pPopAp").css('font-size', '1em');
    }
    else if (glbScreenType == 'Galaxy') {
        $("#pPopAp").css('font-size', '1em');
    }
    else if (glbScreenType == 'IPhone6') {
        $("#pPopAp").css('font-size', '1.1em');
    }
    else if (glbScreenType == 'Phone395') {
        $("#pPopAp").css('font-size', '1.1m');
    }
    else if (glbScreenType == 'IPhone6P') {
        $("#pPopAp").css('font-size', '1.2em');
    }
    else if (glbScreenType == 'LGLexus') {
        $("#pPopAp").css('font-size', '1.2em');
    }
    else if (glbScreenType == 'Bigger1') {
        $("#pPopAp").css('font-size', '1.3em');
    }
    else if (glbScreenType == 'ipad') {
        $("#pPopAp").css('font-size', '1.5em');
    }
    else if (glbScreenType == 'ipadpro') {
        $("#pPopAp").css('font-size', '1.8em');
    }
    $("#pPopAp").html(p_text);
}
function NoNetwork() {
    if (glbisphone == 1) {
        var networkState = navigator.connection.type;
        if (networkState == Connection.NONE) {
            //alert('no network');
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
function CheckFreeGame() {
    var d = new Date();
    var dom = d.getDate();
    var cookiedom=GetCookie('DayOfMonth');
    if (dom == cookiedom) {
        if (Number(GetCookie('GameSayiForToday')) > Number(GetCookie('MaxGameSayiForOneDay'))) 
            return 0;
        else 
            return 1;
    }
    else {
        return 1;
    }
}
function CheckMisafirGame() {
    var d = new Date();
    var dom = d.getDate();
    var cookiedom = GetCookie('DayOfMonth');
    if (dom == cookiedom) {
        if (Number(GetCookie('GameSayiForToday')) > 2)
            return 0;
        else
            return 1;
    }
    else {
        return 1;
    }
}
function GameSayiPlusOne() {
    var d = new Date();
    var dom = d.getDate();
    var cookiedom = GetCookie('DayOfMonth');
    if (dom == cookiedom) {
        SetCookie('GameSayiForToday', Number(GetCookie('GameSayiForToday')) + 1)
    }
    else {
        SetCookie('GameSayiForToday', 1);
        SetCookie('DayOfMonth', dom)
    }
}

$(document).on("click", "#popClose", function (e) {
    $("#popap").popup('close');
});