(window["webpackJsonpvisualize-the-data"]=window["webpackJsonpvisualize-the-data"]||[]).push([[0],{11:function(e,t,a){e.exports=a.p+"static/media/Data.97a0d9a8.csv"},14:function(e,t,a){e.exports=a(24)},19:function(e,t,a){},21:function(e,t,a){},22:function(e,t,a){},24:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(10),o=a.n(i),r=(a(19),a(20),a(21),a(1)),c=a(2),s=a(6),m=a(4),u=a(5),d=function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement("header",null,l.a.createElement("nav",{className:"bg-light p-3"},l.a.createElement("div",{className:"text-center"},l.a.createElement("h3",null,"Data Visualizer"))))}}]),t}(n.Component),p=a(7),h=a(3),f=(a(22),a(23),a(12)),v=a(8),b=a.n(v),E=a(11),N=a.n(E),g=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).onMapClick=function(){},a.uploadAndParse=function(e){var t=Object(h.a)(a);e.preventDefault(),f.a(N.a).then(function(e){t.setState({d3ParsedData:e})})},a.handleInputChange=function(e,t,n,l){var i;("file"===e&&a.setState({fileData:l.target.files[0],fileName:l.target.value.split("\\")[2]}),"radio"===e)&&(a.setState((i={},Object(p.a)(i,t,!0),Object(p.a)(i,n,!1),Object(p.a)(i,"pointType",t),i)),a.destroyMap(),a.createMap())},a.generateMap=function(e){var t=[];if(e.preventDefault(),a.state.d3ParsedData.length>0&&(t=a.state.d3ParsedData.map(function(e,t){return a.state.source?["Source point "+t,e.from_lat,e.from_long]:a.state.destination?["Destination point "+t,e.to_lat,e.to_long]:[]})),t.length>0){a.state.mapInstance.setView([t[0][1],t[0][2]],10);b.a.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors',maxZoom:18}).addTo(a.state.mapInstance);for(var n=0;n<1e3;n++)"NULL"===t[n][1]&&"NULL"===t[n][2]||new b.a.marker([t[n][1],t[n][2]]).bindPopup(t[n][0]).addTo(a.state.mapInstance)}},a.createMap=function(){a.setState({mapInstance:b.a.map("mapDiv")})},a.destroyMap=function(){a.state.mapInstance&&a.state.mapInstance.remove()},a.state={fileData:"",fileName:"",parsedData:null,d3ParsedData:[],source:!1,destination:!1,pointType:null,pointData:null,mapInstance:null},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement("main",null,l.a.createElement("div",{className:"container-fluid"},l.a.createElement("div",{className:"main-div mt-4 mb-4"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-12 col-sm-6"},l.a.createElement("div",{className:"form-div"},l.a.createElement("form",{onSubmit:this.uploadAndParse.bind(null)},l.a.createElement("div",{className:"form-group"},l.a.createElement("div",{className:"head-div"},l.a.createElement("h3",null,"Choose the relevant .csv file to visualize the data")),l.a.createElement("div",{className:"custom-file"},l.a.createElement("input",{type:"file",className:"custom-file-input",id:"customFile",onChange:this.handleInputChange.bind(null,"file",null,null)}),l.a.createElement("label",{className:"custom-file-label",htmlFor:"customFile"},this.state.fileName?this.state.fileName:"Choose file")),l.a.createElement("div",null,l.a.createElement("button",{className:"btn btn-primary mt-3",type:"submit"},"Upload the file(Click here for now to initiate)")))),l.a.createElement("div",{className:"main-filter"},l.a.createElement("h5",null,"Choose the option below to display points on the map:"),l.a.createElement("form",{onSubmit:this.generateMap.bind(null)},l.a.createElement("div",{className:"custom-control custom-radio custom-control-inline"},l.a.createElement("label",null,l.a.createElement("input",{type:"radio",name:"filter-radio-btn",checked:this.state.source,className:"radio-btn",onChange:this.handleInputChange.bind(null,"radio","source","destination"),required:!0}),"All the source point of the taxi")),l.a.createElement("div",{className:"custom-control custom-radio custom-control-inline"},l.a.createElement("label",null,l.a.createElement("input",{type:"radio",name:"filter-radio-btn",className:"radio-btn",onChange:this.handleInputChange.bind(null,"radio","destination","source"),checked:this.state.destination,required:!0}),"All the destination point of the taxi")),l.a.createElement("div",null,l.a.createElement("button",{className:"btn btn-primary mt-3",type:"submit"},"Generate Map"))),l.a.createElement("div",null,l.a.createElement("button",{className:"btn btn-primary mt-3",type:"submit"},"Click here for more visualization"))))),l.a.createElement("div",{className:"col-12 col-sm-6"},l.a.createElement("div",{className:"map-container"},l.a.createElement("div",{className:"map",id:"mapDiv"}))))),l.a.createElement("div",{className:"sec-div"})))}}]),t}(n.Component);var y=function(){return l.a.createElement("div",{className:""},l.a.createElement(d,null),l.a.createElement(g,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[14,1,2]]]);
//# sourceMappingURL=main.4c8b55ef.chunk.js.map