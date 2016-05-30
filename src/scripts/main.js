
(function () {
          //var btnMenu = document.getElementById('btnMenu');
          //var navbarMenu = document.getElementById('navbarMenu');

          //btnMenu.addEventListener('click', onClickMenu);
          var responsiveslider = require('./lib/responsiveslides.js');
          //var fancybox = require('./lib/jquery.fancybox.js');
          main();

          loadCss('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css');
          loadCss('https://fonts.googleapis.com/css?family=Lato');
          loadCss('https://i.icomoon.io/public/temp/3d97d702f3/UntitledProject/style.css');
          slides();
          eliminaEtiquetas();
          loadfancybox();
          //loadflexslider();
          function onClickMenu() {
            navbarMenu.classList.toggle('header-menu-list--show');
          }
          $("#contacto").on("submit",enviarDatos);

        }());

function loadCss (url) {
    var elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.href = url;
    document.head.appendChild(elem);
}



function main () {
  var contador = 1;
  $('.menu_bar').click(function(){
    if (contador == 1) {
      $('nav').animate({
        left: '0'
      });
      contador = 0;
    } else {
      contador = 1;
      $('nav').animate({
        left: '-100%'
      });
    }
  });

  // Mostramos y ocultamos submenus
  $('.submenu').click(function(){
    $(this).children('.children').slideToggle();
  });
}

function slides () {
  $('.banner').responsiveSlides({
     auto: true,
     speed: 1000
  });
  $('#serv').responsiveSlides({
    auto: false,
    pager: false,
    nav: true,
    timeout: 8000,
    speed: 1000,
    prevText: "Siguiente",
    maxwidth: "400",
    namespace: "callbacks",
    before: function () {
      $('.events').append("<li>before event fired.</li>");
    },
    after: function () {
      $('.events').append("<li>after event fired.</li>");
    }
  });
}

function loadfancybox () {
  $('#fancyCamping').fancybox({
    padding : 0,
    nextClick : true
  });

  $('.fancybox').fancybox({
    padding : 0,
    nextClick : true
  });


}

function enviarDatos(evento)
{

  //alert("yep");
  evento.preventDefault();

  var datosFormulario = $(this).serialize();
  console.log(datosFormulario);

  var opcionesDeEnvio = {
    url:"php/contacto.php",
    type:"POST",//POST o GET
    data:datosFormulario,
    dataType:"text", /*json,xml,html,text,script*/
    beforeSend:function(){
      // alert("Antes de enviar");
      $("#precarga").fadeIn("slow");
    },
    error:function(){
      // alert("Ocurrió un error");
       $("#precarga").fadeOut("slow");
       $("#respuesta").addClass("mensaje").fadeIn("slow").html("Ocurrió un error. No se pudo conectar con el servidor.");
    },
    success:function(respuestaDePHP){
      // alert("El envío por AJAX fue exitoso");
       $("#precarga").fadeOut("slow");
       $("#respuesta").addClass("mensaje").fadeIn("slow").html(respuestaDePHP);
       $("#contacto")[0].reset();
    }
  };

  $.ajax(opcionesDeEnvio);


}

function loadIframeAuto () {
   $('#contacto').fancybox({
      fitToView : false,
      autoSize  : false,
      openEffect  : 'none',
      closeEffect : 'none'
    });
  $('#contacto').eq(0).trigger('click');
}

function eliminaEtiquetas () {
  if($(window).width()<=800)
  {
    $('.header-logo').remove();
    $('.servicios-rapitienda-especific-titulo h2').remove();
    $('.servicios-restaurante-especific-titulo h2').remove();
    $('.servicios-habitaciones-especific-titulo h2').remove();
    $('.servicios-camping-especific-titulo h2').remove();
  }
  if($(window).width()<=600)
  {
    $('.footer-cyj').remove();
  }

}








