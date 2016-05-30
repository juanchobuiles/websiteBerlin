<?php
//echo "Los datos han pasado por PHP con ayuda de $.ajax =D";

$nombre = $_POST["nombre_txt"];
$email = $_POST["email_txt"];
$telefono = $_POST["tel_txt"];
$asunto = $_POST["asunto_txt"];
$comentarios = $_POST["comentarios_txa"];

$de=$email;
$para="julianbuilesc@gmail.com , admon@zonadecamping.com";
$mensaje = "<p>".$nombre.", te ha enviado el siguiente mensaje:</p><br><p>Asunto:".$asunto.".</p><br><p>E-mail: ".$email.".</p><br><p>Teléfono: ".$telefono.".</p><br><p>comentarios: ".$comentarios.".</p>";
$cabeceras = "MIME-Version: 1.0\r\n";
$cabeceras .= "Content-type: text/html; charset=iso-8859-1\r\n";
$cabeceras .= "From: $de \r\n";

$respuesta = (mail($para,$asunto,$mensaje,$cabeceras))?"Los Datos han sido enviados, Pronto no pondremos en contacto.":"Ocurrio un error. Los datos no se enviaron.";
echo $respuesta;

?>