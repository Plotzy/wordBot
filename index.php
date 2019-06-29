<html>
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

	<link href="style.css" rel="stylesheet"/>
</head>
<body style="background: black; color: green;">
<main id="main"/>
<?php
if ( '127.0.0.1' === $_SERVER['REMOTE_ADDR'] ) {
	?>
	<script src="https://localhost:3000/js/dist/master.js"></script>
<?php
} else {
?>
	<script src="dist/master.js"></script>
	<?php
}
?>
</bodY>
</html>
