(this.webpackJsonphamster_wars_frontend=this.webpackJsonphamster_wars_frontend||[]).push([[0],{3:function(e,t,n){e.exports=n(9)},8:function(e,t,n){},9:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),l=n(2),a=n.n(l),c=(n(8),function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"File uploadish"),r.a.createElement("form",{action:"",encType:"multipart/form-data",method:"POST"},r.a.createElement("input",{type:"file",name:"photo",id:"file"}),r.a.createElement("button",{onClick:function(e){return function(e){console.log("n\xe5t h\xe4nder"),e.preventDefault();var t=document.querySelector("#file").files[0];console.log("OUTPUT \xc4R: App -> file",t);var n=new FormData;n.append("photo",t),console.log("OUTPUT \xc4R: App -> formData",n),fetch("/files",{method:"POST",body:n}).then((function(e){return e.json()})).then((function(e){alert(e.msg)})).catch((function(e){return console.error(e)}))}(e)}},"Send")),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("h3",null,"LADDA UPP TILL MOLNET"),r.a.createElement("form",{action:"",encType:"multipart/form-data",method:"POST"},r.a.createElement("input",{type:"file",name:"photo",id:"cloud-file"}),r.a.createElement("button",{onClick:function(e){return function(e){console.log("upload to cloud funktionen k\xf6rs"),e.preventDefault();var t=document.querySelector("#cloud-file").files[0];console.log("OUTPUT \xc4R: App -> file",t);var n=new FormData;n.append("photo",t),console.log("OUTPUT \xc4R: App -> formData",n),fetch("/files/cloud",{method:"POST",body:n}).then((function(e){return e.json()})).then((function(e){var t="".concat(e.msg,". Url to image: ").concat(e.urlToImage);alert(t)})).catch((function(e){return console.error(e)}))}(e)}},"Send")))});a.a.render(r.a.createElement(c,null),document.querySelector("#root"))}},[[3,1,2]]]);
//# sourceMappingURL=main.842c1746.chunk.js.map