// date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}

today = dd+'/'+mm+'/'+yyyy;
$("#date").html(today);

//time

function updateClock ( )
  {
    var currentTime = new Date ( );
    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    var currentSeconds = currentTime.getSeconds ( );

    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;

    $("#time").html(currentTimeString);

 }

$(document).ready(function()
{
   setInterval('updateClock()', 1000);
});


// Local storage
function setLocalStorage() {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        //Get Value
        var nk = $('#nk').val();
        var nr = $('#nr').val();
        var smax = $('#smax').val();
        var pth = $('#pth').val();
        var ptb = $('#ptb').val();
        var kt = $('#kt').val();

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = dd+'/'+mm+'/'+yyyy;

        var currentTime = new Date ( );
        var currentHours = currentTime.getHours ( );
        var currentMinutes = currentTime.getMinutes ( );
        var currentSeconds = currentTime.getSeconds ( );

        // Pad the minutes and seconds with leading zeros, if required
        currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
        currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

        var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;

        //cek local storage
        var localLength = localStorage.length;
        var n = localLength+1;
        //
        var kartu = [];
        kartu[0] = nk;
        kartu[1] = nr;
        kartu[2] = smax;
        kartu[3] = pth;
        kartu[4] = ptb;
        kartu[5] = kt;
        kartu[6] = today + ' ' + currentTimeString;
        // Store
        localStorage.setItem("kartu"+n, JSON.stringify(kartu));
        // Retrieve
        console.log(JSON.parse(localStorage.getItem("kartu1")));
        window.location.href = 'tk-cek.html';
    } else {
        alert('Sorry, your browser does not support Web Storage...');
    }   
}

function viewStorage() {
    if (localStorage.getItem('current')) {
        var kartu = JSON.parse(localStorage.getItem('current'));
        $('#cek-nk').html(kartu[0]);
        $('#cek-nr').html(kartu[1]);
        $('#cek-smax').html(kartu[2]);
        $('#cek-pth').html(kartu[3]);
        $('#cek-ptb').html(kartu[4]);
        $('#cek-kt').html(kartu[5]);
    } else {
        var localLength = localStorage.length;
        var getKartu = 'kartu'+localLength;
        var kartu = JSON.parse(localStorage.getItem(getKartu));
        console.log(kartu);
        $('#cek-nk').html(kartu[0]);
        $('#cek-nr').html(kartu[1]);
        $('#cek-smax').html(kartu[2]);
        $('#cek-pth').html(kartu[3]);
        $('#cek-ptb').html(kartu[4]);
        $('#cek-kt').html(kartu[5]);
        $('#backToInput').attr('onclick', 'backToInput('+localLength+')');
        var currentKartu = localStorage.getItem(getKartu);
        localStorage.setItem('current', currentKartu);
    }
}

function backToInput(current) {
    localStorage.removeItem('kartu'+current);
    window.location.href = 'tk-index.html';
}
function cekCurrent() {
    if (localStorage.getItem('current')) {
        var kartu = JSON.parse(localStorage.getItem('current'));
        $('#nk').val(kartu[0]);
        $('#nr').val(kartu[1]);
        $('#smax').val(kartu[2]);
        $('#pth').val(kartu[3]);
        $('#ptb').val(kartu[4]);
        $('#kt').val(kartu[5]);
    }

    localStorage.removeItem('current');
}
function sendData() {
    $('#success').html('Input data berhasil');
    $('#sendData').remove();
    $('#backToInput').remove();

    localStorage.removeItem('current');
}
function listData(){
    var length = localStorage.length;   
    for (var i = 0; i < length; i++) {
        console.log(JSON.parse(localStorage.getItem('kartu'+(i+1))));
        var kartu = [];
        kartu[i] = JSON.parse(localStorage.getItem('kartu'+(i+1)));
        $('.table').append('<tr class="dataKartu"><td><input type="checkbox" name=""></td><td id="date'+i+'">'+kartu[i][6]+'</td><td id="nk'+i+'"><a href="#" onclick="editKartu('+(i+1)+')">'+kartu[i][0]+'</a></td><td>Tambah Kartu</td><td id="nr'+i+'">'+kartu[i][1]+'</td><td></td><td>0/1</td></tr>')
    }    
}
function editKartu() {
    window.location.href = 'uk-edit.html';
}

$("ul > li > ul").hide();

$("ul > li").click(function(e) {
    e.stopPropagation();
    
    $(this).children().toggle(function(e) {
        if (!$(this).is(":visible")) {
            $(this).find("ul").hide();
            $(this).find("sub").show();
        };
    });
    
    $(this).siblings().each(function(i) {
        if ($(this).children("ul").length > 0) {
            if ($(this).children("ul").css("display").toLowerCase() == "block") {
                $(this).children().toggle(function(e) {
                    if (!$(this).is(":visible")) {
                        $(this).find("ul").hide();
                        $(this).find("sub").show();
                    };
                });
            }
        }
    });
});

// var names = [];
// names[0] = prompt("New member name?");
// localStorage.setItem("names", JSON.stringify(names));

// //...
// var storedNames = JSON.parse(localStorage.getItem("names"));