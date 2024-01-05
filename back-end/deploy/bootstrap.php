<?php
	use Doctrine\ORM\Tools\Setup;
	use Doctrine\ORM\EntityManager;
	date_default_timezone_set('America/Lima');
	require_once "vendor/autoload.php";
	$isDevMode = true;
	$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
	$conn = array(
	'host' => 'dpg-cm23hsa1hbls73bu4ai0-a.frankfurt-postgres.render.com',

	'driver' => 'pdo_pgsql',
	'user' => 'projet_angular_bdd_user',
	'password' => '1YHzChp7dvc1a5yUZugO7cnpuVXS8fdw',
	'dbname' => 'projet_angular_bdd',
	'port' => '5432'
	);


	$entityManager = EntityManager::create($conn, $config);



