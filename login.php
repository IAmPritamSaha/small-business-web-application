<?php
require_once 'db.php';
setHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$em = trim($_POST['email'] ?? '');
$pw = $_POST['password'] ?? '';

if (!$em && !$pw) {
    $data = getBody();
    $em = trim($data['email'] ?? '');
    $pw = $data['password'] ?? '';
}

if (!$em || !$pw) {
    echo json_encode(['success' => false, 'message' => 'Email and password required']);
    exit;
}

$db = getDB();

$stmt = $db->prepare('SELECT id, name, email, password FROM users WHERE email = ?');
$stmt->bind_param('s', $em);
$stmt->execute();
$res = $stmt->get_result();
$row = $res->fetch_assoc();
$stmt->close();
$db->close();

if (!$row || !password_verify($pw, $row['password'])) {
    echo json_encode(['success' => false, 'message' => 'Wrong email or password']);
    exit;
}

echo json_encode([
    'success' => true,
    'name' => $row['name'],
    'email' => $row['email']
]);
