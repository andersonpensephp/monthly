# Monthly
Plugin para seleção de mês
#Get started
obs*: needed jQuery

include <link rel="stylesheet" href="monthly.min.css"> in <head>
including before to closing </body> <script src="monthly.min.js"></script>

Exemple:

<!DOCTYPE html>
<html lang="bt-br">

<head>
    <meta charset="UTF-8">
    <title>Monthly</title>
    <link rel="stylesheet" href="reset/reset.css">
    <link rel="stylesheet" href="src/css/monthly.min.css">

</head>

<body>
    <input id="monthly-read" type="text">

    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="src/js/monthly.min.js"></script>

    <script charset="utf-8">
    !function(){
        $('#monthly-read').Monthly({
            topOffset: 5,
        });
    }();
    </script>
</body>
</html>
