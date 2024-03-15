<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = file_get_contents("php://input");
    $product = json_decode($data, true);

    if (!empty($product)) {
        $product['dateTimeSubmitted'] = date("Y-m-d H:i:s");
        $products = json_decode(file_get_contents('products.json'), true);
        $products[] = $product;
        file_put_contents('products.json', json_encode($products));
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
}
?>
