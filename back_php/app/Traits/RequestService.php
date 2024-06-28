<?php

namespace App\Traits;

use GuzzleHttp\Client;
use Log;
use Exception;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Auth;

trait RequestService
{

    public function request($method, $requestUrl, $formParams = [], $headers = [])
    {


        try{
            $client = new Client([
                'verify' => false,
                'base_uri' => $this->baseUri
            ]);
            $headers['api_service'] = 'rrhh';
            if (isset($this->secret)) {
                $headers['Authorization'] = 'Bearer '.$this->secret;
            }
            $response = $client->request($method,  $requestUrl,
                [
                    'form_params' => $formParams,
                    'headers' => $headers,
                    'timeout' => 20,
                    'connect_timeout' => 20
                ]
            );

            $arr = json_decode($response->getBody()->getContents(),true);

            if(is_array($arr)){
                $object = (object)[];
                foreach ($arr as $key => $value) {
                    $object->{$key} = $value;
                }
                return $object;
            }
            return $response->getBody()->getContents();



        }
        catch (RequestException $e){
            Log::info($e->getMessage());
            throw new Exception($e->getResponse()->getBody(true), 1);
        }
    }

    //Enviando archivos adjuntos
    public function requestFile($method, $requestUrl, $formParams = [], $headers = [])
    {
        try{
            $client = new Client([
                'verify' => false,
                'base_uri' => $this->baseUri
            ]);
            $headers['api_service'] = 'rrhh';
            if (isset($this->secret)) {
                $headers['Authorization'] = 'Bearer '.$this->secret;
            }
            $response = $client->request($method,  $requestUrl,
                [
                    'multipart' => $formParams,
                    'headers' => $headers,
                    'timeout' => 20,
                    'connect_timeout' => 20
                ]
            );

            $arr = json_decode($response->getBody()->getContents(),true);

            if(is_array($arr)){
                $object = (object)[];
                foreach ($arr as $key => $value) {
                    $object->{$key} = $value;
                }
                return $object;
            }
            return $response->getBody()->getContents();

        }
        catch (RequestException $e){
            Log::info($e->getMessage());
            throw new Exception($e->getResponse()->getBody(true), 1);
        }
    }

    public function request2($method, $requestUrl, $formParams = [], $headers = [])
    {
        try{
            $client = new Client([
                'verify' => false,
                'base_uri' => $this->baseUri
            ]);
            if(empty($this->secret) && isset($formParams['token'])){
                $this->secret = $formParams['token']; // Enviando token, ejemplo auth - ciu
            }
            if(empty($this->secret) && empty($formParams['token'])){
                $this->secret = auth()->tokenById(auth()->user()->id);
            }
            if (isset($this->secret)) {
                $headers['Authorization'] = 'Bearer '.$this->secret;
            }

            $response = $client->request($method,  $requestUrl,
                [
                    'form_params' => $formParams,
                    'headers' => $headers,
                    'timeout' => 20,
                    'connect_timeout' => 20
                ]
            );
            return json_decode($response->getBody()->getContents());
        }
        catch (Exception $e){
            Log::info($e->getMessage());
            if ($e->getCode() == 500) {
                return ['Server Error' => $requestUrl,'Code'=>500];
            }
            throw new \Exception($e->getMessage());
        }
    }

    /**
     * Metodo para hacer una peticion pero en ves de enviar
     * los parametros como application/x-www-form-urlencoded
     * los envia como json en el cuerpo de la peticion
     */
    public function jsonRequest($method, $requestUrl, $formParams = [], $headers = [])
    {
        try {
            $client = new Client([
                'verify' => false,
                'base_uri' => $this->baseUri
            ]);
            if (isset($this->secret)) {
                $headers['Authorization'] = "Bearer {$this->secret}";
            }

            $response = $client->request($method, $requestUrl,
                [
                    'json' => $formParams,
                    'headers' => $headers,
                    'timeout' => 600,
                    'connect_timeout' => 10
                ]
            );
            return json_decode($response->getBody()->getContents());
        } catch (\Throwable $e) {
            Log::error($e->getMessage());
            return $e->getMessage();
        }
    }
}
