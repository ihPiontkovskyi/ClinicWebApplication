function initMap() {
    let uluru = {lat: 50.456, lng: 30.521};
    let map = new google.maps.Map(
        document.getElementById('map'), {zoom: 9, center: uluru});

    $.get('/loadPosPoints', {}, function (data) {
        let json = JSON.parse(data);
        json.positionPoints.forEach(function (item) {
            let a = addStreet(item.address);
            let ulur = {lat: item.lat, lng: item.lng};
            let marker = new google.maps.Marker({position: ulur, map: map});
            google.maps.event.addListener(marker, 'click', function () {
                drawChart(this, item.address);
            });
            $(a).click(function () {
                drawChart(marker, item.address);
            });
        });
    });
}

function drawChart(marker, address) {
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Time');
    data.addColumn('number', 'Number of visitors');
    data.addRows([
        ['08:00-10:00', 112],
        ['10:00-12:00', 83],
        ['12:00-16:00', 54],
        ['16:00-20:00', 12],
    ]);
    let options = {
        'title': 'Clinic visited @ ' +
            address,
        'width': 300,
        'height': 200
    };
    let node = document.createElement('div'),
        infoWindow = new google.maps.InfoWindow(),
        chart = new google.visualization.PieChart(node);
    chart.draw(data, options);
    infoWindow.setContent(node);
    infoWindow.open(marker.getMap(), marker);
}

function addStreet(title) {
    let a = $("<a></a>").text(title);
    $('#addresses').append(a);
    return a;
}

function telegram() {
    let options = {
        telegram: "piontkowski", // Telegram bot username
        call_to_action: "Message us", // Call to action
        position: "right", // Position may be 'right' or 'left'
    };
    let proto = document.location.protocol, host = "getbutton.io", url = proto + "//static." + host;
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url + '/widget-send-button/js/init.js';
    s.onload = function () {
        WhWidgetSendButton.init(host, proto, options);
    };
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
}

$(document).ready(function () {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawChart);
});

