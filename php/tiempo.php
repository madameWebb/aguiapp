<?php

/**
 * Proyecto Parque Eocológico
 * 
 * @version pq-_V18
 * @autor Virginia M. García Álvarez
 */


$apiKeyT = "cbc35f2e21aeb553bcc014213b8791d6";
$cityId = "3105971";//Vigo

$googleApiUrl = "http://api.openweathermap.org/data/2.5/weather?id=" . $cityId . "&lang=es&units=metric&APPID=" . $apiKeyT;

$ch = curl_init();//inicia la petición a la api, entre paréntisis puede ir algo opcionalmente

curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, $googleApiUrl);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_VERBOSE, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch); //ejecuta la petición y se recoge en una variable

curl_close($ch);
//echo '<pre>';
echo $response;
//echo '</pre>';
