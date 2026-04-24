<?php
require_once 'db.php';
setHeaders();

$db = getDB();

$qMsg = $db->query('SELECT COUNT(*) as total FROM messages');
$qUsr = $db->query('SELECT COUNT(*) as total FROM users');

$total_messages = $qMsg->fetch_assoc()['total'];
$total_users = $qUsr->fetch_assoc()['total'];

$db->close();

echo json_encode([
    'success'        => true,
    'total_messages' => $total_messages,
    'total_users'    => $total_users
]);

