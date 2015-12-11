<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");

//$iniSettings  = parse_ini_file(ROOT_PATH . 'config/settings.ini', true);
//$client_email = $iniSettings['client_email'];
//todo -- ini file for config


require '../../vendor/autoload.php';

//require_once 'db.class.php';
//DB::$user = 'my_database_user';
//DB::$password = 'my_database_password';
//DB::$dbName = 'my_database_name';

$app = new \Slim\Slim();

//Debug Mode
$app->config(array(
	'debug' => true
	));
// todo - set from ini.config

// Logging
$log = $app->getLog();
$log->setEnabled(true);
// todo - set from ini.config



// Simple GET
$app->get('/hello/:name', function ($name) {
    echo "Hello, $name";
});


// GET to static function
$app->get('/foo', 'foo');

function foo() {
    //$app = Slim::getInstance();
    echo "bar";
}

// (strict) multi param get
$app->get('/books/:one/:two', function ($one, $two) {
    echo "The first parameter is " . $one;
    echo "The second parameter is " . $two;
});

// wildcard param
$app->get('/hello2/:name+', function ($name) {
    print_r($name);
});

// API group
// 
/*$app->group('/api', function () use ($app) {

    // Library group
    $app->group('/library', function () use ($app) {

        // Get book with ID
        $app->get('/books/:id', function ($id) {
        	echo "$id";
        });

        // Update book with ID
        $app->put('/books/:id', function ($id) {

        });

        // Delete book with ID
        $app->delete('/books/:id', function ($id) {

        });

    });

});
*/
//response object

$app->response->headers->set('Content-Type', 'application/json');
$app->response->setBody(json_encode(array('a'=>'b')));
$app->response->setStatus(400);
$app->response->finalize();

// $app->request->params('paramName');
//http://docs.slimframework.com/routing/helpers/
//http://docs.slimframework.com/routing/rewrite/


$app->run();