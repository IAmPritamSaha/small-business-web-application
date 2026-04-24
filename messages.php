<?php
require_once 'db.php';
setHeaders();

$db    = getDB();
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 1000;

$sql =
    'SELECT id, name, email, message, created_at ' .
    'FROM messages ' .
    'ORDER BY created_at DESC ' .
    'LIMIT ?';

$stmt = $db->prepare($sql);
$stmt->bind_param('i', $limit);
$stmt->execute();
$res = $stmt->get_result();

$list = [];

while ($row = $res->fetch_assoc()) {
    $list[] = $row;
}

$stmt->close();
$db->close();

echo json_encode(['success' => true, 'messages' => $list]);

