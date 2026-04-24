<?php
require_once 'db.php';
setHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// support both form-data and json
$nm = trim($_POST['name'] ?? '');
$em = trim($_POST['email'] ?? '');
$pw = $_POST['password'] ?? '';

// fallback to json body
if (!$nm) {
    $data = getBody();
    $nm = trim($data['name'] ?? '');
    $em = trim($data['email'] ?? '');
    $pw = $data['password'] ?? '';
}

if (!$nm || !$em || !$pw) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($em, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email']);
    exit;
}

if (strlen($pw) < 6) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
    exit;
}

$db = getDB();

$stmt = $db->prepare('SELECT id FROM users WHERE email = ?');
$stmt->bind_param('s', $em);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already registered']);
    $stmt->close();
    $db->close();
    exit;
}

$stmt->close();

$hash = password_hash($pw, PASSWORD_BCRYPT);
$stmt = $db->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
$stmt->bind_param('sss', $nm, $em, $hash);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Account created']);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed']);
}

$stmt->close();
$db->close();
