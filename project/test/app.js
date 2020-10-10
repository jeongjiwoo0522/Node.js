const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("test1");
});

/* 

<?php
header("Content-Type: text/html; charset=UTF-8");
?>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script>
    new daum.Postcode({
        oncomplete: function(data) {
            if(data.userSelectedType=="R"){
                window.APIApp.setAddress(data.zonecode, data.roadAddress, data.buildingName);
            }
            else{
                window.APIApp.setAddress(data.zonecode, data.jibunAddress, data.buildingName);
            }
        }
    }).embed();
</script>
*/ 

app.listen(3000);