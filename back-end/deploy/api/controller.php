<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

	function optionsCatalogue (Request $request, Response $response, $args) {
	    
	    // Evite que le front demande une confirmation à chaque modification
	    $response = $response->withHeader("Access-Control-Max-Age", 600);
	    
	    return addHeaders ($response);
	}

	function hello(Request $request, Response $response, $args) {
	    $array = [];
	    $array ["nom"] = $args ['name'];
	    $response->getBody()->write(json_encode ($array));
	    return $response;
	}
	
	function getSearchCatalogue(Request $request, Response $response, $args) {
		$filtre = $args['filtre'];
		$data = file_get_contents(__DIR__ . '/../assets/mock/product-list.json');
		$data = json_decode($data, true);
	
		if ($filtre) {
			$res = array_filter($data, function($obj) use ($filtre) { 
				$filtre = strtolower($filtre);
				return strpos(strtolower($obj["name"]), $filtre) !== false || strpos(strtolower($obj["category"]), $filtre) !== false;
			});
			$response->getBody()->write(json_encode(array_values($res)));
		} else {
			$response->getBody()->write(json_encode($data));
		}
	
		return addHeaders($response);
	}

	// API Nécessitant un Jwt valide
	function getCatalogue (Request $request, Response $response, $args) {
		$data = file_get_contents(__DIR__ . '/../assets/mock/product-list.json');

	    $response->getBody()->write($data);
	    
	    return addHeaders ($response);
	}

	function optionsUtilisateur (Request $request, Response $response, $args) {
	    
	    // Evite que le front demande une confirmation à chaque modification
	    $response = $response->withHeader("Access-Control-Max-Age", 600);
	    
	    return addHeaders ($response);
	}

	// API Nécessitant un Jwt valide
	function getUtilisateur (Request $request, Response $response, $args) {
	    global $entityManager;
	    
	    $payload = getJWTToken($request);
	    $login  = $payload->userid;
	    
	    $utilisateurRepository = $entityManager->getRepository('Utilisateurs');
	    $utilisateur = $utilisateurRepository->findOneBy(array('login' => $login));
	    if ($utilisateur) {
		$data = array('nom' => $utilisateur->getNom(), 'prenom' => $utilisateur->getPrenom());
		$response = addHeaders ($response);
		$response = createJwT ($response);
		$response->getBody()->write(json_encode($data));
	    } else {
		$response = $response->withStatus(404);
	    }

	    return addHeaders ($response);
	}

	// APi d'authentification générant un JWT
	function postLogin(Request $request, Response $response, $args) {
		global $entityManager;
	
		$err = false;
		$body = $request->getParsedBody();
		$login = $body['login'] ?? "";
		$pass = $body['password'] ?? "";
	
		// Validation des données reçues
		if (!preg_match("/[a-zA-Z0-9]{1,20}/", $login)) {
			$err = true;
		}
	
		// Récupération de l'utilisateur depuis la base de données
		$utilisateurRepository = $entityManager->getRepository('Utilisateur');
		$utilisateur = $utilisateurRepository->findOneBy(['login' => $login]);
	
		if (!$err && $utilisateur) {
			// Vérification du mot de passe (en supposant qu'il est haché dans la base de données)
			if (password_verify($pass, $utilisateur->getPassword())) {
				// Création du JWT avec les informations de l'utilisateur
				$response = createJwt($response, $utilisateur->getId(), $utilisateur->getEmail());
	
				// Renvoi des informations de l'utilisateur
				$data = array('nom' => $utilisateur->getNom(), 'prenom' => $utilisateur->getPrenom());
				$response->getBody()->write(json_encode($data));
			} else {
				// Mauvais mot de passe
				$response = $response->withStatus(403);
			}
		} else {
			// Données d'authentification invalides ou utilisateur non trouvé
			$response = $response->withStatus(401);
		}
	
		return addHeaders($response);
	}
	

	function postRegister(Request $request, Response $response, $args) {
		global $entityManager;
	
		$body = $request->getParsedBody();
		$login = $body['login'] ?? '';
		$password = $body['password'] ?? '';
		$email = $body['email'] ?? '';
	
		// Validation
		if (!preg_match("/[a-zA-Z0-9]{1,20}/", $login) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
			return $response->withStatus(400);
		}
	
		$utilisateurRepository = $entityManager->getRepository('Utilisateur');
		if ($utilisateurRepository->findOneBy(['login' => $login])) {
			return $response->withStatus(409);
		}
	
		// Hashage du mot de passe
		$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
	
		// Création du nouvel utilisateur
		$utilisateur = new Utilisateur();
		$utilisateur->setLogin($login);
		$utilisateur->setPassword($hashedPassword);
		$utilisateur->setEmail($email);
	
		$entityManager->persist($utilisateur);
		$entityManager->flush();
	
		return $response->withStatus(201); 
	}
	
