// main page
function config(id,v) {
  xh=new XMLHttpRequest();
  q = {"id":id}
  if (v) {
    q["value"]=value
  }
  xh.open("POST","/save",false)
  xh.setRequestHeader("Content-Type","application/json")
  xh.send(JSON.stringify(q))
  return xh.responseText
}
var nowid = ""
var loadinghtml="<div class='loading'>  <div class='contain'>    <svg height='80' width='210'>      <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>    </svg>    <svg height='80' width='210'>      <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>    </svg>    <svg height='80' width='210'>      <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>    </svg>    <svg height='80' width='210'>      <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>    </svg>    <svg height='80' width='210'>      <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>    </svg>    <svg height='80' width='210'>      <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>    </svg>    <svg height='80' width='210'>      <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>    </svg>    <svg height='80' width='210'>      <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>    </svg>    <svg height='80' width='210'>      <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>    </svg>    <svg height='80' width='210'>      <ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse>    </svg>  </div></div>"
function teamidchange(a) {
  b = a.value.match(/BT-?([\d\w]{4})-?([\d\w]{4})\/?$/i)
  if (b) {
    a.value = "BT-" + b[1].toUpperCase() + "-" + b[2].toUpperCase()
    a.blur()
    // console.log(a.value,nowid);
  }
}
function teamidfocus(a) {
  if (a.value.match(/^BT-[\d\w]{4}-[\d\w]{4}$/i)) {
    nowid = a.value
  }
  a.value = ""
}
function teamidblur(a) {
  if (!a.value.match(/^BT-[\d\w]{4}-[\d\w]{4}$/i)) {
    a.value = nowid
  }
  else {
    if (a.value != nowid) {
      requestforteam(a.value)
    }
  }
}
function requestforteam(cd) {
  console.log("request team: ",cd);
  document.getElementById("detail").innerHTML = loadinghtml
  window.scrollTo(0,10000)
  xht=new XMLHttpRequest();
  xht.open("GET","/team/"+cd,true)
  xht.onreadystatechange = function() {
    if (xht.readyState==4) { // 4 = "loaded"
      if (xht.status==200) { // 200 = OK
        document.getElementById("detail").innerHTML = xht.responseText
      }
      else {
        document.getElementById("detail").innerHTML = "<h2>error</h2>"
      }
    }
  }
  xht.send(null)
}
