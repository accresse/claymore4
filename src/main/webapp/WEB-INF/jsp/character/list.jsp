<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./css/font-awesome.min.css" type="text/css">
  <link rel="stylesheet" href="./css/bootstrap.min.css" type="text/css">
  <!-- 
   <link rel="stylesheet" href="./css/jqueryui-editable.css" type="text/css"/>
   -->
  <link rel="stylesheet" href="./jquery-ui-1.12.1.custom/jquery-ui.theme.css" type="text/css"/>
</head>
<body>
  <nav class="navbar navbar-expand-md bg-primary navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="/claymore"><i class="fa d-inline fa-lg fa-address-book"></i><b class="m-1">Claymore</b></a><span class="navbar-brand"> / </span><a class="navbar-brand" href="/claymore/character">Characters</a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent"
        aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
      <div class="collapse navbar-collapse text-center justify-content-end" id="navbar2SupportedContent">
      </div>
    </div>
  </nav>

  <div class="py-0">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
        		<ul>
        		<c:forEach items="${characters}" var="character">
        			<li><a href="character/${character.characterId}">${character.name}</a> - ${character.lastModifiedTs} (${character.player.userName})</li>
        		</c:forEach>
        		</ul>
        </div>
      </div>
    </div>
  </div>
  <script src="./jquery-ui-1.12.1.custom/external/jquery/jquery.js"></script>
  <script src="./jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
  <script src="./js/popper.min.js"></script>
  <script src="./js/bootstrap.min.js"></script>
  <!-- 
  <script src="./js/jqueryui-editable.min.js"></script>
  <pingendo onclick="window.open('https://pingendo.com/', '_blank')" style="cursor:pointer;position: fixed;bottom: 10px;right:10px;padding:4px;background-color: #00b0eb;border-radius: 8px; width:110px;display:flex;flex-direction:row;align-items:center;justify-content:center;font-size:14px;color:white">made with&nbsp;&nbsp;
    <img src="https://pingendo.com/site-assets/Pingendo_logo_big.png" class="d-block" alt="Pingendo logo" height="16">
  </pingendo>
   -->
</body>

</html>