<?php
// 1. Avisa o navegador/JavaScript que a resposta será em formato JSON (dados puros)
header('Content-Type: application/json');

// 2. Recebe os dados enviados pelo index.js (se não existirem, deixa vazio)
$email = $_POST["email"] ?? '';
$senha = $_POST["senha"] ?? '';

$host = "localhost";
$user = "root";
$password = "";
$database = "jornada";

// 3. Conecta ao banco de dados
$conn = mysqli_connect($host, $user, $password, $database);

// Se houver erro na conexão, responde pro JS em formato JSON e para o código
if (mysqli_connect_error()) {
    echo json_encode([
        "sucesso" => false, 
        "mensagem" => "Erro de conexão com o banco de dados."
    ]);
    exit;
}

// 4. Monta e executa a query para buscar o usuário
$query = "SELECT * FROM usuarios WHERE email = '".$email."' AND senha = '".$senha."'";
$resultado = mysqli_query($conn, $query);

// 5. Verifica se encontrou alguma linha no banco
if (mysqli_num_rows($resultado) > 0) {
    // Transforma a linha do banco em um array do PHP para pegar o nome
    $usuario = mysqli_fetch_assoc($resultado);
    
    // Se deu certo, envia "sucesso => true" e o Nome que estava no banco
    echo json_encode([
        "sucesso" => true,
        "nome" => $usuario['nome']
    ]);
} else {
    // Se o e-mail ou senha estiverem errados, envia "sucesso => false" e a mensagem
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "E-mail ou Senha incorretos."
    ]);
}

// 6. Fecha a conexão com o banco
mysqli_close($conn);
?>