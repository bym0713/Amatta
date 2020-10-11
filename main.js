
dataRef.on('value', function(snap) {

    var key = Object.keys(snap.val())[3];
    var RSSI = snap.val()[key].RSSI;
    var onOff = snap.val()['Some'];
    console.log("key = "+key+"\n "+onOff);
    dayInfo();

    if (RSSI >-65) {
        Delete();
        amatta();
    } else if (RSSI<=-65 && onOff == "OFF") {
        Delete();
        icon();
    }
})

