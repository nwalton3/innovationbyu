<!DOCTYPE html>
<!--[if lt IE 7]> <html lang="en" class="no-js oldie lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]>    <html lang="en" class="no-js oldie lt-ie9 lt-ie8"><![endif]-->
<!--[if IE 8]>    <html lang="en" class="no-js oldie lt-ie9"><![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en" class="no-js">
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <?php print $styles; ?>
  <?php print $scripts; ?>
</head>
<body class="<?php print $classes; ?>">
  <svg class="hidden">
    <defs>
      <g id="people">
        <circle fill="#5189C7" cx="34.043" cy="27.439" r="8.613"/>
        <circle fill="#5189C7" cx="64.582" cy="23.124" r="10.353"/>
        <circle fill="#5189C7" cx="95.121" cy="27.439" r="8.613"/>
        <path fill="#94B0DA" d="M34.042,41.565c-4.758,0-8.613,3.856-8.613,8.613v28.595h17.227V50.178
          C42.656,45.421,38.798,41.565,34.042,41.565z"/>
        <path fill="#94B0DA" d="M64.582,40.103c-5.717,0-10.353,4.635-10.353,10.353v34.372h20.705V50.457
          C74.934,44.739,70.299,40.103,64.582,40.103z"/>
        <path fill="#94B0DA" d="M95.122,41.565c-4.757,0-8.614,3.856-8.614,8.613v28.595h17.227V50.178
          C103.735,45.421,99.879,41.565,95.122,41.565z"/>
      </g>
      <g id="circle">
        <path fill="#94B0DA" d="M45.263,48.8c0-14.299,7.774-26.775,19.319-33.456c-5.685-3.29-12.278-5.182-19.319-5.182
          c-21.34,0-38.638,17.3-38.638,38.638c0,21.339,17.298,38.638,38.638,38.638c7.041,0,13.634-1.893,19.319-5.182
          C53.037,75.575,45.263,63.098,45.263,48.8z"/>
        <path fill="#94B0DA" d="M83.901,10.162c-7.041,0-13.634,1.892-19.319,5.182C76.128,22.024,83.901,34.501,83.901,48.8
          c0,14.298-7.773,26.775-19.319,33.456c5.685,3.289,12.278,5.182,19.319,5.182c21.339,0,38.638-17.3,38.638-38.638
          C122.539,27.461,105.24,10.162,83.901,10.162z"/>
        <path fill="#5189C7" d="M83.901,48.8c0-14.299-7.773-26.775-19.319-33.456C53.037,22.024,45.263,34.501,45.263,48.8
          c0,14.298,7.774,26.775,19.319,33.456C76.128,75.575,83.901,63.098,83.901,48.8z"/>
      </g>
      <g id="page">
        <rect x="34.728" y="10.126" fill="#94B0DA" width="54.958" height="72.599"/>
        <rect x="39.477" y="14.875" fill="#5189C7" width="54.958" height="72.599"/>
        <rect x="47.619" y="27.936" fill="#FFFFFF" width="38.674" height="5.81"/>
        <rect x="47.619" y="38.103" fill="#FFFFFF" width="38.674" height="5.81"/>
        <rect x="47.619" y="48.27" fill="#FFFFFF" width="38.674" height="5.809"/>
        <rect x="47.619" y="58.437" fill="#FFFFFF" width="38.674" height="5.809"/>
        <rect x="47.619" y="68.603" fill="#FFFFFF" width="38.674" height="5.81"/>
      </g>
    </defs>
  </svg>

<!--[if lt IE 7]>
    <p class="chromeframe">You are using an<strong>outdated</strong>browser. Please<a href="http://browsehappy.com/">upgrade your browser</a>or<a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a>to improve your experience.</p><![endif]-->
  <?php print $page_top; ?>
  <div id="page">
    <?php print $page; ?>
  </div>
  <?php print $page_bottom; ?>
</body>
</html>
