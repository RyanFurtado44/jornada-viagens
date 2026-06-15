<?php
// Informa ao navegador que a resposta será em dados (JSON)
header('Content-Type: application/json');

$nome = $_POST["nome"] ?? '';
$email = $_POST["email"] ?? '';
$senha = $_POST["senha"] ?? '';

$host = "localhost";
$user = "root";
$password = "";
$database = "jornada";

$conn = mysqli_connect($host, $user, $password, $database);
// mesma logica do login
if (mysqli_connect_error()) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro de conexão com o banco de dados."
    ]);
    exit;
}

$query = "INSERT INTO usuarios (nome, email, senha) VALUES ('$nome', '$email', '$senha')";

if (mysqli_query($conn, $query)) {
    echo json_encode([
        "sucesso" => true
    ]);
} else {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao salvar no banco: " . mysqli_error($conn)
    ]);
}

mysqli_close($conn);
