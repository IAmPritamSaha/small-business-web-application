<?php
require_once 'db.php';
setHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$nm = trim($_POST['name'] ?? '');
$em = trim($_POST['email'] ?? '');
$msg = trim($_POST['message'] ?? '');

if (!$nm || !$em || !$msg) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($em, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email']);
    exit;
}

$db = getDB();
$stmt = $db->prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');
$stmt->bind_param('sss', $nm, $em, $msg);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Message saved']);
} else {
    echo json_encode(['success' => false, 'message' => 'Could not save message']);
}

$stmt->close();
$db->close();
