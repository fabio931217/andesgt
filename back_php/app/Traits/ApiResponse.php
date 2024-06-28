<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait ApiResponse
{

    public function successResponse($data, $statusCode = Response::HTTP_OK)
    {
        return response()->json($data, $statusCode);
    }

    public function errorResponse($errorMessage, $statusCode)
    {
        return response()->json(['error' => $errorMessage, 'error_code' => $statusCode ], $statusCode);
    }

    public function errorResponseInfo($errorMessage, $infoErrorMessage,$statusCode)
    {
        return response()->json(['error' => $errorMessage, 'error_info'=>$infoErrorMessage,'error_code' => $statusCode], $statusCode);
    }
}
