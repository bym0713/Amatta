
dataRef.on('value', function(snap) {
    var onOff = snap.val()['Some'];
    least_Rssi.once('value', function(data){
        console.log(data.val());
        var key = Object.keys(data.val())[2];
        var RSSI = data.val()[key].RSSI;
        if (RSSI >-60) {
            Delete();
            amatta();
        } else if (RSSI<=-60 && onOff == "OFF") {
            Delete();
            icon();
        }
        dayInfo();
        console.log("key = "+key+"\n "+onOff);
    })
})

