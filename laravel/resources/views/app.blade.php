<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
  <link type="image/png" rel="icon" href="{{asset('/favicon.png')}}">

  <link rel="stylesheet" href="{{asset('css/app.css')}}">
  <link rel="stylesheet" href="{{asset('/bootstrap/app.css')}}">
  <script> 
    window.csrf_token = '{{csrf_token()}}'; 
  </script>
  <script src="{{ asset('/js/main.js') }}" async></script>
</head>
<body>
  <div id="app">
  </div>
</body>
</html>